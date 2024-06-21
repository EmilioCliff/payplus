package api

import (
	"bytes"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GenerateReportRequest struct {
	Name string `json:"name"`
}

func (server *Server) GenerateReport(ctx *gin.Context) {
	var req GenerateReportRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
	}

	var pdfBytes []byte
	switch req.Name{
	case "department-lists":
	}

	ctx.Header("Content-Type", "application/pdf")
    ctx.Header("Content-Disposition", "attachment; filename=report.pdf")
    ctx.Data(http.StatusOK, "application/pdf", pdfBytes)
}

func generatePDF() ([]byte, error) {
    pdf := gofpdf.New("P", "mm", "A4", "")
    pdf.AddPage()
    pdf.SetFont("Arial", "B", 16)
    pdf.Cell(40, 10, "Hello, world!")

    var buf bytes.Buffer
    err := pdf.Output(&buf)
    if err != nil {
        return nil, err
    }
    return buf.Bytes(), nil
}