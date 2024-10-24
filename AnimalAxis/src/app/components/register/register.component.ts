import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})



export class RegisterComponent {

    registerForm: any;

    constructor(private auth: AuthService, private router: Router){
      this.registerForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
      });
    }

    async register(){
      let email = this.registerForm.get('email').value;
      let senha = this.registerForm.get('senha').value;
      let usuario: Usuario = {email: email, password: senha, name: '', phone: ''}
      await this.auth.register(usuario).subscribe({
        next: response => {
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Erro ao adicionar usuário:', error);
        }
      });
    }
}
