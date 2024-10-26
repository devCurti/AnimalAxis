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
import { RegistroReprodutivo } from '../../../models/registroReprodutivo';
import { RegistroReprodutivoService } from '../../../services/registroReproducao';

@Component({
  selector: 'app-register-reproducao',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass, FormsModule, DropdownModule, CalendarModule, ToastModule,FloatLabelModule, InputNumberModule, InputTextareaModule],
  templateUrl: './register-reproducao.component.html',
  styleUrl: './register-reproducao.component.css',
  providers: [MessageService, DatePipe]
})
export class RegisterReproducaoComponent implements OnInit {

  registroReprodutivoForm: any;


  constructor(private petService: PetService, private messageService: MessageService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private RegistroReprodutivoService: RegistroReprodutivoService){
    this.registroReprodutivoForm = new FormGroup({
      femea: new FormControl('', Validators.required),
      macho: new FormControl('', Validators.required),
      dataCio: new FormControl('', Validators.required),
      periodoCruza: new FormControl('', Validators.required),
    });
  }

  femeas:Pet[] = [];
  machos:Pet[] = [];

  registroReprodutivoId?: any;
  registroReprodutivo?: RegistroReprodutivo;

  ngOnInit(): void {
    this.registroReprodutivoId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.registroReprodutivoId = +params['id'];
      this.registroReprodutivoId ? this.loadNascimentoDetails(this.registroReprodutivoId) : null;
    });
    this.initializeData();
  }

  async initializeData(){

    await this.petService.getPetsMachos().subscribe(machos => {
      this.machos = machos;
    })
    await this.petService.getPetsFemeas().subscribe(femeas => {
      this.femeas = femeas;
    })
    
  }

  cadastrarRegistroReprodutivo(){
    if(this.registroReprodutivoForm.valid){
      this.fillNascimentoObject();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Informações faltando!' });
    }
  }

  fillNascimentoObject(){
    const registroReprodutivo: RegistroReprodutivo = {
      femeaId: this.registroReprodutivoForm.get('femea').value,
      machoId: this.registroReprodutivoForm.get('macho').value,
      dataDoCio: this.registroReprodutivoForm.get('dataCio').value,
      periodoDeCruz: this.registroReprodutivoForm.get('periodoCruza').value,
      usuarioId: 0
    };
    registroReprodutivo.id = this.registroReprodutivoId ? this.registroReprodutivoId : 0;
    if(!this.registroReprodutivoId){
      this.RegistroReprodutivoService.addRegistroReprodutivo(registroReprodutivo).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro Reprodutivo registrado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/reproducao/search', response]);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    }else{
      this.RegistroReprodutivoService.editRegistroReprodutivos(this.registroReprodutivoId, registroReprodutivo).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro Reprodutivo editado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/reproducao/search']);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    }
    
  }

  async loadNascimentoDetails(id: any){
    await this.RegistroReprodutivoService.getRegistroReprodutivosById(id).subscribe({
      next: response => {
        this.registroReprodutivo = response;
        this.fillForm();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
      }
    })

    
  }

  fillForm(){
    let formattedDate;
    this.registroReprodutivoForm.get('femea').setValue(this.registroReprodutivo?.femeaId);
    this.registroReprodutivoForm.get('macho').setValue(this.registroReprodutivo?.machoId);
    this.registroReprodutivo?.dataDoCio != null ? formattedDate = new Date(this.registroReprodutivo?.dataDoCio) : null;
    this.registroReprodutivoForm.get('dataCio').setValue(formattedDate);
    this.registroReprodutivo?.dataDoCio != null ? formattedDate = new Date(this.registroReprodutivo?.periodoDeCruz) : null;
    this.registroReprodutivoForm.get('periodoCruza').setValue(formattedDate);
  }

}
