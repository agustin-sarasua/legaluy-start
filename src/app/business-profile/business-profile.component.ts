import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { concatMap, tap, map } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

import {BackendService} from '../backend.service'
import { GlobalService } from '../global.service';
import { Business } from '../models/model';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit{
  form: FormGroup;
  metadata = {};
  business: Business | undefined;

  constructor(public auth: AuthService, private http: HttpClient, public backend: BackendService, public globalService: GlobalService) { 
    this.globalService.showLoading();
  
    this.backend.getBusinessInfo().subscribe({
      next: (data) => {
        console.log(data);
        this.business = data
        this.setupForm()
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Completed');
        this.globalService.hideLoading();
      }
    });
    
    this.form = new FormGroup({
      bnbot_id: new FormControl('', [Validators.required, this.bnbotValidator]),
      business_name: new FormControl('', Validators.required),
    });
  }

  saveForm(): void {
    if (this.form.valid) {

      const formData = this.form.value;
      if (this.business) {
        this.globalService.showLoading();
        this.backend.updateBusiness(formData).subscribe({
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

  private setupForm(): void {
    this.form.patchValue({
      bnbot_id: this.business?.bnbot_id,
      business_name: this.business?.business_name
    });
  }

  ngOnInit(): void {
    // console.log(this.globalService.getBusiness());
    // this.business = this.globalService.getBusiness();
  }

  bnbotValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const valid = /^[@a-zA-Z0-9.-]+$/.test(control.value);
    return valid ? null : { 'bnbotIdInvalid': true };
  }
}
