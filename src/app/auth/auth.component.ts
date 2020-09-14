import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form);
    form.reset();
  }

  onSwitchMode(){
    this.isLogin=!this.isLogin;
  }
}
