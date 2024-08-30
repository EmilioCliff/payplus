<?php

    include "../../database/connect.php";
    include "../utils/fpdf186/fpdf.php";

    $data = array();
    foreach($db->query("SELECT * FROM departments ORDER BY code") as $row) {
        $data[] = $row;
    }

    $pdf = new FPDF('P', 'mm', 'A4');
    $pdfWidth = $pdf->GetPageWidth();
    $pdf->AddPage();
    $pdf->SetMargins(10, 20, 10);

    $pdf->SetFont('Arial','B',24);
    $reportTitle = "Department List";
    $stringWidth = $pdf->GetStringWidth($reportTitle);
    $pdf->SetX(($pdfWidth/2) - ($stringWidth/2));
    $pdf->Cell($stringWidth, 28, $reportTitle, 0, 0, 'C');
    $pdf->Ln();

    $headerWidth = array(25, 70);
    $headers = array("Code", "Description");

    $pdf->SetFont('Arial','B',16);

    for($i = 0; $i < count($headers); $i++) {
        $pdf->Cell($headerWidth[$i], 8, $headers[$i], 1, 0, 'C');
    }
    $pdf->Ln();

    $pdf->SetFont('Arial','',10);

    foreach($data as $row) {
        $pdf->Cell($headerWidth[0], 6, $row['code'], 1, 0, 'C');
        $pdf->Cell($headerWidth[1], 6, $row['description'], 1, 0, 'C');
        $pdf->Ln();
    }

    $pdf->Cell(array_sum($headerWidth), 0, '', 'T');

    // $pdf->Output('F', './report.pdf');
    $pdf->Output('D', 'report.pdf');
    // $pdf->Output();
?>
