import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../../../core/models/person.model';

export interface PersonDialogData { person?: Person; }

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html'
})
export class PersonDialogComponent {
  form: FormGroup;
  isEdit: boolean;
  tiposDocumento = ['DNI', 'RUC', 'CE', 'PASAPORTE'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonDialogData
  ) {
    this.isEdit = !!data?.person;
    const p = data?.person;
    this.form = this.fb.group({
      nombres: [p?.nombres ?? '', Validators.required],
      apellidos: [p?.apellidos ?? '', Validators.required],
      tipoDocumento: [p?.tipoDocumento ?? 'DNI', Validators.required],
      numDocumento: [p?.numDocumento ?? '', Validators.required],
      direccion: [p?.direccion ?? ''],
      telefono: [p?.telefono ?? ''],
      email: [p?.email ?? '', Validators.email]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
