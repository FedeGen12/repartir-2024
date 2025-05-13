import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Grupo } from '../../model/grupo'
import { GrupoService } from '../../services/grupo.service';
import { GrupoNuevoComponent } from '../grupo-nuevo/grupo-nuevo.component';
import { OperacionSobreGastoComponent } from "../operacion-sobre-gasto/operacion-sobre-gasto.component";

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
  providers: [GrupoService]
})
export class GruposComponent implements OnInit, AfterViewInit {

  lista: Grupo[] = [];

  @ViewChild(GrupoNuevoComponent) grupoNuevo!: GrupoNuevoComponent;

  @ViewChild(OperacionSobreGastoComponent) operacionGasto!: OperacionSobreGastoComponent;

  constructor(private grupoService: GrupoService, private messageService: MessageService) {

    this.cargar();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.grupoNuevo.guardadoEvent.subscribe(() => this.cargar());
    this.operacionGasto.guardadoEvent.subscribe(() => this.cargar());
  }

  private cargar(): void {

    this.grupoService.listar().subscribe(
      lista => this.lista = lista,
      error => this.listadoFallido(error)
    );
  }

  crear(): void {

    this.grupoNuevo.iniciar();
  }

  agregarGasto(grupo: Grupo): void {

    this.operacionGasto.iniciarPara(grupo, true);
  }

  quitarGasto(grupo: Grupo): void {

    this.operacionGasto.iniciarPara(grupo, false);
  }

  private listadoFallido(error: any): void {

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.mensaje,
    });
  }
}
