<html>
<head>
    
<title>Enviar Correos de Activar desde busqueda con Cedula</title>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
function enviarcorreos($correovisitante,$identificacion,$nombrevisitante,$pin)
{       
    include 'phpqrcode/qrlib.php';
    $dir = 'temp/';
    $filename  = $dir.'test.png';        
    $tamanio = 5;
    $level = 'M';
    $framesize = 3;
    $id = $identificacion;
    $contenido = $identificacion;
    QRcode::png($contenido, $filename, $level, $tamanio, $framesize);
    // echo '<img src="'.$filename.'" text/>';          
    $_SESSION['message']= 'Ingreso a la UGC <strong>'.$correovisitante.'</strong>'
    .' Instrucciones para el uso del sistema de Control de  Acceso! ';       
    $para_usuario = $correovisitante;$subject = 'Descubre la Nueva Forma de Ingresar a tu Universidad';
    $message_body = 'Estimado/a. ' .$nombrevisitante.',
    <BR>
    Bienvenido a la Universidad La Gran Colombia.<br>
    Te hemos activado en la aplicacion Universidad Gran Colombia recuerda que tu pin es '.$pin.'
    ';
    echo $para_usuario,$subject."<br>";
    sendEmail($para_usuario, $subject, $message_body,$id);
    //header('Location:success.php');
    exit();
    echo '<img src="'.$filename.'" text/>';
    
}

function sendEmail($para_usuario, $subject, $message_body,$id)
{
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        $validar=0;
                $ruta = 'temp/test.png';
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication  
                $mail->Username = 'carne.virtual1@ugc.edu.co';                 // SMTP username
                $mail->Password = '#Con&so%19';                           // SMTP password
                $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to
                //Recipients
                $mail->setFrom('carne.virtual@ugc.edu.co', 'Control de Acceso Universidad La Gran Colombia');
                $mail->addAddress($para_usuario);     // Add a recipient

                //Attachments
                //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
                $mail->addAttachment($ruta, 'QR.png');    // Optional name
                //$mail->AddEmbeddedImage($ruta, 'imagen'); //ruta de archivo de imagen
                //Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = $subject;
                $mail->Body    = $message_body;
                echo $id;
               
                $mail->send();
                echo 'El mensaje fue enviado a '.$para_usuario;
                } catch (Exception $e) {
                    $validar=1;
                echo 'El mensaje no pudo ser enviado. Error: ', $mail->ErrorInfo;
        }
        // if($validar==0){
        //     $sql="UPDATE visitantes SET estado='E' WHERE identificacion = '$id'";
        //     $resultado=mysqli_query($con,$sql);
        //     echo "se cambio el estado correctamente";
        // }
}   
//cabeceras necesarias para recibir datos
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$correo=$request->email;
$identificacion=$request->uid;
$nombre=$request->name;
$pin=$request->pin;
enviarcorreos($correo,$identificacion,$nombre,$pin);
$alfin="Has enviado datos";
return $alfin;
// require 'conexion.php';
// $sql="SELECT * FROM visitantes WHERE estado='L' lIMIT 1 ";
// $resultado=mysqli_query($con,$sql);
// echo "<table>";
// echo "<tr>";
// echo "<th>Nombre</th>";
// echo "<th>Identificacion</th>";
// echo "<th>Correo</th>";
// echo "</tr>";

// while($fila = mysqli_fetch_assoc($resultado))
// {
// 	echo "<tr>";
// 	$identificacion=$fila['identificacion'];
// 	$nombre=$fila['nombre'];
//     $correo=$fila['correo'];
//     enviarcorreos($correo,$identificacion,$nombre,$con);
// 	echo "<td>".$identificacion."</td>";	
// 	echo "<td>".$nombre."</td>";
// 	echo "<td>".$correo."</td>";
// 	echo "</tr>";

// }
?>
</html>