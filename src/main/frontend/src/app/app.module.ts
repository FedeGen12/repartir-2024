import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR'
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';

import { GruposComponent } from './components/grupos/grupos.component';
import { GrupoNuevoComponent } from './components/grupo-nuevo/grupo-nuevo.component';
import { OperacionSobreGastoComponent } from './components/operacion-sobre-gasto/operacion-sobre-gasto.component';
import { IdentificarGrupoPipe } from './pipes/identificar-grupo.pipe';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ResumirUsuarioPipe } from './pipes/resumir-usuario.pipe';

registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    GruposComponent,
    GrupoNuevoComponent,
    OperacionSobreGastoComponent,
    IdentificarGrupoPipe,
    BienvenidaComponent,
    UsuarioComponent,
    ResumirUsuarioPipe,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    ChipModule,
    ChipsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    IdentificarGrupoPipe,
    {provide: DEFAULT_CURRENCY_CODE, useValue: '$ '},
    {provide: LOCALE_ID, useValue: 'es-AR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
