import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

import * as AuthActions from './store/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponse {
    idToken: string,
    email: 	string,
    refreshToken: 	string,
    expiresIn: 	string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffests{
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
                const experationDate=new Date(+respData.expiresIn*1000 + new Date().getTime());
                return new AuthActions.Login(
                    {
                        email:respData.email,
                        userId: respData.localId, 
                        token: respData.idToken, 
                        experationDate:experationDate
                    }
                );
            }),
            catchError(errResponse=>{
                let errMessage='Welcome into the unknow';
                if(!errResponse.error || !errResponse.error.error){
                    return of(new AuthActions.LoginFail(errMessage));
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
                return of(new AuthActions.LoginFail(errMessage));
            }))
        })
    );

    @Effect({dispatch:false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(()=>{
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http:HttpClient, private router: Router,){}
}