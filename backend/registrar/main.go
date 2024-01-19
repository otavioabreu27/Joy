package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	amqp "github.com/rabbitmq/amqp091-go"
)

// AgentMessage represents the structure of the JSON data you expect in the request
type AgentMessage struct {
	Token    string `json:"token"`
	Status   string `json:"status"`
	Message  string `json:"message"`
	Datetime string `json:"datetime"`
}

// AMQP FUNCTIONS
func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func connect() (*amqp.Connection, error) {
	// Get RabbitMQ connection parameters from environment variables
	rabbitMQURL := os.Getenv("RABBITMQ_URL")
	if rabbitMQURL == "" {
		rabbitMQURL = "amqp://guest:guest@localhost:5672/"
	}

	conn, err := amqp.Dial(rabbitMQURL)
	if err != nil {
		return nil, err
	}
	return conn, nil
}

func postAlbums(c *gin.Context, ch *amqp.Channel, ctx context.Context) {
	var agentMessage AgentMessage

	if err := c.BindJSON(&agentMessage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON format",
		})
		return
	}

	body, err := json.Marshal(agentMessage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to marshal JSON",
		})
		return
	}

	err = ch.PublishWithContext(ctx,
		"",              // exchange
		"AgentMessages", // routing key
		false,           // mandatory
		false,           // immediate
		amqp.Publishing{
			ContentType: "application/json", // Specify the content type
			Body:        body,
		})
	failOnError(err, "Failed to publish a message")
	log.Printf("[x] Sent %s\n", body)

	c.JSON(http.StatusCreated, gin.H{
		"message": "OK",
	})
}

func main() {
	// Get port from environment variable or use default value (8080)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Connection -----------------
	conn, err := connect()
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// Channel --------------------
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	// Queue ---------------------
	_, err = ch.QueueDeclare(
		"AgentMessages",
		true,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to declare a queue")

	// Ctx ----------------------
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	r := gin.Default()
	r.POST("/register", func(c *gin.Context) {
		postAlbums(c, ch, ctx)
	})
	r.Run(":" + port)
}
