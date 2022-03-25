import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { Navigate } from "react-router-dom";
import  LoginContainer  from '../Login/';
import { isAuthenticated } from '../../store/sicca/sicca.actions';


/** @namespace  Sicca/Component/Session/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isSubmitted: state.SiccaReducer.isSubmitted
});
/** @namespace  Sicca/Component/Session/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    isAuthenticated: (isSubmitted, user_id, name, ip) => dispatch(isAuthenticated(isSubmitted, user_id, name, ip))
});
/** @namespace  Sicca/Component/Session/Container/SessionContainer */
export class SessionContainer extends PureComponent {
    static propTypes = {}
    static defaultProps = {};
    constructor(props) {
        super(props)
        this.getUser = this.getUser.bind(this);
    }   
    state = {
        ip: null,
        role: null
    } 
    
    async componentDidMount() {
        this.getIP();
        function getCookie(name) {
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) === ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) === 0) {
                return c.substring(name.length + 1, c.length);
              }
            }
            return "";
          } 
        const cookie = getCookie('sicca');
        if(cookie){
             this.getUser(cookie);
        }
    }  
    getIP() {
        async function myIP(x) {
            await fetch('https://ipapi.co/json/', { //catch public IP
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(ipData => {
            console.log(JSON.stringify(ipData, null, 2));
            x.setState({
                ip: ipData.ip
            });
        });
        }   
        myIP(this);

    }   

    async getUser(token) {
        var userFound = false;
            function parseJwt (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            
                return JSON.parse(jsonPayload);
            };

            let JWT = parseJwt(token);
            let exp = JWT.exp * 1000;
            let id = parseInt(JWT.payload.id);
            let iat = Date.now();
            if(iat > exp) { //if expired  delete cookie and redirect
                document.cookie = "sicca=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                return (
                <LoginContainer getUser = { this.getUser }/>,
                this.props.isAuthenticated(false)
                )
            }
        
            let payload =  {
                    "token": token
                }
                
            var request = {    
                method: 'POST',
                headers: {
                    "Content-type": "application/json;"
                },
                mode: 'cors',
                body: JSON.stringify(payload)
            }
            await fetch('http://localhost/sicca/server/api/v1/users/', request ) 
            .then(response => response.json())
            .then(data => {
                console.log('Successful Session:', data);
                if(data.name){
                    const myIP =  this.state.ip; // Active IP by the header
                    userFound = true; 
                    this.setState({
                        role: data.role
                    });
                    return (
                        this.props.isAuthenticated(true, id, data.name, myIP)
                    )
                }
                if (data === 'Error'){
                    return (
                        this.props.isAuthenticated(false)
                    )
                }
        })
        .catch((error) => {
            console.error('fail fetching the users, you have errors:', error);
        });
        }
        render(){
            const { isSubmitted } = this.props;

            if(isSubmitted === true) {

                if(this.state.role === 'admin'){
                    return <Navigate to="/admin" />;
                }
                if(this.state.role === 'user'){
                    return <Navigate to="/user" />;
                }
                if(this.state.role === null){
                    return "";
                }
               
            }
            if(isSubmitted === false) {
                return <LoginContainer getUser = { this.getUser }/>
            }
        }

}
export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);