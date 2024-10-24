import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../shared/clients.service';
import Swal from 'sweetalert2';
import { AdvancedSearchDto } from '../../../shared/Models/AdvancedSearchDto';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { NewClientModalComponent } from './new-client-modal/new-client-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrl: './client-manager.component.scss'
})
export class ClientManagerComponent {
  sharedtosearch: string = "";
  advsearchForm!: FormGroup;
  isAdvanceSearch: boolean = false
  displayedColumns: string[] = ['SharedKey', 'bussinesId', 'email', 'phone', 'dateadd'];
  dataSource: any;
  constructor(private formBuilder: FormBuilder, private clientService: ClientsService,public dialog: MatDialog) {
    this.advsearchForm = this.createadvsearchFormForm();
    this.getAll();
  }

  get name() {
    return this.advsearchForm.get('name') as FormControl;
  }

  get phone() {
    return this.advsearchForm.get('phone') as FormControl;
  }
  get startDate() {
    return this.advsearchForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.advsearchForm.get('endDate') as FormControl;
  }
  get email() {
    return this.advsearchForm.get('email') as FormControl;
  }


  
  async advSearch() {
    try {
      if (this.phone.value == "" && this.startDate.value == "" && this.endDate.value == ""
        && this.name.value == "" && this.email.value == ""
      ) {
        Swal.fire('', 'Debe seleccionar al menos un filtro', 'error');
        return;
      } else {
        let request: AdvancedSearchDto = {
          email: this.email.value,
          endDate: this.endDate.value != "" && this.endDate.value != null ? moment(this.endDate.value).format('DD/MM/YYYY') : "",
          name: this.name.value,
          phone: this.phone.value,
          starDate: this.startDate.value != "" && this.startDate.value != null ? moment(this.startDate.value).format('DD/MM/YYYY') : ""
        }

        let response = await firstValueFrom(this.clientService.advanceSearch(request))
        if (response != null && response.body != null) {
          this.dataSource = response.body;
        }
      }
    } catch (error: any) {
      if (error.status == 401 || error.status == 404) {
        Swal.fire('', error.error.message, 'error');
      } else {
        Swal.fire('', 'Error en el servicio, consulte a su administrador', 'error');
      }
    }

  }

  validateNotFilter() {
    if (this.phone.value == "" && (this.startDate.value == "" || this.startDate.value == null) && (this.endDate.value == "" || this.endDate.value == null)
      && this.name.value == "" && this.email.value == "" && this.sharedtosearch == ""
    ) {
      this.getAll();
    }
  }

  enableSearch() {
    this.isAdvanceSearch = !this.isAdvanceSearch;
  }

  async getBySharedKey() {
    try {
      let response = await firstValueFrom(this.clientService.getByshared(this.sharedtosearch))
      if (response != null && response.body != null) {
        this.dataSource = [response.body];
      }

    } catch (error: any) {
      if (error.status == 401 || error.status == 404) {
        Swal.fire('', error.error.message, 'error');
      } else {
        Swal.fire('', 'Error en el servicio, consulte a su administrador', 'error');
      }
    }

  }

  getAll() {
    this.clientService.getAll().subscribe(x => {
      if (x.body) {
        this.dataSource = x.body;
      }

    })
  }

  createadvsearchFormForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      phone: [''],
      email: ['', [Validators.email]],
      startDate: [''],
      endDate: ['']
    });
  }

  openCreateModal(){
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      data: '',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  downloadFile() {
    let data = this.dataSource;
    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
}
}
