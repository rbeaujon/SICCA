
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import LoadApp from './loadApp.component';
import '../../styles/main.scss';

/** @namespace  Sicca/Component/LoadApp/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    user_id: state.SiccaReducer.user_id,
    name: state.SiccaReducer.name
})
/** @namespace  Sicca/Component/LoadApp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
   
});
/** @namespace  Sicca/Component/LoadApp/Container/LoadAppContainer */
export class LoadAppContainer extends PureComponent {
    static propTypes = {}
    static defaultProps = {};
    state = {
     weather:[]
    }
     
    async componentDidMount() {
         this.getData();
    }  

    async getData() {
       
    
    
        }     

    render() {
        

        return (
            <div>
                     <LoadApp
                     { ...this.state }
                    />
            </div>
        )
    }
 }
export default connect(mapStateToProps, mapDispatchToProps)(LoadAppContainer);