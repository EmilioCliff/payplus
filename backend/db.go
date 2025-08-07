package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
)

var server = "payplus.database.windows.net"
var port = 1433
var user = "backend"
var password = "fkM*p49bqrDKc*f"
var database = "test-payplus"

type DB struct {
	store *sql.DB
}

func NewDB() *DB {
	db := &DB{}
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		server, user, password, port, database)
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
