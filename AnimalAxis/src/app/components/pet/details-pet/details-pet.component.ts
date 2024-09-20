import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details-pet',
  standalone: true,
  imports: [NgIf],
  templateUrl: './details-pet.component.html',
  styleUrl: './details-pet.component.css'
})
export class DetailsPetComponent {
  pet = {
    nome: 'Tommy', 
    raca: 'Shitzu', 
    idade: '8',
    criadores: 'nao sei oq signifca',
    dataNascimento: '01/10/2002',
    numeroRegistro: '132456',
    pai: 'dudao',
    mae: 'gian',
    cor: 'preto',
    periodoCruza: '10/10/2010',
    dataCio: '10/10/2012',
    sexo: 'M'
  }
}
