import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Grupo } from '../../model/grupo';
import { IdentificarGrupoPipe } from '../../pipes/identificar-grupo.pipe';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-gasto-nuevo',
  templateUrl: './operacion-sobre-gasto.component.html',
})
export class OperacionSobreGastoComponent implements OnInit {

  mostrar: boolean = false;

  grupo: Grupo ;

  monto: number = 0.0;

  es_agregar_gasto: boolean = true;

  @Output() readonly guardadoEvent = new EventEmitter<void>();

  constructor(
    private grupoService: GrupoService,
    private messageService: MessageService,
    private identificarGrupo: IdentificarGrupoPipe) {

  }

  ngOnInit(): void {

  }

  iniciarPara(grupo: Grupo, esAgregarGasto: boolean = true): void {

    this.mostrar = true;
    this.grupo = grupo;
    this.monto = 0.0;
    this.es_agregar_gasto = esAgregarGasto;
  }

  cancelar(): void {

    this.mostrar = false;
  }

  guardar(): void {

    if (this.es_agregar_gasto) {

      this.grupoService.agregarGasto(this.grupo, this.monto).subscribe(
        grupo => this.guardadoExitoso(grupo),
        error => this.guardadoFallido(error)
      );
    } else {
      this.grupoService.quitarGasto(this.grupo, this.monto).subscribe(
        grupo => this.guardadoExitoso(grupo),
        error => this.guardadoFallido(error)
      );
    }
  }

  obtenerHeader(): string {
    return this.es_agregar_gasto ? `Nuevo Gasto` : 'Reducir Gasto';
  }

  private guardadoExitoso(grupo: Grupo): void {

    const detail_operacion = this.es_agregar_gasto ? 'agregado' : 'reducido';

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Gasto ${detail_operacion} al grupo '${this.identificarGrupo.transform(grupo)}'`,
    });
    this.guardadoEvent.emit();
    this.mostrar = false;
  }

  private guardadoFallido(error: any): void {

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.mensaje,
    });
  }
}
