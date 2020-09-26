import {UserModel} from '../auth.model'
import * as AuthAction from './auth.actions'

export interface State{
    user:UserModel;
    authError: string;
    loading:boolean
}

const initialState:State={
    user:null,
    authError: null,
    loading:false
};

export function authReducer(state = initialState, action:AuthAction.AuthActions){
    switch(action.type){
        case AuthAction.AUTHENTICATE_SUCCESS:
            const user = new UserModel(
                action.data.email,
                action.data.userId,
                action.data.token,
                action.data.experationDate,
            );
            return {
                ...state,
                user:user,
                authError:null,
                loading:false
            }
        case AuthAction.LOGOUT:
            return {
                ...state,
                user:null
            }
        case AuthAction.LOGIN_START:
            return {
                ...state,
                authError:null,
                loading:true
            }
        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                user:null,
                authError:action.data,
                loading:false
            }
        default: return state; 
    }
}