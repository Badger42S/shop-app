import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

import * as AuthActions from './store/auth.actions';
import { Injectable } from '@angular/core';

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
                return of(new AuthActions.Login(
                    {
                        email:respData.email,
                        userId: respData.localId, 
                        token: respData.idToken, 
                        experationDate:experationDate
                    }
                ));
            }),
            catchError(error=>{
                //
                return of();
            }))
        })
    );

    constructor(private actions$: Actions, private http:HttpClient){}
}