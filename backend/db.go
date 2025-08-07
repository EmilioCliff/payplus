package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
)

type DB struct {
	store *sql.DB
}

func NewDB() *DB {
	db := &DB{}
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%v;database=%s;",
		os.Getenv("SERVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("PORT"), os.Getenv("DB_NAME"))
	var err error

	// Create connection pool
	db.store, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}

	ctx := context.Background()
	err = db.store.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}

	fmt.Printf("Connected!")

	return db
}

func (db *DB) Close() error {
	return db.store.Close()
}
