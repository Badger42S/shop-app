import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AlertComponenr } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponse } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin=true;
  isLoading=false;
  error:string=null;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;
  private closeSubs:Subscription;

  constructor(
    private authService:AuthService, 
    private router: Router, 
    private factory:ComponentFactoryResolver,
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading;
      this.error=authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.closeSubs){
      this.closeSubs.unsubscribe();
    }
  }

  onSubmit(form:NgForm){
    this.error=null;
    if(!form.valid){
      return
    }

    const email =form.value.email;
    const password =form.value.password;
    // let authObs:Observable<AuthResponse>;
    // this.isLoading=true;
    if(this.isLogin){
      // authObs=this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({
        email:email,
        password:password
      }))
    }else{
      // authObs=this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({
        email:email,
        password:password
      }))
    }

    
  //   authObs.subscribe(respSata=>{
  //     console.log(respSata);
  //     this.isLoading=false;
  //     this.router.navigate(['/recipes']);
  //   }, errMessage=>{
  //     console.log(errMessage);
  //     this.error=errMessage;
  //     this.showErrorAlert(errMessage);
  //     this.isLoading=false;
  // });

    form.reset();
  }

  onSwitchMode(){
    this.isLogin=!this.isLogin;
  }

  onHandleError(){
    this.error=null;
  }

  showErrorAlert(message:string){
    const alertCmpFactory=this.factory.resolveComponentFactory(AlertComponenr);
    const hostViewConttainerRef = this.alertHost.viewConteinerRef;

    hostViewConttainerRef.clear();
    const componentRef=hostViewConttainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message=message;
    this.closeSubs= componentRef.instance.close.subscribe(()=>{
      this.closeSubs.unsubscribe();
      hostViewConttainerRef.clear();
    });
  }
}
