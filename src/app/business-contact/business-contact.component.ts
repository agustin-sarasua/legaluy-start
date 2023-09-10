import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { concatMap, tap, map } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

import {BackendService} from '../backend.service'
import { Business } from '../models/model';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-business-contact',
  templateUrl: './business-contact.component.html',
  styleUrls: ['./business-contact.component.css']
})
export class BusinessContactComponent {

  form: FormGroup;
  metadata = {};

  @Input() business: Business | undefined;

  constructor(public backend: BackendService, public globalService: GlobalService){
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
    });

    this.setupForm();
  }

  private setupForm(): void {
    this.form.patchValue({
      name: this.business?.business_owners?.at(0)?.name,
      email: this.business?.business_owners?.at(0)?.email,
      phoneNumber: this.business?.business_owners?.at(0)?.phone_number
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['business']) {
      this.setupForm()
    }
  }

  saveForm(): void {
    if (this.form.valid) {

      const { name, email, phoneNumber } = this.form.value;

      if (this.business) {
        this.globalService.showLoading();
        
        const newBusiness: Business = {
          business_owners: [
            {
              name: name, 
              phone_number: phoneNumber, 
              email: email
            }
          ]
        };

        this.backend.updateBusiness(newBusiness).subscribe({
          next: (data) => {
            console.log(data);
            this.business = data
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
  }
}
