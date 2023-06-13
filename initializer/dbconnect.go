package initializer

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Conn() {
	var err error

	dsn := os.Getenv("DB_URL")

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		log.Fatal("error to connect")
	}
	fmt.Println("connected")
}
