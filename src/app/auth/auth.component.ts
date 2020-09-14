import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return
    }
    const email =form.value.email;
    const password =form.value.password;

    if(this.isLogin){

    }else{
      this.authService.signup(email, password)
        .subscribe(respSata=>{
          console.log(respSata);
        }, errSata=>{
          console.log(errSata);
        });
    }

    form.reset();
  }

  onSwitchMode(){
    this.isLogin=!this.isLogin;
  }
}
