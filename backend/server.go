package main

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Server struct {
	router *gin.Engine
	srv    http.Server

	store *DB
}

func NewServer(db *DB) *Server {
	s := &Server{
		router: gin.Default(),
		store:  db,
	}

	s.setRoutes()

	return s
}

func (s *Server) setRoutes() {
	s.router.GET("/blogs", s.listDepartments)
	s.router.POST("/blogs", s.createDepartment)
	s.router.PUT("/blogs/:code", s.updateDepartment)
	s.router.DELETE("/blogs/:code", s.deleteDepartment)

	s.srv = http.Server{
		Addr:         ":8080",
		Handler:      s.router,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
}

func (s *Server) Start() error {
	return s.srv.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.srv.Shutdown(ctx)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
