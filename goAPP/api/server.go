package api

import (
	"github.com/EmilioCliff/go-app/db"
	"github.com/gin-gonic/gin"
)

type Server struct {
	router *gin.Engine
	store  *db.Store
}

func NewServer(store *db.Store) *Server {
	var server Server
	server.setRoutes()
	server.store = store

	return &server
}

func (server *Server) setRoutes() {
	r := gin.Default()

	r.Use(server.CORSMiddleware())

	r.GET("/departments", server.ListDepartments)
	r.GET("/department/:code", server.GetDepartment)
	r.DELETE("/department/:code", server.DeleteDepartment)
	r.POST("/departments", server.CreateDepartment)
	r.POST("/department/:code", server.UpdateDepartment)

	server.router = r
}

func (server *Server) Start(address string) error {
	return server.router.Run()
}

func errorResponse(err error) gin.H{
	return gin.H{"error": err.Error()}
}