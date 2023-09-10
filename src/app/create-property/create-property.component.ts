import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Business, Property } from '../models/model';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {
  form: FormGroup;
  metadata = {};
  property: Property | undefined
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '15', '30', '45'];
  
  constructor(public auth: AuthService, private http: HttpClient, public backend: BackendService, public globalService: GlobalService) { 
    // this.globalService.showLoading();
    this.form = new FormGroup({
      booking_link: new FormControl(''),
      airbnb_link: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      max_guests: new FormControl('', Validators.required),
      checkinHourTime: new FormControl('', Validators.required),
      checkinMinuteTime: new FormControl('', Validators.required),
      checkoutHourTime: new FormControl('', Validators.required),
      checkoutMinuteTime: new FormControl('', Validators.required),
      pick_up_keys_instructions: new FormControl('', Validators.required),
    });
  }

  saveForm(): void {
    if (this.form.valid) {
      this.globalService.showLoading();
      const { 
        booking_link,
        airbnb_link,
        name,
        description,
        max_guests,
        checkinHourTime,
        checkinMinuteTime,
        checkoutHourTime,
        checkoutMinuteTime,
        pick_up_keys_instructions,
       } = this.form.value;

      // if (this.property) {
      this.globalService.showLoading();

      const newProperty: Property = {
        name: name,
        description: description,
        pick_up_keys_instructions: pick_up_keys_instructions,
        max_guests: max_guests,
        airbnb_link: airbnb_link,
        booking_link: booking_link,
        checkin_time: checkinHourTime +":"+ checkinMinuteTime,
        checkout_time: checkoutHourTime +":"+ checkoutMinuteTime
      };
      const business_id = this.globalService.getBusiness().id
      if (business_id){
        this.backend.createProperty(business_id, newProperty).subscribe({
          next: (data) => {
            console.log(data);
            this.property = data
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
  }
}
