<?php
    include "./database/connect.php";

    $createEmployeeStatement = $db->prepare("INSERT INTO employee_details (code, first_name, last_name, middle_name, full_name, department_code , position_code , date_employed) VALUES (:code, :first_name, :last_name, :middle_name, :full_name, :department_code , :position_code , :date_employed)");
    $updateEmployeeStatement = $db->prepare("UPDATE employee_details SET code =:code, first_name =:first_name, last_name =:last_name, middle_name =:middle_name, full_name =:full_name, department_code =:department_code , position_code =:position_code , date_employed =:date_employed WHERE code =:previous");
    $getEmployeeByCodeStatement = $db->prepare("SELECT * FROM employee_details WHERE code =:code LIMIT 1");
    $getFullEmployeeDetailsByCodeStatement = $db->prepare("SELECT e.code, e.first_name, e.last_name, e.middle_name, e.full_name, d.description , p.description , e.date_employed FROM  employee_details AS e JOIN departments AS d ON e.department_code = d.code JOIN positions AS p ON e.position_code = p.code WHERE e.code =:code LIMIT 1");
    $listEmployeesStatement = $db->prepare("SELECT * FROM employee_details ORDER BY code");
    $listFullEmployeesDetailsStatement = "SELECT e.code, e.first_name, e.last_name, e.middle_name, e.full_name, d.description AS employee_department , d.code AS department_code, p.description AS employee_position, p.code AS position_code, e.date_employed FROM  employee_details AS e JOIN departments AS d ON e.department_code = d.code JOIN positions AS p ON e.position_code = p.code";
    $deleteEmployeeStatement = $db->prepare("DELETE FROM employee_details WHERE code =:code");

    try {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $data = json_decode(file_get_contents("php://input"), true);

            switch($data["action"]) {
                case "list":
                    $response = array();
                    foreach($db->query($listFullEmployeesDetailsStatement) as $row) {
                        $response[] = $row;
                    };
                    echo json_encode($response);
                    break;

                case "get-employee":
                    $getFullEmployeeDetailsByCodeStatement->bindParam(':code', $data["code"]);

                    if (!$getFullEmployeeDetailsByCodeStatement->execute()) {
                        throw new Exception("Failed to get employee record: " . $getFullEmployeeDetailsByCodeStatement->errorInfo());
                    }
                    $employee = $getFullEmployeeDetailsByCodeStatement->fetch(PDO::FETCH_ASSOC);

                    if ($employee) {
                        echo json_encode($employee);
                    } else {
                        echo json_encode(["error" => "No employee found with the given code"]);
                    }
                    break;

                case "create":
                    $createEmployeeStatement->bindParam(':code', $data["code"]);
                    $createEmployeeStatement->bindParam(':first_name', $data["first_name"]);
                    $createEmployeeStatement->bindParam(':last_name', $data["last_name"]);
                    $createEmployeeStatement->bindParam(':middle_name', $data["middle_name"]);
                    $fullName = $data["first_name"] . ' ' .$data["middle_name"] . ' ' .$data["last_name"];
                    $createEmployeeStatement->bindParam(':full_name', $fullName);
                    $createEmployeeStatement->bindParam(':department_code', $data["department"]);
                    $createEmployeeStatement->bindParam(':position_code', $data["position"]);
                    $createEmployeeStatement->bindParam(':date_employed', $data["date_of_employment"]);
                    if (!$createEmployeeStatement->execute()) {
                        throw new Exception("Failed to create new record: " . $createEmployeeStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "update":
                    $updateEmployeeStatement->bindParam(':code', $data["code"]);
                    $updateEmployeeStatement->bindParam(':previous', $data["previous"]);
                    $updateEmployeeStatement->bindParam(':first_name', $data["first_name"]);
                    $updateEmployeeStatement->bindParam(':last_name', $data["last_name"]);
                    $updateEmployeeStatement->bindParam(':middle_name', $data["middle_name"]);
                    $fullName = $data["first_name"] . ' ' .$data["middle_name"] . ' ' .$data["last_name"];
                    $updateEmployeeStatement->bindParam(':full_name', $fullName);
                    $updateEmployeeStatement->bindParam(':department_code', $data["department"]);
                    $updateEmployeeStatement->bindParam(':position_code', $data["position"]);
                    $updateEmployeeStatement->bindParam(':date_employed', $data["date_of_employment"]);
                    if (!$updateEmployeeStatement->execute()) {
                        throw new Exception("Failed to update record: " . $updateEmployeeStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "delete":
                    $deleteEmployeeStatement->bindParam(':code', $data["code"]);
                    if (!$deleteEmployeeStatement->execute()) {
                        throw new Exception("Failed to delete record: " . $deleteEmployeeStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;
            }
        }
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    };
?>