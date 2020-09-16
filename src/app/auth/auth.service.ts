import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { UserModel } from './auth.model';

export interface AuthResponse {
    idToken: string,
    email: 	string,
    refreshToken: 	string,
    expiresIn: 	string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{
    userSubject = new BehaviorSubject<UserModel>(null);

    constructor(private http: HttpClient){}
    
    signup(email:string, password:string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGMAMq5OfCn7KjQGERb-2DBP4522w0ZKM',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.handleError),
            tap(respData=>{
                this.handleAuth(
                    respData.email, 
                    respData.localId, 
                    respData.idToken, 
                    +respData.expiresIn
                );
            })
        );
    }

    login(email:string, password:string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGMAMq5OfCn7KjQGERb-2DBP4522w0ZKM',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.handleError),
            tap(respData=>{
                this.handleAuth(
                    respData.email, 
                    respData.localId, 
                    respData.idToken, 
                    +respData.expiresIn
                );
            })
        );
    }

    private handleAuth(email:string, userId:string, token:string, experationIn:number){
        const experationDate=new Date(experationIn*1000 + new Date().getTime());
        const user =new UserModel(
            email, 
            userId,
            token, 
            experationDate
        );

        this.userSubject.next(user);
    }

    private handleError(errResponse: HttpErrorResponse){
        let errMessage='Welcome into the unknow';
        if(!errResponse.error || !errResponse.error.error){
            return throwError(errMessage)
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
        return throwError(errMessage);
    }
}