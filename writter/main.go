package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/nats-io/nats.go"
)

type RegistrarRequest struct {
	Token    string    `json:"token"`
	Status   string    `json:"status"`
	Message  string    `json:"message"`
	Datetime time.Time `json:"datetime"`
}

func main() {
	dbUser := "joy"
	dbPass := "1234"
	dbName := "joy"
	dbHost := "mariadb"
	dbPort := "3306"

	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)

	// database connection
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to MariaDB!")

	// nats connection
	nc, err := nats.Connect("nats:4222")
	if err != nil {
		panic(err)
	}
	defer nc.Close()

	fmt.Println("Connected to Nats!")

	subject := "registrar"

	_, err = nc.Subscribe(subject, func(msg *nats.Msg) {
		var receivedRequest RegistrarRequest

		err := json.Unmarshal(msg.Data, &receivedRequest)
		if err != nil {
			fmt.Println("Error decoding the message: ")
			panic(err)
		}

		insertQuery := "INSERT INTO Logs (token, message, status, datetime) VALUES (?, ?, ?, ?);"

		insertStmt, err := db.Prepare(insertQuery)
		if err != nil {
			panic(err)
		}
		defer insertStmt.Close()

		_, err = insertStmt.Exec(receivedRequest.Token, receivedRequest.Message, receivedRequest.Status, receivedRequest.Datetime)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Received message: %+v\n", receivedRequest)
	})

	if err != nil {
		panic(err)
	}

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	<-sigCh
}
