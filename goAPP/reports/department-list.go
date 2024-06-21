package reports

import (
	"bytes"
	"fmt"

	"github.com/EmilioCliff/go-app/db"
	"github.com/go-pdf/fpdf"
)

func GenerateDepartmentPDF(dataList []db.Department) ([]byte, error) {
	marginX := 10.0
	marginY := 20.0
	pdf := fpdf.New("P", "mm", "A4", "") // 210mm x 297mm
	pdf.SetMargins(marginX, marginY+15, marginX)

	pdf.SetAutoPageBreak(true, 28)

	pdf.SetHeaderFunc(func() {
		pdf.SetFillColor(200, 200, 200)
		pdf.Rect(marginX, marginY, 190, 10, "F")
	})

	pdf.SetFooterFunc(func() {
		pdf.SetFillColor(200, 200, 200)
		pdf.Rect(marginX, 270, 190, 10, "F")
		pdf.SetY(-10)
		pdf.SetX(marginX)
		pdf.SetFont("Arial", "I", 8)
		pdf.Cell(marginX+10, 10, "Your satisfaction is our priority. If you have any concerns, please let us know.")
		pdf.SetX(-marginX)
		pdf.CellFormat(0, 10, fmt.Sprintf("Page %d/%d", pdf.PageNo(), pdf.PageCount()), "", 0, "C", false, 0, "")
	})

	pdf.AddPage()

	pageW, _ := pdf.GetPageSize()
	safeAreaW := pageW - 2*marginX

	pdf.SetFont("Arial", "B", 22)
	wd := pdf.GetStringWidth("DEPARMENT LIST REPORTS")
	pdf.SetXY((safeAreaW/2)-(wd/2), marginY+10)
	pdf.Cell(70, 35, "DEPARMENT LIST REPORTS")
	pdf.Ln(-1)

	pdf.SetFont("Arial", "B", 16)

	pdf.SetX(marginX)
	lineHt := 10.0
	const colNumber = 2
	header := [colNumber]string{"Code", "Description"}
	colWidth := [colNumber]float64{40.0, 75.0}

	pdf.SetFontStyle("B")
	pdf.SetFillColor(200, 200, 200)
	for colJ := 0; colJ < colNumber; colJ++ {
		pdf.CellFormat(colWidth[colJ], lineHt, header[colJ], "1", 0, "CM", true, 0, "")
	}

	pdf.Ln(-1)
	pdf.SetFillColor(255, 255, 255)

	pdf.SetFontStyle("")

		for _, data := range dataList {
			pdf.CellFormat(colWidth[0], lineHt, data.Code, "1", 0, "CM", true, 0, "")        // No
			pdf.CellFormat(colWidth[1], lineHt, data.Description, "1", 0, "LM", true, 0, "") // Description
			pdf.Ln(-1)
		}

	var buffer bytes.Buffer
	if err := pdf.Output(&buffer); err != nil {
		return []byte{}, err
	}

	pdf.Close()

	return buffer.Bytes(), nil
}