import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Sentencia } from '../models/model';

@Component({
  selector: 'app-bjn-search-results',
  templateUrl: './bjn-search-results.component.html',
  styleUrls: ['./bjn-search-results.component.css']
  // imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class BjnSearchResultsComponent implements OnChanges {
  
  @Input() sentencia: Sentencia | undefined;

  @Output() openChatFunction: EventEmitter<Sentencia> = new EventEmitter<Sentencia>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sentencia']) {
      console.log('sentencia changed:', this.sentencia);
    }
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
