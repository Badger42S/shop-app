import {UserModel} from '../auth.model'

export interface State{
    user:UserModel
}

const initialState:State={
    user:null
};

export function authReducer(state = initialState, action){
    switch(action){
        default: return state; 
    }
}