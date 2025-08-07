package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CreateDepartmentRequest struct {
	Code        int    `json:"code" binding:"required"`
	Description string `json:"description" binding:"required"`
}

func (s *Server) createDepartment(ctx *gin.Context) {
	var req CreateDepartmentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	department, err := s.store.CreateDepartment(ctx, CreateDepartmentParams{
		Code:        req.Code,
		Description: req.Description,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

func (s *Server) listDepartments(ctx *gin.Context) {
	department, err := s.store.ListDepartments(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

func (s *Server) deleteDepartment(ctx *gin.Context) {
	code, err := strconv.Atoi(ctx.Param("code"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	if err = s.store.DeleteDepartment(ctx, code); err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": "delete successful"})
}

type UpdateDepartmentRequest struct {
	Description string `json:"description" binding:"required"`
}

func (s *Server) updateDepartment(ctx *gin.Context) {
	var req UpdateDepartmentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	code, err := strconv.Atoi(ctx.Param("code"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	department, err := s.store.UpdateDepartment(ctx, UpdateDepartmentParams{
		Code:        code,
		Description: req.Description,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}
