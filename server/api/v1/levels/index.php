<?PHP
 /*
 * API controller to handle all comunication 
 */ 
require (__DIR__."/../../../services/menuService.php");
require (__DIR__."/../../../baseApi.php");


class Users extends api {

    public $jsonList;

    public function get(){}
    public function post(){
        // Raw data from the request and it converts into a PHP object
        $dataRaw = file_get_contents('php://input');
        $data = json_decode($dataRaw);

        //Variables from request 
        $role = $data->role;
        
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

            
            $levels = menuService::getLevels($role);
            if($levels !== 'Error'){
            $levels = [ 
                "configuracion" =>  $levels['configuracion'], 
                "propietarios" => $levels['propietarios'],
                "gastos" =>  $levels['gastos'],
                "recibos" =>  $levels['recibos'], 
                "pagos" => $levels['pagos'],
                "cargar deudas" =>  $levels['cargar deuda'], 
                "comunicacion" =>  $levels['comunicacion'], 
                "reportes" => $levels['reportes'],
                "cartelera" =>  $levels['cartelera'] 
            ];
           
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode($levels, JSON_PRETTY_PRINT);
         }else{
            $code = 404;
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            echo json_encode($levels, JSON_PRETTY_PRINT);
         }
        }  
    }
    public function put(){}
    public function delete(){}

}
$GameAPI = new Users();
$GameAPI->handleRequest();


