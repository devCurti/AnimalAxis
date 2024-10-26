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
import { RegistroReprodutivo } from '../../../models/registroReprodutivo';
import { RegistroReprodutivoService } from '../../../services/registroReproducao';

@Component({
  selector: 'app-search-reproducao',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, CommonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './search-reproducao.component.html',
  styleUrl: './search-reproducao.component.css',
  providers: [MessageService, ConfirmationService]
})
export class SearchReproducaoComponent {
  constructor(private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private registroReprodutivoService: RegistroReprodutivoService) { }


  registroReprodutivos: RegistroReprodutivo[] = [];

  ngOnInit(): void {
    this.initializeData();

  }

  initializeData() {
    this.registroReprodutivoService.getRegistroReprodutivos().subscribe(registroReprodutivos => {
      this.registroReprodutivos = registroReprodutivos;
      console.log(this.registroReprodutivos)
    })
  }

  editRegistroReprodutivo(registro: any) {
    this.router.navigate(['/reproducao/register', registro.id]);
  }

  deleteRegistroReprodutivo(event: any, registroReprodutivo: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja deletar este registro reprodutivo? Esta ação não pode ser desfeita.',
      header: 'Confirmar Deleção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.registroReprodutivoService.deleteRegistroReprodutivos(registroReprodutivo.id).subscribe({
          next: response => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nascimento deletado com sucesso!' });

            // Recarrega a página após um breve atraso
            setTimeout(() => {
              window.location.reload();
            }, 1000); // 1 segundo de atraso para que o usuário veja a mensagem de sucesso
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro: ${error.message}` });
          }
        });
      }
    });
  }

  addRegistroReprodutivo() {
    this.router.navigate(['/reproducao/register']);
  }
}
