package api

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/EmilioCliff/go-app/db"
	"github.com/gin-gonic/gin"
)

func (server *Server) ListDepartments(ctx *gin.Context) {
	department, err := server.store.ListDepartments(ctx)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

func (server *Server) GetDepartment(ctx *gin.Context) {
	var req int
	if err := ctx.ShouldBindUri(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	department, err := server.store.GetDepartment(ctx, req)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

func (server *Server) DeleteDepartment(ctx  *gin.Context) {
	code := ctx.Param("code")
	log.Println(code)

	err := server.store.DeleteDepartment(ctx, code)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": "delete successful"})
}

type UpdateDepartmentRequest struct{
	Description string `json:"description" binding:"required"`
}

func (server *Server) UpdateDepartment(ctx *gin.Context) {
	var req UpdateDepartmentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	code := ctx.Param("code")
	log.Println(code)

	department, err := server.store.UpdateDepartment(ctx, db.UpdateDepartmentParams{
		Code: code,
		Description: req.Description,
	})
	if err != nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound, errorResponse(err))
		return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

type CreateDepartmentRequest struct{
	Code string `json:"code" binding:"required"`
	Description string `json:"description" binding:"required"`
}

func (server *Server) CreateDepartment(ctx *gin.Context) {
	var req CreateDepartmentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	department, err := server.store.CreateDepartment(ctx, db.CreateDepartmentParams{
		Code: req.Code,
		Description: req.Description,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, department)
}

