<?PHP 
declare(strict_types=1);
require_once(__DIR__."/../../vendor/autoload.php");
use Firebase\JWT\JWT;
require (__DIR__."/db.php"); 


abstract class menuService{
 
    public function __construct() { } 
    public static function getLevels($role){

        $conn = new connectionDB();
        $conn->createConnection();
        $levels = null; 

        $query= "SELECT * FROM levels WHERE id=$role ";
        $result=$conn->executeQuery($query);
    
        $levels = $result->fetch_assoc();
       
        if($levels){
            return $levels;
        }
        else{
                // Closing the connection with BD
                $conn->closeConnection();
                return "Error";
            }
        }

}


?>