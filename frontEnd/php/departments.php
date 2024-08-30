<?php
    include "./database/connect.php";

    $createDepartmentStatement = $db->prepare("INSERT INTO departments (code, description) VALUES (:code, :description)");
    $updateDepartmentStatement = $db->prepare("UPDATE departments SET code =:code, description = :description WHERE code = :code");
    $deleteDepartmentStatement = $db->prepare("DELETE FROM departments WHERE code = :code");

    try {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            switch($data["action"]) {
                case "list";
                    $response = array();
                    foreach($db->query("SELECT * FROM departments ORDER BY code") as $row) {
                        $response[] = $row;
                    };
                    echo json_encode($response);
                    break;
        
                case "create":
                    $createDepartmentStatement->bindParam(':code', $data["code"]);
                    $createDepartmentStatement->bindParam(':description', $data["description"]);
                    if (!$createDepartmentStatement->execute()) {
                        throw new Exception("Failed to create new record: " . $createDepartmentStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "update":
                    $updateDepartmentStatement->bindParam(':code', $data["code"]);
                    $updateDepartmentStatement->bindParam(':description', $data["description"]);
                    if (!$updateDepartmentStatement->execute()) {
                        throw new Exception("Failed to update record: " . $updateDepartmentStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "delete":
                    $deleteDepartmentStatement->bindParam(':code', $data["code"]);
                    if (!$deleteDepartmentStatement->execute()) {
                        throw new Exception("Failed to delete record: " . $deleteDepartmentStatement->errorInfo());
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