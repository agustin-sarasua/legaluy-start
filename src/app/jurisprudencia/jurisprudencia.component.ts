import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchForm, SearchSentenciasResponse, Sentencia } from '../models/model';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-jurisprudencia',
  templateUrl: './jurisprudencia.component.html',
  styleUrls: ['./jurisprudencia.component.css']
})
export class JurisprudenciaComponent {
  form: FormGroup;
  metadata = {};
  // property: Property | undefined
  searchResult: SearchSentenciasResponse | undefined
  selectedSentencia?: Sentencia;
  selectedSentenciaMessages: string[] = [];
  
  sentenciasMessagesMap: {[key: string]: string[]} = {};

  clickedSentencias?: Sentencia[] = [];

  @ViewChild('firstSidenav', { static: true }) firstDrawer!: MatSidenav;
  
  constructor(public auth: AuthService, private http: HttpClient, public backend: BackendService, public globalService: GlobalService) { 
    // this.globalService.showLoading();
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  searchSentencias(): void {
    if (this.form.valid) {
      this.globalService.showLoading();
      const { 
        name,
       } = this.form.value;

      const searchForm: SearchForm = {
        text: name
      };

      this.globalService.showLoading();

      this.backend.search(searchForm).subscribe({
        next: (data) => {
          console.log(data);
          this.searchResult = data
          this.globalService.showLoading();
        },
        error: (error) => {
          console.error('Error:', error);
          this.globalService.hideLoading();
          if (error.status === 400) {
            alert(error.error); // Assuming the error object has a "message" property
          }
        },
        complete: () => {
          console.log('Completed');
          this.globalService.hideLoading();
        }
      });
    
      
    }
  }

  selectSentencia(sentencia: Sentencia): void {
    this.selectedSentencia = sentencia;
    this.selectedSentenciaMessages = this.sentenciasMessagesMap[sentencia.numero] || [];
  }

  closeSentencia(sentencia: Sentencia): void {
    this.clickedSentencias = this.clickedSentencias?.filter((s) => s.numero !== sentencia.numero);

  }

  openChatFunction(sentencia: Sentencia): void {
    console.log('openChatFunction', sentencia);
    if (!this.clickedSentencias?.includes(sentencia)) {
      this.clickedSentencias?.push(sentencia);
    }

    this.selectedSentencia = sentencia;
    this.selectedSentenciaMessages = this.sentenciasMessagesMap[sentencia.numero] || [];
    this.sentenciasMessagesMap[sentencia.numero] = this.selectedSentenciaMessages;

    this.firstDrawer.open();
  }

  toggleDrawers(): void {
    if (this.selectedSentencia) {
      this.firstDrawer.close();
    } else {
      this.firstDrawer.open();
    }
  }
}
