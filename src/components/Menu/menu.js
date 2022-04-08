import { Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import login from '../../assets/icon/logo.jpg';
import  './menu.style.scss';

export const mapStateToProps = (state) => ({
    isSubmitted: state.SiccaReducer.isSubmitted,
    error: state.SiccaReducer.error,
    role: state.SiccaReducer.role
});
export const mapDispatchToProps = (dispatch) => ({
});
function Menu(props) {
  const { isSubmitted, role } = props;
  const navigate = useNavigate();


  //const [level, setLevels] = useState([]);
  
  // useEffect(() =>
  // async function getLevel() {
    
        
  //       let payload =  {
  //         "role": role
  //       }
      
  //       var requestOptions = {    
  //         method: 'POST',
  //         headers: {
  //             "Content-type": "application/json;"
  //         },
  //         mode: 'cors',
  //         body: JSON.stringify(payload)
  //       };
  //       await fetch('http://localhost/sicca/server/api/v1/levels/', requestOptions ) 
  //       .then(response => response.json())
  //       .then(({data: level }) => {

  //              // if(data != null){
  //                 setLevels(level);
  //               //}
  //             })
  //       // .catch((error) => {
  //       //     console.error('fail fetching levels:', error);
  //       // });

  //   }, [role])
  
   
    if(isSubmitted === false) {
      return <Navigate to="/" />;
    }
   

    const m = (
        <div>
          <nav>
            <ul> 
              <li> Menu 
                <ul>
                  <li> Configuracion        
                    <ul>
                      <li>AQUI</li>
                      <li onClick={() => navigate("/users")}> Usuarios </li>
                      <li onClick={() => navigate("/inmuebles")}>Inmuebles</li>
                      <li onClick={() => navigate("/bancos")}> Bancos</li>
                      <li onClick={() => navigate("/fondos")}> Fondos</li>
                      <li id='last' onClick={() => navigate("/intereses")}> Intereses de Mora </li>
                    </ul>
                  </li>
                  <li> Propietarios</li>
                  <li>Gastos </li>
                  <li>Recibos de Condominio</li>
                  <li>Pagos de Condominio </li>
                  <li>Cargar Deudas Anteriores </li>
                  <li>Comunicacion </li>
                  <li>Reportes </li>
                  <li>Cartelera  </li>
                </ul> 
              </li>
              <img src={login} alt="login" id="logo"  />
            </ul>
          </nav>
        </div>
    )

    if(role === '1' || role === '2'){

    return m
  }
  
  // if(role === '2'){
  //   return (
  //     <nav>
  //     <ul> 
  //       <li > Configuracion <Navigate to="/conf" className="links"/>
  //         <ul>
  //           <li> Usuarios 
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li> Edificio Sector
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li> Banco
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li> Cuentas Bancarias 
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li> Concepto de Fondos 
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li> Fondos
  //             <ul>
  //               <li> Agregar <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //           <li id='last'> Intereses de Mora
  //             <ul>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //         </ul>
  //       </li>
  //       <li> Propietarios
  //         <ul>
  //           <li id='last' className="links"> Carga desde Excel
  //             <ul>
  //               <li> Crear <Navigate to="/admin" className="links"/></li>
  //               <li> Editar <Navigate to="/admin" className="links"/></li>
  //               <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //             </ul>
  //           </li>
  //         </ul>
  //       </li>
  //       <li>Gastos
  //         <ul>
  //           <li> Conceptos de Gastos <Navigate to="/admin" className="links"/></li>
  //           <li> Presupuesto <Navigate to="/admin" className="links"/></li>
  //           <li id='last'> Gasto Mensual <Navigate to="/admin" className="links"/></li>
  //         </ul>
  //       </li>
  //       <li>Recibos de Condominio
  //         <ul>
  //           <li> Crear <Navigate to="/admin" className="links"/></li>
  //           <li> Editar <Navigate to="/admin" className="links"/></li>
  //           <li> Aprobar <Navigate to="/admin" className="links"/></li>
  //           <li> Enviar <Navigate to="/admin" className="links"/></li>
  //           <li id='last'> Eliminar <Navigate to="/admin" className="links"/></li>
  //         </ul>
  //       </li>
  //       <li>Pagos de Condominio
  //         <ul>
  //           <li> Registrar <Navigate to="/admin" className="links"/></li>
  //           <li> Certificar Pago <Navigate to="/admin" className="links"/></li>
  //           <li id='last'> Notas de Credito <Navigate to="/admin" className="links"/></li>
  //         </ul>
  //       </li>
  //       <li id='last'>Cargar Deudas Anteriores </li>
  //       <li>Comunicacion
  //         <ul>
  //           <li> Correos <Navigate to="/admin" className="links"/></li>
  //           <li id='last'> SMS <Navigate to="/admin" className="links"/></li>
  //         </ul>
  //       </li>
  //       <li id='last'>Reportes </li>
  //       <li id='last'>Cartelera  </li>
  //       <img src={login} alt="login" id="logo"  />
  //     </ul>
     
  //   </nav>
  //   )}


  function Nag(page){
    //let navigate = useNavigate();
    return <Navigate to={page} />;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);