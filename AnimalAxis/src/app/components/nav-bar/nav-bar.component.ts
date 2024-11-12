import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, MenubarModule, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private auth: AuthService){}

  userEmail: any = localStorage.getItem('user.email');
  user = JSON.parse(localStorage.getItem('user') || '{}');

  items = [
    {
      label: 'Home',
      url: '',
      icon: '',
      route: '/home'
    }
  ]


  ngOnInit(){
    this.userEmail = this.user.email;
  }

  
  logout(){
    this.auth.logout();
  }
  

}
