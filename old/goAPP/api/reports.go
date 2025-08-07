package api

import (
	"net/http"

	"github.com/EmilioCliff/go-app/reports"
	"github.com/gin-gonic/gin"
)

type GenerateReportRequest struct {
	Name string `json:"name"`
}

func (server *Server) GenerateReport(ctx *gin.Context) {
	var req GenerateReportRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	var pdfBytes []byte
	switch req.Name{
	case "department-lists":
		departments, err := server.store.ListDepartments(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
		pdfBytes, err = reports.GenerateDepartmentPDF(departments)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
	}

	ctx.Header("Content-Type", "application/pdf")
    ctx.Header("Content-Disposition", "attachment; filename=report.pdf")
    ctx.Data(http.StatusOK, "application/pdf", pdfBytes)
}
