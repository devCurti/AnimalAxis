import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required,])
    });
  }

  ngOnInit(): void {
    this.auth.verifyAuth();
  }

  login() {
    if (this.loginForm.get('email').valid) {
      if (this.loginForm.get('senha').valid) {
        let email = this.loginForm.get('email').value;
        let senha = this.loginForm.get('senha').value;

        this.auth.login(email, senha).subscribe({
          next: response => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Login validado com sucesso!' });
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Seja bem-vindo!' });
            setTimeout(() => {
              this.router.navigate(['/home']);
          }, 2000);
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! \n${error.error}` });
          }
        })
      }else{
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Senha inválida!' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'E-mail inválido!' });
    }
  }
}
