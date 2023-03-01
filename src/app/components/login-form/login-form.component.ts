import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.module';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{
  //Dependency Injection
  constructor(private readonly loginService:LoginService){ }

  loginSubmit(loginForm: NgForm): void{

    //username
    const {username} = loginForm.value;

    this.loginService.login(username).subscribe({
      //Once it will receive the data it will come to the next property
      next:(trainer: Trainer)=>{

      },
      //if sth goes wrong, it will go to the error property
      error:()=>{

      }
    })
  }
}
