import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { response } from 'express';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: any;

  constructor(private auth: AuthService, private router: Router){

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.auth.verifyAuth();
  }

  login(){
    let email = this.loginForm.get('email').value;
    let senha = this.loginForm.get('senha').value;

    this.auth.login(email, senha).subscribe({
      next: response => {
        this.router.navigate(['/home']);
      },
      error: response => {
        console.log(response)
      }
    })
  }
  
}
