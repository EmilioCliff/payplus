<?php
    include "./database/connect.php";

    $createPositionStatement = $db->prepare("INSERT INTO positions (code, description) VALUES (:code, :description)");
    $updatePositionStatement = $db->prepare("UPDATE positions SET code =:code, description = :description WHERE code = :code");
    $deletePositionStatement = $db->prepare("DELETE FROM positions WHERE code = :code");

    try {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            switch($data["action"]) {
                case "list";
                    $response = array();
                    foreach($db->query("SELECT * FROM positions ORDER BY code") as $row) {
                        $response[] = $row;
                    };
                    echo json_encode($response);
                    break;
        
                case "create":
                    $createPositionStatement->bindParam(':code', $data["code"]);
                    $createPositionStatement->bindParam(':description', $data["description"]);
                    if (!$createPositionStatement->execute()) {
                        throw new Exception("Failed to create new record: " . $createPositionStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "update":
                    $updatePositionStatement->bindParam(':code', $data["code"]);
                    $updatePositionStatement->bindParam(':description', $data["description"]);
                    if (!$updatePositionStatement->execute()) {
                        throw new Exception("Failed to update record: " . $updatePositionStatement->errorInfo());
                    };
                    echo json_encode(["success" => true]);
                    break;

                case "delete":
                    $deletePositionStatement->bindParam(':code', $data["code"]);
                    if (!$deletePositionStatement->execute()) {
                        throw new Exception("Failed to delete record: " . $deletePositionStatement->errorInfo());
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