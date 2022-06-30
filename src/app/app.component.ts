import { Component, OnInit } from '@angular/core';
import { Agenda } from './domain/agenda';
import { agendaServicio } from './service/agendaservicio';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .agenda-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService,ConfirmationService,]
})
export class AppComponent implements OnInit {

  agendaDialogo: boolean = false;
  agendas: Agenda[] = [];
  agenda!: Agenda;
  seleccionarAgendas: Agenda[] = [];
  presentado: boolean = false;
  value: boolean = true;

  constructor(private agendaServicio: agendaServicio, private mensaje: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.agendaServicio.getAgendas().then(data => this.agendas = data);
  }

  abrirNuevo() {
      this.agenda = {};
      this.presentado = false;
      this.agendaDialogo = true;
  }

  editarAgenda(agenda: Agenda) {
      this.agenda = {...agenda};
      this.agendaDialogo = true;
  }

  cargarDialogo() {
      this.agendaDialogo = false;
      this.presentado = false;
  }
  
  guardarAgenda() {
      this.presentado = true;

      if (this.agenda.nombres?.trim) {
          if (this.agenda.id) {
              this.agendas[this.buscarIndiceId(this.agenda.id)] = this.agenda;                
              this.mensaje.add({severity:'exitosa', summary: 'Exitosa', detail: 'Agenda Creada', life: 3000});
          }
          else {
              this.agenda.id = this.crearId();
              this.agendas.push(this.agenda);
              this.mensaje.add({severity:'exitosa', summary: 'Exitosa', detail: 'Agenda Creada', life: 3000});
          }

          this.agendas = [...this.agendas];
          this.agendaDialogo = false;
          this.agenda = {};
      }
  }

  buscarIndiceId(id: string): number {
      let index = -1;
      for (let i = 0; i < this.agendas.length; i++) {
          if (this.agendas[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  crearId(): string {
      let id = '';
      var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return id;
  }
}
