import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet';
import { CorService } from '../../../services/cor.service';
import { RacaService } from '../../../services/raca.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { RegistroMedicamentoService } from '../../../services/registroMedicamento';
import { RegistroReprodutivoService } from '../../../services/registroReproducao';
import { NascimentoService } from '../../../services/nascimento.service';

@Component({
  selector: 'app-details-pet',
  standalone: true,
  imports: [NgIf, DatePipe, NavBarComponent, NgFor],
  templateUrl: './details-pet.component.html',
  styleUrl: './details-pet.component.css'
})
export class DetailsPetComponent implements OnInit {

  petId?: any;
  pet?: any;
  cor?: any;
  raca?: any;
  registrosMedicamentos?: any;
  registrosReprodutivos?: any;
  nascimentos?: any;

  constructor(private route: ActivatedRoute, private petService: PetService, private corService: CorService, private racaService: RacaService, private router: Router, private registerMedicamentoService: RegistroMedicamentoService, private registerReprodutivoService: RegistroReprodutivoService, private nascimentoService: NascimentoService){}

  ngOnInit() {
    this.initializeData();
  }
  
  initializeData(){
    this.petId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.petId = +params['id'];
      this.loadPetDetails(this.petId);
    });
  }

  async loadPetDetails(id: number) {
    await this.petService.getPetById(id).subscribe(pet => {
      this.pet = pet;
    });

    await this.registerMedicamentoService.getRegistroMedicamentosByPetId(this.petId).subscribe(registroMedicamento => {
      this.registrosMedicamentos = registroMedicamento;
    })

    await this.registerReprodutivoService.getRegistroReprodutivosByPetId(this.petId).pipe().subscribe(registroReprodutivo => {
      this.registrosReprodutivos = registroReprodutivo;
    })

    await this.nascimentoService.getNascimentoByPetId(this.petId).subscribe(nascimento => {
      this.nascimentos = nascimento;
    })
  }

  goEdit(){
    this.router.navigate(['/pet/register', this.petId]);
  }

}
