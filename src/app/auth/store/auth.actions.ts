import { Action } from "@ngrx/store";

export const AUTHENTICATE_SUCCESS='AUTHENTICATE_SUCCESS';
export const LOGOUT='LOGOUT';
export const LOGIN_START='LOGIN_START';
export const SIGNUP_START='SIGNUP_START';
export const AUTHENTICATE_FAIL='AUTHENTICATE_FAIL';

export class AuthenticateSuccess implements Action{
    readonly type=AUTHENTICATE_SUCCESS;
    constructor( public data:{ 
        email:string, 
        userId:string,
        token:string, 
        experationDate: Date
    }){}
}

export class Logout implements Action{
    readonly type=LOGOUT;
}

export class LoginStart implements Action{
    readonly type=LOGIN_START;
    constructor(public data:{email:string, password:string}){};
}

export class AuthenticateFail implements Action{
    readonly type=AUTHENTICATE_FAIL;
    constructor(public data:string){};
}

export class SignupStart implements Action{
    readonly type=SIGNUP_START;
    constructor(public data:{email:string, password:string}){};
}

export type AuthActions =AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart;