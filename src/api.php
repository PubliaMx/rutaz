<?php

// Establecer la conexión con la base de datos
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";




$conn = new mysqli($servername, $username, $password, $dbname);

/*

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Manejar la solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos enviados desde Node.js
    $data = json_decode(file_get_contents("php://input"), true);

    // Insertar los datos en la base de datos
    $apertura = $data["apertura"];
    $cierre = $data["cierre"];
    $sql = "INSERT INTO casillas (apertura, cierre) VALUES ('$apertura', '$cierre')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Nuevo registro insertado correctamente";
    } else {
        echo "Error al insertar el registro: " . $conn->error;
    }
}

*/


if(isset($_POST['auth'])) {
    $auth = $_POST['auth'];
    
    // Realizar la consulta a la base de datos
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Preparar la consulta SQL para verificar si existe algún registro con el valor de auth proporcionado
    $sql = "SELECT COUNT(*) as count FROM users WHERE auth = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $auth);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Verificar si se encontró algún registro
    $exists = $row['count'] > 0;

    // Devolver la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode(['exists' => $exists]);

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
} else {
    // Si no se proporcionó el valor de auth en la petición POST, devolver un error
    http_response_code(400);
    echo json_encode(['error' => 'El valor de "auth" no fue proporcionado en la petición POST']);
}





// Cerrar la conexión
$conn->close();

?>
