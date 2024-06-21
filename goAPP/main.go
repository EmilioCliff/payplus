package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/EmilioCliff/go-app/api"
	db "github.com/EmilioCliff/go-app/db"
	_ "github.com/denisenkom/go-mssqldb"
)

const server = "localhost"
const port = 1433
const user = "goAPI"
const password = "secret"
const database = "PayTest"
const webPort = "8080"

func main() {
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;", server, user, password, port, database)
	connDB, err := sql.Open("sqlserver", connString) 
	if err != nil {
		log.Println("error creating connection pool: " + err.Error())
		return
	}
	defer connDB.Close()

	store := db.NewStore(connDB)
	server := api.NewServer(store)

	log.Println("Starting server at port: ", webPort)
	server.Start(fmt.Sprintf("0.0.0.0:%s", webPort))
}
