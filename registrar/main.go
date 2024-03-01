package main

import (
	"encoding/json"
	"io"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nats-io/nats.go"
)

type RegistrarRequest struct {
	Token    string    `json:"token"`
	Status   string    `json:"status"`
	Message  string    `json:"message"`
	Datetime time.Time `json:"datetime"`
}

func main() {
	nc, err := nats.Connect("nats:4222")
	if err != nil {
		panic(err)
	}
	defer nc.Close()

	r := gin.Default()

	r.POST("/registrar", func(c *gin.Context) {
		requestBody, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(400, gin.H{"error": "Failed to read request body"})
			return
		}

		var requestObj RegistrarRequest
		err = json.Unmarshal(requestBody, &requestObj)
		if err != nil {
			c.JSON(400, gin.H{"error": "Failed to parse JSON"})
			return
		}

		requestBytes, err := json.Marshal(requestObj)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to convert the struct to bytes"})
			return
		}

		err = nc.Publish("registrar", requestBytes)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to publish to NATS"})
			return
		}

		c.Status(200)
	})

	r.Run("0.0.0.0:8080")
}
