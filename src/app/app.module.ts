import { appReducer } from './state/app.state';
import { EmployeesEffects } from './state/employees.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, EmployeesComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([EmployeesEffects]),
    StoreModule.forRoot(appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
