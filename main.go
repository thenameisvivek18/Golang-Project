package main

import (
	"os"
	"to-do-list/initializer"
	"to-do-list/routes"

	"github.com/gin-gonic/gin"
)

func init() {
	initializer.Loadenv()
	initializer.Conn()
}

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.Static("/public", "./public")
	routes.GetApi(router)
	router.Run(":" + os.Getenv("PORT"))

}
