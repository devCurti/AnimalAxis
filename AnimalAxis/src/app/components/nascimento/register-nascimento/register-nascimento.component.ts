import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Pet } from '../../../models/pet';
import { PetService } from '../../../services/pet.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Nascimento } from '../../../models/nascimento';
import { NascimentoService } from '../../../services/nascimento.service';


@Component({
  selector: 'app-register-nascimento',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass, FormsModule, DropdownModule, CalendarModule, ToastModule,FloatLabelModule, InputNumberModule, InputTextareaModule],
  templateUrl: './register-nascimento.component.html',
  styleUrl: './register-nascimento.component.css',
  providers: [MessageService, DatePipe]
})
export class RegisterNascimentoComponent implements OnInit {

  nascimentoForm: any;


  constructor(private petService: PetService, private messageService: MessageService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private nascimentoService: NascimentoService){
    this.nascimentoForm = new FormGroup({
      previsaoNascimento: new FormControl('', Validators.required),
      pai: new FormControl('', Validators.required),
      mae: new FormControl('', Validators.required),
      numFilhotes: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  pais:Pet[] = [];
  maes:Pet[] = [];
  nascimento: Nascimento = {} as Nascimento;
  nascimentoId?: any;

  ngOnInit(): void {
    this.nascimentoId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.nascimentoId = +params['id'];
      this.nascimentoId ? this.loadNascimentoDetails(this.nascimentoId) : null;
    });
    this.initializeData();
  }

  async initializeData(){

    await this.petService.getPetsMachos().subscribe(pais => {
      this.pais = pais;
    })
    await this.petService.getPetsFemeas().subscribe(maes => {
      this.maes = maes;
    })
    
  }

  cadastrarNascimento(){
    if(this.nascimentoForm.valid){
      this.fillNascimentoObject();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Informações faltando!' });
    }
  }

  fillNascimentoObject(){
    const nascimento: Nascimento = {
      previsaoNascimento: this.nascimentoForm.get('previsaoNascimento').value,
      paiId: this.nascimentoForm.get('pai').value,
      maeId: this.nascimentoForm.get('mae').value,
      numFilhotes: this.nascimentoForm.get('numFilhotes').value,
      observacao: this.nascimentoForm.get('observacoes').value,
      usuarioId: 0
    };
    nascimento.id = this.nascimentoId ? this.nascimentoId : 0;
    if(!this.nascimentoId){
      this.nascimentoService.addNascimento(nascimento).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento registrado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/nascimento/search', response]);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    }else{
      this.nascimentoService.editNascimento(this.nascimentoId, nascimento).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento editado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/nascimento/search']);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    }
    
  }

  async loadNascimentoDetails(id: any){
    await this.nascimentoService.getNascimentoById(id).subscribe({
      next: response => {
        this.nascimento = response;
        this.fillForm();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
      }
    })

    
  }

  fillForm(){
    if(this.nascimento?.previsaoNascimento){
      const formattedDate = new Date(this.nascimento?.previsaoNascimento)
      this.nascimentoForm.get('previsaoNascimento').setValue(formattedDate)
    }

    this.nascimento?.maeId ? this.nascimentoForm.get('mae').setValue(this.nascimento?.maeId) : null;
    this.nascimento?.paiId ? this.nascimentoForm.get('pai').setValue(this.nascimento?.paiId) : null;
    this.nascimentoForm.get('numFilhotes').setValue(this.nascimento?.numFilhotes);
    this.nascimentoForm.get('observacoes').setValue(this.nascimento?.observacao);
  }

}
