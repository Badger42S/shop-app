import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

import * as AuthActions from './store/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './auth.model';

export interface AuthResponse {
    idToken: string,
    email: 	string,
    refreshToken: 	string,
    expiresIn: 	string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (email:string, localId:string, idToken:string, expiresIn:string)=>{
    const experationDate=new Date(+expiresIn*1000 + new Date().getTime());
    const user = new UserModel(email, localId, idToken, experationDate);
    localStorage.setItem('user', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(
        {
            email: email,
            userId: localId, 
            token: idToken, 
            experationDate:experationDate
        }
    );
};
const handleError = (errResponse:any)=>{
    let errMessage='Welcome into the unknow';
    if(!errResponse.error || !errResponse.error.error){
        return of(new AuthActions.AuthenticateFail(errMessage));
    }
    switch(errResponse.error.error.message){
    case 'EMAIL_EXSIST':
        errMessage ='This email exsist already';
        break;
    case 'EMAIL_NOT_FOUND':
        errMessage ='There is no user record corresponding to this identifier';
        break;
    case 'INVALID_PASSWORD':
        errMessage ='The password is invalid';
        break;
    }
    return of(new AuthActions.AuthenticateFail(errMessage));
};

@Injectable()
export class AuthEffests{
    @Effect()
    authSignup=this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart)=>{
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGMAMq5OfCn7KjQGERb-2DBP4522w0ZKM',
            {
                email:signupAction.data.email,
                password:signupAction.data.password,
                returnSecureToken:true
            }
        ).pipe(
            map(respData=>{
                return handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            }),
            catchError(errResponse=>{
                return handleError(errResponse)
            }))
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart)=>{
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGMAMq5OfCn7KjQGERb-2DBP4522w0ZKM',
            {
                email:authData.data.email,
                password:authData.data.password,
                returnSecureToken:true
            }
        ).pipe(
            map(respData=>{
                return handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
            }),
            catchError(errResponse=>{
                return handleError(errResponse)
            }))
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const userData:{
                email:string, 
                id:string, 
                _token:string, 
                _tokenExperationDate:string
            } = JSON.parse(localStorage.getItem('user'));
            if(!userData){
                return {type: 'lol'};
            }
            const loadedUser=new UserModel(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExperationDate)
            );
    
            if(loadedUser.token ){
                return new AuthActions.AuthenticateSuccess({
                    email:loadedUser.email, 
                    userId:loadedUser.id,
                    token:loadedUser.token, 
                    experationDate: new Date(userData._tokenExperationDate)
                })
                // const experationdDuration = 
                //     new Date(userData._tokenExperationDate).getTime() - 
                //     new Date().getTime();
                // this.autoLogout(experationdDuration);
            }
            return {type: 'lol'};
        })
    )

    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            localStorage.removeItem('user');
        })
    )

    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(()=>{
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http:HttpClient, private router: Router,){}
}