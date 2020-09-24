import {UserModel} from '../auth.model'
import * as AuthAction from './auth.actions'

export interface State{
    user:UserModel
}

const initialState:State={
    user:null
};

export function authReducer(state = initialState, action:AuthAction.AuthActions){
    switch(action.type){
        case AuthAction.LOGIN:
            const user = new UserModel(
                action.data.email,
                action.data.userId,
                action.data.token,
                action.data.experationDate,
            );
            return {
                ...state,
                user:user
            }
        case AuthAction.LOGOUT:
            return {
                ...state,
                user:null
            }
        default: return state; 
    }
}