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

@Component({
  selector: 'app-search-nascimento',
  standalone: true,
  imports: [NgForOf, TableModule, ButtonModule, CommonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './search-nascimento.component.html',
  styleUrl: './search-nascimento.component.css',
  providers: [MessageService, ConfirmationService]
})
export class SearchNascimentoComponent implements OnInit {

  constructor(private router: Router, private nascimentoService: NascimentoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  nascimentos: Nascimento[] = [];

  ngOnInit(): void {
    this.initializeData();

  }

  initializeData() {
    this.nascimentoService.getNascimentos().subscribe(nascimento => {
      this.nascimentos = nascimento;
    })
  }

  editNascimento(nascimento: any) {
    this.router.navigate(['/nascimento/register', nascimento.id]);
  }

  deleteNascimento(event: any, nascimento: any) {
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
        this.nascimentoService.deleteNascimento(nascimento.id).subscribe({
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

  addNascimento() {
    this.router.navigate(['/nascimento/register']);
  }

}
