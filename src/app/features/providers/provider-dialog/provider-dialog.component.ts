import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provider } from '../../../core/models/person.model';

export interface ProviderDialogData { provider?: Provider; }

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html'
})
export class ProviderDialogComponent {
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProviderDialogData
  ) {
    this.isEdit = !!data?.provider;
    const p = data?.provider;
    this.form = this.fb.group({
      nombre: [p?.nombre ?? '', Validators.required],
      ruc: [p?.ruc ?? '', [Validators.required, Validators.pattern(/^\d{11}$/)]],
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
