import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';

import * as AuthActions from './store/auth.actions';
import { of } from 'rxjs';

export interface AuthResponse {
    idToken: string,
    email: 	string,
    refreshToken: 	string,
    expiresIn: 	string,
    localId: string,
    registered?: boolean
}

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
        ).pipe(catchError(error=>{
                //
                of();
            }), 
            map(respdata=>{
                of();
            }))
        })
    );

    constructor(private actions$: Actions, private http:HttpClient){}
}