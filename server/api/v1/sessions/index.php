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
        $userEmail = $data->userEmail;
        $userPass = $data->userPass;
        
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

            $session = LoginService::getSession($userEmail, $userPass);
            $sessions = [ "token" => $session['jwt']  ] ;
      
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode($sessions, JSON_PRETTY_PRINT);
            
        }  
    }
    public function put(){}
    public function delete(){}

}
$GameAPI = new Users();
$GameAPI->handleRequest();


