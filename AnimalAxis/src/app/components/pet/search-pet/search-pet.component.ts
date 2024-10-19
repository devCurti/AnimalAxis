import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';

@Component({
  selector: 'app-search-pet',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, CommonModule],
  templateUrl: './search-pet.component.html',
  styleUrl: './search-pet.component.css'
})
export class SearchPetComponent implements OnInit{
  constructor(private router: Router, private petService: PetService){}


  pets: Pet[] = [];

  ngOnInit(): void {
    this.initializeData();
    
  }

  initializeData(){
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
      console.log(this.pets);
    })
  }

  viewDetails(pet: any){
    this.router.navigate(['/pet/details', pet.id]);
  }

}
