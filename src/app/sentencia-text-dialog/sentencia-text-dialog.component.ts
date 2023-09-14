import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sentencia-text-dialog',
  templateUrl: './sentencia-text-dialog.component.html',
  styleUrls: ['./sentencia-text-dialog.component.css']
})
export class SentenciaTextDialogComponent {
  paragraphs: string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.paragraphs = data.sentencia.split('\n\n');
  }

}
