import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: any;

  constructor(){

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  


}
