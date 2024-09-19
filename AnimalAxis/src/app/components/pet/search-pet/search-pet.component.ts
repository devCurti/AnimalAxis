import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-search-pet',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, CommonModule],
  templateUrl: './search-pet.component.html',
  styleUrl: './search-pet.component.css'
})
export class SearchPetComponent {
  constructor(private router: Router){}

  pets = [
    { nome: 'Tommy', raca: 'Shitzu', idade: '8' },
    { nome: 'Bella', raca: 'Golden Retriever', idade: '3' },
    { nome: 'Max', raca: 'Bulldog Francês', idade: '5' },
    { nome: 'Luna', raca: 'Poodle', idade: '2' },
    { nome: 'Charlie', raca: 'Labrador', idade: '4' },
    { nome: 'Daisy', raca: 'Beagle', idade: '6' },
    { nome: 'Rocky', raca: 'Pitbull', idade: '7' },
    { nome: 'Molly', raca: 'Cocker Spaniel', idade: '3' },
    { nome: 'Buddy', raca: 'Husky Siberiano', idade: '5' },
    { nome: 'Rex', raca: 'Rottweiler', idade: '4' },
    { nome: 'Zara', raca: 'Dachshund', idade: '2' },
    { nome: 'Oscar', raca: 'Chihuahua', idade: '1' },
    { nome: 'Sophie', raca: 'Bichon Frise', idade: '7' },
    { nome: 'Milo', raca: 'Pug', idade: '6' },
    { nome: 'Lola', raca: 'Shih Tzu', idade: '8' },
    { nome: 'Toby', raca: 'French Bulldog', idade: '3' },
    { nome: 'Ruby', raca: 'Pomeranian', idade: '4' },
    { nome: 'Ginger', raca: 'Schnauzer', idade: '5' },
    { nome: 'Max', raca: 'Boxer', idade: '6' },
    { nome: 'Nala', raca: 'Yorkshire Terrier', idade: '2' },
    { nome: 'Bailey', raca: 'Great Dane', idade: '7' }
  ];

  viewDetails(pet: any){
    console.log(pet)
    this.router.navigate(['/pet/details']);
  }

}
