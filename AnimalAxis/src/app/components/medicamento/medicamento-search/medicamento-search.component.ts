import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Nascimento } from '../../../models/nascimento';
import { NascimentoService } from '../../../services/nascimento.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RegistroMedicamento } from '../../../models/registroMedicamento';
import { RegistroMedicamentoService } from '../../../services/registroMedicamento';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';


@Component({
  selector: 'app-medicamento-search',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, CommonModule, ToastModule, ConfirmDialogModule, NavBarComponent],
  templateUrl: './medicamento-search.component.html',
  styleUrl: './medicamento-search.component.css',
  providers: [MessageService, ConfirmationService]
})
export class MedicamentoSearchComponent implements OnInit {
  constructor(private router: Router, private registroMedicamentoService: RegistroMedicamentoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  registrosMedicamentos: RegistroMedicamento[] = [];

  ngOnInit(): void {
    this.initializeData();

  }

  initializeData() {
    this.registroMedicamentoService.getRegistroMedicamento().subscribe((registroMedicamento: any) => {
      this.registrosMedicamentos = registroMedicamento;
      console.log(this.registrosMedicamentos)
    })
  }

  editRegistroMedicamento(medicamento: any) {
    this.router.navigate(['/medicamento/register', medicamento.id]);
  }

  deleteRegistroMedicamento(event: any, medicamento: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja deletar este Nascimento? Esta ação não pode ser desfeita.',
      header: 'Confirmar Deleção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.registroMedicamentoService.deleteMedicamento(medicamento.id).subscribe({
          next: (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento deletado com sucesso!' });

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro: ${error.message}` });
          }
        });
      }
    });
  }

  addRegistroMedicamento() {
    this.router.navigate(['/medicamento/register']);
  }
}
