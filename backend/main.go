package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

func main() {
	// set up channels for graceful shutdown
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	errCh := make(chan error, 1)

	db := NewDB()
	server := NewServer(db)

	log.Println("starting server at port: ", ":8080")
	go func() {
		errCh <- server.Start()
	}()

	select {
	case <-ctx.Done():
		log.Println("server shutting down")

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := server.Stop(ctx); err != nil {
			log.Fatalf("server gracefull shutdown failed: %v\n", err)
		}

		if err := db.Close(); err != nil {
			log.Fatalf("database shutdown failed: %v\n", err)
		}
	case err := <-errCh:
		log.Fatalf("error starting program: %v\n", err)
	}

}
