import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;
  isLoading=false;
  error:string=null;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return
    }

    const email =form.value.email;
    const password =form.value.password;

    let authObs:Observable<AuthResponse>;

    this.isLoading=true;
    if(this.isLogin){
      authObs=this.authService.login(email, password);
    }else{
      authObs=this.authService.signup(email, password);
    }

    authObs.subscribe(respSata=>{
      console.log(respSata);
      this.isLoading=false;
    }, errMessage=>{
      console.log(errMessage);
      this.error=errMessage;
      this.isLoading=false;
  });

    form.reset();
  }

  onSwitchMode(){
    this.isLogin=!this.isLogin;
  }
}
