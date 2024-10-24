import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientManagerComponent } from './client-manager/client-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatTableModule} from '@angular/material/table';
import { NewClientModalComponent } from './client-manager/new-client-modal/new-client-modal.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ClientManagerComponent,
    NewClientModalComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    MatCardModule
  ],
  providers:[
    MatDatepickerModule
  ]
})
export class ClientsModule { }
