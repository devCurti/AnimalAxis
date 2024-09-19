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

@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.css'
})

export class RegisterPetComponent implements AfterViewInit, OnInit {

  petForm: any;

  constructor(){
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
    console.log(this.petForm.get('sexo').value);
    this.sexo = this.petForm.get('sexo').value;
  }

}

