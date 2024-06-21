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

	r.POST("/reports", server.GenerateReport)

	r.GET("/departments", server.ListDepartments)
	r.GET("/department/:code", server.GetDepartment)
	r.DELETE("/department/:code", server.DeleteDepartment)
	r.POST("/departments", server.CreateDepartment)
	r.POST("/department/:code", server.UpdateDepartment)

	r.GET("/counties", server.ListCounties)
	r.GET("/county/:code", server.GetCounty)
	r.DELETE("/county/:code", server.DeleteCounty)
	r.POST("/counties", server.CreateCounty)
	r.POST("/county/:code", server.UpdateCounty)

	r.GET("/banks", server.ListBanks)
	r.GET("/bank/:code", server.GetBank)
	r.DELETE("/bank/:code", server.DeleteBank)
	r.POST("/banks", server.CreateBank)
	r.POST("/bank/:code", server.UpdateBank)

	server.router = r
}

func (server *Server) Start(address string) error {
	return server.router.Run()
}

func errorResponse(err error) gin.H{
	return gin.H{"error": err.Error()}
}