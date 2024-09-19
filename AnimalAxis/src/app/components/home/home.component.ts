import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule, MenubarModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(){}

  user = 'Meu Canil'

  pets = [
    {
      nome: 'Tommy',
      raca: 'Shitzu',
      idade: '8'
    },
    {
      nome: 'Bella',
      raca: 'Golden Retriever',
      idade: '3'
    },
    {
      nome: 'Max',
      raca: 'Bulldog Francês',
      idade: '5'
    },
    {
      nome: 'Luna',
      raca: 'Poodle',
      idade: '2'
    }
  ];

  items = [
    {
      label: this.user,
      url: '',
      icon: '',
      route: '/home'
    },
    {
      label: 'Configurações',
      url: '',
      icon: '',
      route: '/home'
    },
    
    {
      label: 'Sair',
      url: '',
      icon: '',
      route: '/home'
    },
  ]

  
  
}
