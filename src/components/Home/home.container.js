import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import LoadAppContainer from  '../LoadApp';
import SessionContainer from  '../Session';
import { isAuthenticated } from '../../store/sicca/sicca.actions';
import bg from '../../assets/bg/simple.jpg';
import '../../styles/main.scss'

/** @namespace Sicca/App/mapStateToProps */
export const mapStateToProps = (state) => ({
  isSubmitted: state.SiccaReducer.isSubmitted,
  name: state.SiccaReducer.name
});
/** @namespace Sicca/App/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
  isAuthenticated: (isSubmitted) => dispatch(isAuthenticated(isSubmitted))
});

function Home(props) {

  const { isSubmitted } = props;
  if(isSubmitted === false) {
    return <Navigate to="/" />;
}
  return (
    
    <div>   
      <div className="bar" />
      <div className="bg"> 
        <img src={bg} alt="bg"/>
      </div>   
      <div className = "menu">
        <label htmlFor="login">Hi,
        <p> {props.name}</p>  
        <button type="button" onClick={() => 
           { return (
            props.isAuthenticated(false),
            document.cookie = "sicca=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
             )}} > 
        </button></label>
      </div>
        <SessionContainer />
        <LoadAppContainer />
      
       
      <div className="footer col-s-12 col-12 col-b-12"> 
          <p>SICCA Sistema para el Control de Condominios </p> 
      </div> 
    </div> 
  
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

