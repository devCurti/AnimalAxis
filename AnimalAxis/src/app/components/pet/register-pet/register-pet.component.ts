import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { Cor } from '../../../models/cor';
import { CorService } from '../../../services/cor.service';
import { FormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RacaService } from '../../../services/raca.service';
import { Raca } from '../../../models/raca';
import { CalendarModule } from 'primeng/calendar';
import { Pet } from '../../../models/pet';
import { PetService } from '../../../services/pet.service';
import { AuthService } from '../../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass, FormsModule, DropdownModule, CalendarModule, ToastModule],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.css',
  providers: [MessageService]
})

export class RegisterPetComponent implements AfterViewInit, OnInit {

  petForm: any;

  constructor(private corService: CorService, private racaService: RacaService, private petService: PetService, private authService: AuthService, private messageService: MessageService, private router: Router){
    this.petForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      raca: new FormControl('', Validators.required),
      criadores: new FormControl(''),
      dataDeNascimento: new FormControl('', Validators.required),
      numeroDoRegistro: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]), // Exemplo para números
      pai: new FormControl(''),
      mae: new FormControl(''),
      cor: new FormControl('', Validators.required),
      periodoDeCruza: new FormControl(''),
      dataDoCio: new FormControl(''),
      sexo: new FormControl(true)
    });
  }

  sexo: any;
  cores: Cor[] = [];
  selectedCor: Cor[] = [];
  racas: Raca[] = [];
  pais: Pet[] = [];
  maes: Pet[] = [];

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
    this.petService.getPetsMachos().subscribe(pais => {
      this.pais = pais;
      console.log(this.pais)
    })
    this.petService.getPetsFemeas().subscribe(maes => {
      this.maes = maes;
      console.log(this.maes)
    })
  }

  cadastrarPet(){
    if(this.petForm.valid){
      this.fillPetObject();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Informações faltando!' });
    }
  }

  fillPetObject(){
    const sexo = this.petForm.get('sexo').value === true ? 'M' : 'F'
    const cor: Cor = this.petForm.get('cor').value
    const raca: Raca = this.petForm.get('raca').value
    console.log(this.petForm.get('cor'))
    const pet: Pet = {
      Nome: this.petForm.get('nome').value,
      RacaId: this.petForm.get('raca').value.id,
      DataNascimento: this.petForm.get('dataDeNascimento').value,
      Pedigree: this.petForm.get('numeroDoRegistro').value,
      CorId: this.petForm.get('cor').value.id,
      Sexo: sexo,
      UsuarioId: 1,
      PaiId: this.petForm.get('pai').value ? this.petForm.get('pai').value.id : null,
      MaeId: this.petForm.get('mae').value ? this.petForm.get('mae').value.id : null,
      PeriodoCruza: this.petForm.get('periodoDeCruza').value ? this.petForm.get('periodoDeCruza').value : null,
      DataCio: this.petForm.get('dataDoCio').value ? this.petForm.get('dataDoCio').value : null
    }
    console.log(pet);
    this.petService.addPet(pet).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet registrado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/pet/details', response]);
      }, 2000);
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
      }
    })
  }
}

