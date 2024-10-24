import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../../shared/clients.service';
import { FormsUtilsService } from '../../../../shared/forms-utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsDto } from '../../../../shared/Models/ClientsDto';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client-modal',
  templateUrl: './new-client-modal.component.html',
  styleUrl: './new-client-modal.component.scss'
})
export class NewClientModalComponent {
  createClientForm!: FormGroup;

  get name() {
    return this.createClientForm.get('name') as FormControl;
  }

  get phone() {
    return this.createClientForm.get('phone') as FormControl;
  }
  get email() {
    return this.createClientForm.get('email') as FormControl;
  }


  constructor(
    public dialogRef: MatDialogRef<NewClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private clientService: ClientsService,
    public formValidate: FormsUtilsService) {
    this.createClientForm = this.creatForm();
  }

  async createClient() { 
    try {
      if(this.createClientForm.valid)
        {
          let request:ClientsDto = {
            email:this.email.value,
            name:this.name.value,
            phone:this.phone.value,
            dateAdded:"",
            sharedKey:""
          }
          let response = await firstValueFrom(this.clientService.createClient(request))
          if (response != null && response.body != null) {
            this.dialogRef.close(true)
          }
  
        }
    }catch (error: any) {
      if (error.status == 401 || error.status == 404) {
        Swal.fire('', error.error.message, 'error');
      } else {
        Swal.fire('', 'Error en el servicio, consulte a su administrador', 'error');
      }
    }



  }

  creatForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
