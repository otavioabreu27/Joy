package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/handshake", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello handshake",
		})
	})

	router.Run(":8080")
}
