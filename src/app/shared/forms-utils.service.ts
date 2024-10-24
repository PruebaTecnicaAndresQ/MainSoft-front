import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsUtilsService {

  constructor() { }

  public validateFromGroup(nombreControl: string, nombreError: string, formGroup: FormGroup) {
    let control;
    if (formGroup) {
        control = formGroup.get(nombreControl);
        if (control) {
            let hasError: boolean = control.hasError(nombreError);
            return hasError;
        }
    }
    return null;
}
}
