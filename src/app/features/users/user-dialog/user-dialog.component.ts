import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User, Rol } from '../../../core/models/user.model';

export interface UserDialogData { user?: User; }

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {
  form: FormGroup;
  roles: Rol[] = [];
  isEdit: boolean;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    this.isEdit = !!data?.user;
    const u = data?.user;
    const group: Record<string, unknown> = {
      nombre: [u?.nombre ?? '', Validators.required],
      email: [u?.email ?? '', [Validators.required, Validators.email]],
      idRol: [u?.rol?.id ?? null, Validators.required]
    };
    if (!this.isEdit) {
      group['password'] = ['', [Validators.required, Validators.minLength(6)]];
    }
    this.form = this.fb.group(group);
  }

  ngOnInit(): void {
    this.http.get<Rol[]>(`${environment.apiUrl}/roles`).subscribe(r => this.roles = r);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
