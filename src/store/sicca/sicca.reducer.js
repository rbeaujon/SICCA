import { IS_AUTHENTICATED, SET_ERROR } from './sicca.actions';

export const getinitialState = () => ({
    isSubmitted: false,
    user_id: null,
    name: null,
    role: null,
    ip: null,
    error: null
});

/** @namespace  Sicca/Store/Sicca/Sicca/Reducer */
export const SiccaReducer = (
    state = getinitialState(),
    action
) => {
    const { payload, type } = action;

    switch (type) {

    case IS_AUTHENTICATED:
        return {
            ...state,
            isSubmitted: payload.login,
            user_id:  payload.id,
            name:  payload.name,
            role: payload.role,
            ip: payload.ip
        } 
    case SET_ERROR:
        if(payload.error === 'login'){
            return {
                ...state,
                error: 'Login error, check your credentials and try again'
            }     
        }
        if(payload.error === 'submitted'){
            return {
                ...state,
                error: ''
            }     
        }
              
    // eslint-disable-next-line no-fallthrough
    default:
            return state;
    }
};

export default SiccaReducer;
