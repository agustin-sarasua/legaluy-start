import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { concatMap, tap, map } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

import {BackendService} from './backend.service'
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('loadingOverlay') loadingOverlayTemplate!: TemplateRef<any>;

  title = 'bnbot-start';
  metadata = {};

  constructor(public auth: AuthService, private http: HttpClient, public backend: BackendService, public global: GlobalService){}


  ngOnInit() {
    this.global.init(this.loadingOverlayTemplate);

    this.auth.isAuthenticated$.subscribe(loggedIn => {
      if (loggedIn) {
        // this.backend.getBusinessInfo().subscribe({
        //   next: (data) => {
        //     console.log(data);
        //     // this.global.setBusiness(data);
        //   },
        //   error: (error) => {
        //     console.error('Error:', error);
        //   },
        //   complete: () => {
        //     console.log('Completed');
        //   }
        // });
      }
    });
  }

}
