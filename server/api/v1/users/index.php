<?PHP
 /*
 * API controller to handle all comunication 
 */ 
require (__DIR__."/../../../services/loginService.php");
require (__DIR__."/../../../baseApi.php");


class Users extends api {

    public $jsonList;

    public function get(){}
    public function post(){
        // Raw data from the request and it converts into a PHP object
        $dataRaw = file_get_contents('php://input');
        $data = json_decode($dataRaw);

        //Variables from request 
        $token = $data->token;
        
        $code = 200;
        api::responseCode($code);

        if($data == NULL || $data === ""){

            $code = 500;
            api::responseCode($code);
            $message = [];
            $message['error'] = "Error";
            

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode("$message, check the JSON data", JSON_PRETTY_PRINT);
        }
        else{ 

            
            $user = LoginService::getUser($token);
            if($user !== 'Error'){
            $user = [ "id" =>  (int)$user['id'] , "name" => $user['name'],"role" =>  $user['role'] ] ;
           
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode($user, JSON_PRETTY_PRINT);
         }else{
            $code = 404;
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode($user, JSON_PRETTY_PRINT);
         }
        }  
    }
    public function put(){}
    public function delete(){}

}
$GameAPI = new Users();
$GameAPI->handleRequest();


