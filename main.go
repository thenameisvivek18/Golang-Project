package main

import (
	"os"
	"to-do-list/initializer"
	"to-do-list/model"
	"to-do-list/routes"

	"github.com/gin-gonic/gin"
)

func init() {
	initializer.Loadenv()
	initializer.Conn()
}

func main() {
	router := gin.Default()
	initializer.DB.AutoMigrate(&model.Attachment{})
	router.LoadHTMLGlob("templates/*")
	router.Static("/public", "./public")
	router.Static("/assets", "./assets")
	routes.GetApi(router)
	router.Run(":" + os.Getenv("PORT"))

}
