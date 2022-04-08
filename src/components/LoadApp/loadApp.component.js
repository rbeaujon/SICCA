import { PureComponent } from 'react';
import  './loadApp.style.scss';

/** @namespace  Sicca/Component/LoadApp/Component/loadApp */
export class LoadApp extends PureComponent {
 
   
    
    render() {
       
       let { weather } = this.props;
   if(weather.length === 0){ 
       return "Cargando....."
    }
    else{      
       return (
            <div>
   
            </div> 
        )  }
  
    }
}
export default LoadApp;