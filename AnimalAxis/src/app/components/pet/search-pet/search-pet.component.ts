import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PetFilter } from '../../../models/filters/petFilter';
import { DropdownModule } from 'primeng/dropdown';
import { Raca } from '../../../models/raca';
import { RacaService } from '../../../services/raca.service';

@Component({
  selector: 'app-search-pet',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, NgForOf, TableModule, ButtonModule, CommonModule, DropdownModule],
  templateUrl: './search-pet.component.html',
  styleUrl: './search-pet.component.css'
})
export class SearchPetComponent implements OnInit {

  filterForm: FormGroup = new FormGroup({
    nome: new FormControl(''),
    raca: new FormControl(''),
    sexo: new FormControl(''),
  })

  constructor(private router: Router, private petService: PetService, private racaService: RacaService) { }




  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  racas: Raca[] = [];
  sexo = [
    { valor: 'M', nome: 'Macho' },
    { valor: 'F', nome: 'Femea' },
    { valor: 'T', nome: 'Todos' }
  ];


  ngOnInit(): void {
    this.initializeData();

  }

  initializeData() {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
      this.filteredPets = pets;
    })


    this.racaService.getRacas().subscribe(racas => {
      this.racas = racas;
    })
  }

  viewDetails(pet: any) {
    this.router.navigate(['/pet/details', pet.id]);
  }

  addPet() {
    this.router.navigate(['/pet/register']);
  }

  filter() {
    console.log(this.filterForm.value)
    let filterObject: PetFilter = {
      pets: this.pets,
      nome: this.filterForm.get('nome')?.value,
      raca: this.filterForm.get('raca')?.value ? this.filterForm.get('raca')?.value : null,
      sexo: this.filterForm.get('sexo')?.value ? this.filterForm.get('sexo')?.value.valor : 'T',
    }
    console.log(this.pets)

    this.petService.filter(filterObject).subscribe(pets => {
      this.filteredPets = pets;
    })
  }

}
