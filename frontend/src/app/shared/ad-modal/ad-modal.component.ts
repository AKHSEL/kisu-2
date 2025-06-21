import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-ad-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ad-modal.component.html',
  styleUrl: './ad-modal.component.css'
})
export class AdModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AdModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mensaje: string}
  ){}
  onConfirm():void {
    this.dialogRef.close(true);
  }

  onCancel(): void{
    this.dialogRef.close(false);
  }

}
