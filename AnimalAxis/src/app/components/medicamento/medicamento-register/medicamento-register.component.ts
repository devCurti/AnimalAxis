import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
import { RegistroMedicamentoService } from '../../../services/registroMedicamento';
import { MedicamentoService } from '../../../services/medicamento.service';
import { TipoMedicamentoService } from '../../../services/tipoMedicamento.service';
import { tipoMedicamento } from '../../../models/tipoMedicamento';
import { Medicamento } from '../../../models/medicamento';
import { RegistroMedicamento } from '../../../models/registroMedicamento';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgFor } from '@angular/common';
import { Doses } from '../../../models/enums/dose';




@Component({
  selector: 'app-medicamento-register',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, InputSwitchModule, NgIf, NgClass, FormsModule, DropdownModule, CalendarModule, ToastModule, FloatLabelModule, InputNumberModule, InputTextareaModule, RadioButtonModule, NgFor],
  templateUrl: './medicamento-register.component.html',
  styleUrl: './medicamento-register.component.css',
  providers: [MessageService, DatePipe]
})
export class MedicamentoRegisterComponent implements OnInit {

  medicamentoForm: any;
  medicamentoId?: any;
  pets: Pet[] = [];
  tipoMedicamentos: tipoMedicamento[] = [];
  medicamentos: Medicamento[] = [];
  doses = Doses
  registroMedicamento?: RegistroMedicamento;


  constructor(private petService: PetService, private messageService: MessageService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private registroMedicamentoService: RegistroMedicamentoService, private medicamentoService: MedicamentoService, private tipoMedicamentoService: TipoMedicamentoService) {
    this.medicamentoForm = new FormGroup({
      dataDaAplicacao: new FormControl('', Validators.required),
      pet: new FormControl('', Validators.required),
      tipoMedicamento: new FormControl(''),
      medicamento: new FormControl('', Validators.required),
      dose: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.medicamentoId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.medicamentoId = +params['id'];
      this.medicamentoId ? this.loadRegistroMedicamentoDetails(this.medicamentoId) : null;
    });
    this.initializeData();
  }

  async initializeData() {

    this.medicamentoForm.get('dose').setValue(Doses[0]);

    await this.petService.getPets().subscribe(pets => {
      this.pets = pets;
    })

    await this.tipoMedicamentoService.getTipoMedicamentos().subscribe(tipoMedicamento => {
      this.tipoMedicamentos = tipoMedicamento;
    })

    await this.medicamentoService.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    })
  }


  cadastrarRegistroMedicamento() {
    if (this.medicamentoForm.valid) {
      this.fillRegistroMedicamentoObject();
    } else {
      console.log(this.medicamentoForm)
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Informações faltando!' });
    }
  }

  fillRegistroMedicamentoObject() {
    const registroMedicamento: RegistroMedicamento = {
      dataAplicacao: this.medicamentoForm.get('dataDaAplicacao').value,
      medicamentoId: this.medicamentoForm.get('medicamento').value,
      petId: this.medicamentoForm.get('pet').value,
      usuarioId: 0,
      dose: this.medicamentoForm.get('dose').value.dose
    };
    registroMedicamento.id = this.medicamentoId ? this.medicamentoId : 0;
    if (!this.medicamentoId) {
      this.registroMedicamentoService.addRegistroMedicamento(registroMedicamento).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento registrado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/medicamento/search', response]);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    } else {
      this.registroMedicamentoService.editNascimento(this.medicamentoId, registroMedicamento).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento editado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/medicamento/search']);
          }, 2000);
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
        }
      })
    }
  }

  async loadRegistroMedicamentoDetails(id: any){
    await this.registroMedicamentoService.getRegistroMedicamentosById(id).subscribe({
      next: response => {
        this.registroMedicamento = response;
        this.fillForm();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro! ${error}` });
      }
    })

    
  }

  fillForm(){
    console.log(this.registroMedicamento)
    if(this.registroMedicamento?.dataAplicacao){
      const formattedDate = new Date(this.registroMedicamento?.dataAplicacao)
      this.medicamentoForm.get('dataDaAplicacao').setValue(formattedDate)
    }

    this.registroMedicamento?.petId ? this.medicamentoForm.get('pet').setValue(this.registroMedicamento?.petId) : null;
    this.medicamentoForm.get('medicamento').setValue(this.registroMedicamento?.medicamentoId);
    this.registroMedicamento?.dose ? this.medicamentoForm.get('dose').setValue(Doses[this.registroMedicamento?.dose]) : this.medicamentoForm.get('dose').setValue(Doses[0]);
  }
}