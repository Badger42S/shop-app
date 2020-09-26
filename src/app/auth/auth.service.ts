import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { UserModel } from './auth.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActiions from './store/auth.actions';

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
    // userSubject = new BehaviorSubject<UserModel>(null);
    private experationTokenTimer:any;

    constructor(private http: HttpClient, private router: Router, private store:Store<fromApp.AppState>){}
    
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

    autoLogin(){
        const userData:{
            email:string, 
            id:string, 
            _token:string, 
            _tokenExperationDate:string
        } = JSON.parse(localStorage.getItem('user'));
        if(!userData){
            return;
        }
        const loadedUser=new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExperationDate)
        );

        if(loadedUser.token ){
            const experationdDuration = 
                new Date(userData._tokenExperationDate).getTime() - 
                new Date().getTime();
            this.autoLogout(experationdDuration);
            // this.userSubject.next(loadedUser);
            this.store.dispatch(new AuthActiions.AuthenticateSuccess({
                email:loadedUser.email, 
                userId:loadedUser.id,
                token:loadedUser.token, 
                experationDate: new Date(userData._tokenExperationDate)
            }));
        }
    }

    logout(){
        // this.userSubject.next(null);
        this.store.dispatch(new AuthActiions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.experationTokenTimer){
            clearTimeout(this.experationTokenTimer);
        }
        this.experationTokenTimer=null;
    }

    autoLogout(experationduration: number){
        this.experationTokenTimer=setTimeout(()=>{this.logout()} ,experationduration);
    }

    private handleAuth(email:string, userId:string, token:string, experationIn:number){
        const experationDate=new Date(experationIn*1000 + new Date().getTime());
        const user =new UserModel(
            email, 
            userId,
            token, 
            experationDate
        );

        // this.userSubject.next(user);
        this.store.dispatch(new AuthActiions.AuthenticateSuccess({
            email:email, 
            userId:userId,
            token:token, 
            experationDate: experationDate
        }));
        this.autoLogout(experationIn*1000);
        localStorage.setItem('user', JSON.stringify(user));
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