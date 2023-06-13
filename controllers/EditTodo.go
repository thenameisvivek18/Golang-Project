package controllers

import (
	"fmt"
	"strconv"
	"to-do-list/services"

	"github.com/gin-gonic/gin"
)

func Hold(c *gin.Context) {
	fmt.Println("Hold")
	id := c.Query("id")
	stage := c.Query("stage")
	fmt.Println("id", id)
	fmt.Println("stage", stage)
	tid, _ := strconv.ParseInt(id, 10, 64)
	services.UpdateTodo(int(tid), stage)
	todo := services.GetUpdatedTodo(int(tid))
	c.JSON(302, todo)

}
