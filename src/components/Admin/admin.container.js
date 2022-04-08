import { connect } from 'react-redux';
import LoadAppContainer from  '../LoadApp';
import Menu from '../Menu';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../../store/sicca/sicca.actions';
import bg from '../../assets/bg/simple.jpg';
import '../../styles/main.scss'
import './admin.style.scss';

/** @namespace Sicca/App/mapStateToProps */
export const mapStateToProps = (state) => ({
  isSubmitted: state.SiccaReducer.isSubmitted,
  name: state.SiccaReducer.name
});
/** @namespace Sicca/App/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
  isAuthenticated: (isSubmitted) => dispatch(isAuthenticated(isSubmitted))
});

function Admin(props) {

  const { isSubmitted } = props;
  if(isSubmitted === false) {
    return <Navigate to="/" />;
}
  return (
    
    <div>     
       <Menu />
  
      <div className="bar" />
      <div className="bg"> 
        <img src={bg} alt="bg"/>
      </div>  

      <div className = "menu-lateral">
        <label htmlFor="login">Hi,
        <p> {props.name}</p>  
        <button type="button" onClick={() => 
           { return (
            props.isAuthenticated(false),
            document.cookie = "sicca=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
             )}} > 
        </button></label>
      </div>
        
        <LoadAppContainer />
      
       
      <div className="footer col-s-12 col-12 col-b-12"> 
          <p>SICCA Sistema para el Control de Condominios </p> 
      </div> 
    </div> 
  
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

