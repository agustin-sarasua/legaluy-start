import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Sentencia } from '../models/model';
import { SentenciaTextDialogComponent } from '../sentencia-text-dialog/sentencia-text-dialog.component';

@Component({
  selector: 'app-bjn-search-results',
  templateUrl: './bjn-search-results.component.html',
  styleUrls: ['./bjn-search-results.component.css']
  // imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class BjnSearchResultsComponent implements OnChanges {
  
  @Input() sentencia: Sentencia | undefined;

  @Output() openChatFunction: EventEmitter<Sentencia> = new EventEmitter<Sentencia>();

  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    const dialogData = {
      title: 'Dialog Title',
      content: 'This is the content to be displayed in the dialog.',
    };

    const dialogRef = this.dialog.open(SentenciaTextDialogComponent,  {
      data: this.sentencia,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['sentencia']) {
    //   console.log('sentencia changed:', this.sentencia);
    // }
  }

  truncateText(text: string | undefined, maxLength: number): string {
    if (text === undefined) {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  openChat() {
    this.openChatFunction.emit(this.sentencia);
  }
}
