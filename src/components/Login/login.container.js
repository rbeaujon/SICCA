import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { Navigate } from "react-router-dom";
import { isAuthenticated, setError } from '../../store/sicca/sicca.actions';
import Login from './login.component';
import  './login.style.scss';


/** @namespace  Sicca/Component/Login/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isSubmitted: state.SiccaReducer.isSubmitted,
    error: state.SiccaReducer.error
});
/** @namespace  Sicca/Component/Login/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    isAuthenticated: (isSubmitted, user_id, name, ip) => dispatch(isAuthenticated(isSubmitted, user_id, name, ip)),
    setError: (login) => dispatch(setError(login))
});
/** @namespace  Sicca/Component/Login/Container/LoginContainer */
export class LoginContainer extends PureComponent {
    
    static propTypes = {}
    static defaultProps = {};
    constructor(props) {
        super(props)
        //this.getUser = this.getUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }   
    state = {
        ip: null
    } 
 
    
 
   
    handleLogin(event){
        
        event.preventDefault(); //the page doesn't reload
        let { email, pass } = document.forms[0];
        var userEmail = email.value;
        var userPass = pass.value;
        

        async function getSession(x) {

            let payload =  {
                "userEmail": userEmail,
                "userPass": userPass
            }
            
            var requestOptions = {    
            method: 'POST',
            headers: {
                "Content-type": "application/json;"
            },
            mode: 'cors',
            body: JSON.stringify(payload)
        };
        await fetch('http://localhost/sicca/server/api/v1/sessions/', requestOptions ) 
            .then(response => response.json())
            .then(data => {
                console.log('Successful Login:', data);

                    if(data != null){
                        let token = data.token;
                        let name = "sicca";
                        setCookie(name,token);
                        function setCookie(name, token) {
                            // const date = new Date();
                            //const time = date.getTime();
                            // date.setTime(date.getTime() + (1*24*60*60*1000));
                            // let expires = "expires=" + date.toUTCString();
                            document.cookie = name + "=" + token;
                          }
                        
                        return (
                            x.props.getUser(token)    
                        )
                    }
            })
            .catch((error) => {
                console.error('fail fetchin session, you have errors:', error);
            });
        }
        getSession(this);

    
}

    render(){
        const { isSubmitted, role } = this.props;
        

            if(isSubmitted === true && role === '1') {
                this.props.setError('submitted')
                return <Navigate to="/admin" />;
            }

        return(
            <div>  
                <div id="login">
                    <Login
                    { ...this.state }
                    { ...this.props }
                    handleLogin = { this.handleLogin }
                    />
                </div> 
            </div>
                
        )    
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);