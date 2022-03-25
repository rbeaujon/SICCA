<?PHP 
declare(strict_types=1);
require_once(__DIR__."/../../vendor/autoload.php");
use Firebase\JWT\JWT;
require (__DIR__."/db.php"); 


abstract class LoginService{
 
    public function __construct() { } 
    public static function getSession($login, $pass){

        $conn = new connectionDB();
        $conn->createConnection();
        $session = null; 

        $query= "SELECT * FROM users WHERE email='$login' and password='$pass' ";
        $result=$conn->executeQuery($query);
    
        $session = $result->fetch_assoc();
       
        if($session){
            $id = $session['id'];
            $key = "ThisOneIsMyPersonalKeyJWT";
            $time = time();
            $payload = array(
                "iat" => $time,
                "exp" => $time + (10*60), //Min * / Seg * Days hour
                "payload" => [
                    "id" => $id
                ]
            );
            $jwt = JWT::encode($payload, $key, 'HS256');
            $date = date("d/m/Y");
            

            $queryjwt= "SELECT * FROM `sessions` WHERE user_id = $id ";
            $resultjwt=$conn->executeQuery($queryjwt);
        
            $search = $resultjwt->fetch_assoc();
            $user_id = $search["user_id"];
            
            if($user_id){
                $token = $search['token'];
                $token = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
                $exp = $token->exp;
                $session["jwt"] = $search['token'];
            }else{
                $session["jwt"] = "$jwt";
            }

            if($time >= $exp){
                //Token expired

                //Del old token
                $delToken = "DELETE FROM `sessions` WHERE `sessions`.`user_id` = $user_id";
                $conn->executeQuery($delToken);
                //Create a new token after login
                $query= "INSERT INTO `sessions` (`user_id`, `token`, `date`) VALUES ($id, '$jwt', '$date')";
                $conn->executeQuery($query);
                return $session;
            }else{
                //Token active
                return $session;
            }
            
        }
        else{
                // Closing the connection with BD
                $conn->closeConnection();
                return "Error";
            }
        }

    public static function getUser($token){

        $conn = new connectionDB();
        $conn->createConnection();

        $querySession= "SELECT * FROM `sessions` WHERE token='$token' ";
        $resultSession=$conn->executeQuery($querySession);
        $session = $resultSession->fetch_assoc();
        $id = $session['user_id'];

        if($id){
        $query= "SELECT * FROM users WHERE id=$id ";
        $result=$conn->executeQuery($query);
    
        $data = $result->fetch_assoc();

        if($data){
            // Closing the connection with BD
            $conn->closeConnection();
            
            return $data;        
        }}
        else{
            return "Error";
        }
       

        // Closing the connection with BD
        $conn->closeConnection();

    }
   
   
}


?>