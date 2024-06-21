package api

import (
	"net/http"

	"github.com/EmilioCliff/go-app/excel"
	"github.com/gin-gonic/gin"
)

type GenerateExcelRequest struct {
	Name string `json:"name"`
}

func (server *Server) GenerateExcel(ctx *gin.Context) {
	var req GenerateExcelRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var excelBytes []byte
	switch req.Name {
	case "department-lists":
		departments, err := server.store.ListDepartments(ctx)
		if err != nil{
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}

		excelBytes, err = excel.GenerateDepartmentExcel(departments)
		if err != nil{
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
	}

	ctx.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ctx.Header("Content-Disposition", "attachment; filename=report.xlsx")
    ctx.Data(http.StatusOK, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelBytes)
}