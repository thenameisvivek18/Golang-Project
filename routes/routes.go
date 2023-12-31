package routes

import (
	"to-do-list/controllers"

	"github.com/gin-gonic/gin"
)

func GetApi(routes *gin.Engine) {
	routes.GET("/", controllers.GetTodo)
	routes.GET("/update", controllers.Hold)

	routes.POST("/addtodo", controllers.AddTodo)
}
