package excel

import (
	"bytes"
	"fmt"

	"github.com/EmilioCliff/go-app/db"
	"github.com/xuri/excelize/v2"
)

func GenerateDepartmentExcel(dataList []db.Department) ([]byte, error){
	f := excelize.NewFile()
	sheet := "Sheet1"

	f.SetCellValue(sheet, "A1", "Code")
	f.SetCellValue(sheet, "B1", "Description")

	for i, data := range dataList{
		rowNumber :=i+2
		f.SetCellValue(sheet, fmt.Sprintf("A%v", rowNumber), data.Code)
		f.SetCellValue(sheet, fmt.Sprintf("B%v", rowNumber), data.Description)
	}

	var buf bytes.Buffer
	if err := f.Write(&buf); err != nil {
		return nil, err
	}

	// if err := f.SaveAs("departments_debug.xlsx"); err != nil {
    //     log.Println("Failed to save debug Excel file:", err)
    // }

	f.Close()

	return buf.Bytes(), nil
}