import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule, MenubarModule, NgIf, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
