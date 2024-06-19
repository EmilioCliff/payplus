package api

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/EmilioCliff/go-app/db"
	"github.com/gin-gonic/gin"
)

func (server *Server) ListCounties(ctx *gin.Context) {
	counties, err := server.store.ListCounties(ctx)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, counties)
}

func (server *Server) GetCounty(ctx *gin.Context) {
	// var req int
	// if err := ctx.ShouldBindUri(&req); err != nil{
	// 	ctx.JSON(http.StatusBadRequest, errorResponse(err))
	// 	return
	// }
	req := ctx.Param("code")

	county, err := server.store.GetCounty(ctx, req)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, county)
}

func (server *Server) DeleteCounty(ctx  *gin.Context) {
	code := ctx.Param("code")

	err := server.store.DeleteCounty(ctx, code)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": "delete successful"})
}

type UpdateCountyRequest struct{
	Description string `json:"description" binding:"required"`
}

func (server *Server) UpdateCounty(ctx *gin.Context) {
	var req UpdateCountyRequest
	if err := ctx.ShouldBindJSON(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	code := ctx.Param("code")
	log.Println(code)

	county, err := server.store.UpdateCounty(ctx, db.UpdateCountyParams{
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

	ctx.JSON(http.StatusOK, county)
}

type CreateCountyRequest struct{
	Code string `json:"code" binding:"required"`
	Description string `json:"description" binding:"required"`
}

func (server *Server) CreateCounty(ctx *gin.Context) {
	var req CreateCountyRequest
	if err := ctx.ShouldBindJSON(&req); err != nil{
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	county, err := server.store.CreateCounty(ctx, db.CreateCountyParams{
		Code: req.Code,
		Description: req.Description,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, county)
}

