import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';
import { CorService } from '../../../services/cor.service';
import { RacaService } from '../../../services/raca.service';

@Component({
  selector: 'app-details-pet',
  standalone: true,
  imports: [NgIf],
  templateUrl: './details-pet.component.html',
  styleUrl: './details-pet.component.css'
})
export class DetailsPetComponent implements OnInit {

  petId?: any;
  pet?: any;
  cor?: any;
  raca?: any;

  constructor(private route: ActivatedRoute, private petService: PetService, private corService: CorService, private racaService: RacaService){}

  ngOnInit() {
    this.initializeData();
  }
  
  initializeData(){
    this.petId = this.route.snapshot.paramMap.get('id');
    console.log(this.petId)
    this.route.params.subscribe(params => {
      this.petId = +params['id'];
      this.loadPetDetails(this.petId);
    });
  }

  async loadPetDetails(id: number) {
    await this.petService.getPetById(id).subscribe(pet => {
      this.pet = pet;
      console.log(pet)
      this.corService.getCorById(this.pet.corId).subscribe(cor => {
        this.cor = cor;
        this.racaService.getRacaById(this.pet.racaId).subscribe(raca => {
          this.raca = raca;
        })
      })
    });

    

    
  }

}
