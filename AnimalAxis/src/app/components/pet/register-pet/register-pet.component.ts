import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { Cor } from '../../../models/cor';
import { CorService } from '../../../services/cor.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RacaService } from '../../../services/raca.service';
import { Raca } from '../../../models/raca';
import { CalendarModule } from 'primeng/calendar';
import { Pet } from '../../../models/pet';
import { PetService } from '../../../services/pet.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass, FormsModule, DropdownModule, CalendarModule],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.css'
})

export class RegisterPetComponent implements AfterViewInit, OnInit {

  petForm: any;

  constructor(private corService: CorService, private racaService: RacaService, private petService: PetService, private authService: AuthService){
    this.petForm = new FormGroup({
      nome: new FormControl(''),
      raca: new FormControl(''),
      criadores: new FormControl(''),
      dataDeNascimento: new FormControl(''),
      numeroDoRegistro: new FormControl(''),
      pai: new FormControl(''),
      mae: new FormControl(''),
      cor: new FormControl(''),
      periodoDeCruza: new FormControl(''),
      dataDoCio: new FormControl(''),
      sexo: new FormControl(true)
    });
  }

  sexo: any;
  cores: Cor[] = [];
  selectedCor: Cor[] = [];
  racas: Raca[] = [];

  ngAfterViewInit(): void {
    this.petForm.get('sexo').valueChanges.subscribe((value: any) =>{
      this.sexo = value;
    })
  }

  ngOnInit(): void {
    this.initializeData();
  }

  async initializeData(){
    await this.petForm.get('sexo').setValue(true);
    this.sexo = this.petForm.get('sexo').value;

    this.corService.getCores().subscribe(cores => {
      this.cores = cores;
    })
    this.racaService.getRacas().subscribe(racas => {
      this.racas = racas;
    })
  }

  cadastrarPet(){
    this.fillPetObject();

  }

  fillPetObject(){
    const sexo = this.petForm.get('sexo').value === true ? 'M' : 'F'
    const cor: Cor = this.petForm.get('cor').value
    const raca: Raca = this.petForm.get('raca').value

    const pet: Pet = {
      Nome: this.petForm.get('nome').value,
      RacaId: this.petForm.get('raca').value.id,
      DataNascimento: this.petForm.get('dataDeNascimento').value,
      Pedigree: this.petForm.get('numeroDoRegistro').value,
      CorId: this.petForm.get('cor').value.id,
      Sexo: sexo,
      UsuarioId: 1
    }
    console.log(pet);
    this.petService.addPet(pet).subscribe({
      next: response => {
        console.log('Pet adicionado! ' + response);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}

