import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { concatMap, tap, map } from 'rxjs/operators';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

import {BackendService} from '../backend.service'
import { Property } from '../models/model';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-calendar-selection',
  templateUrl: './calendar-selection.component.html',
  styleUrls: ['./calendar-selection.component.css']
})
export class CalendarSelectionComponent implements OnChanges{

  @Input() selectedDays: CalendarMonthViewDay[] = [];
  @Input() property: Property = {};

  form: FormGroup;
  metadata = {};

  constructor(public backend: BackendService, public globalService: GlobalService) {
    this.form = new FormGroup({
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      selectedDayStatus: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property']) {
      this.setupForm()
    }
  }

  private setupForm(): void {
    this.form.patchValue({
      price: this.property?.price_config?.base_price
    });
    
  }
  
  saveForm(): void {
    if (this.form.valid) {

      const { price, selectedDayStatus } = this.form.value;

      this.globalService.showLoading();
      
      const newProperty: Property = {
        
      };

      // this.backend.updateBusiness(newBusiness).subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     this.business = data
      //   },
      //   error: (error) => {
      //     console.error('Error:', error);
      //     this.globalService.hideLoading();
      //     if (error.status === 400) {
      //       alert(error.error); // Assuming the error object has a "message" property
      //     }
      //   },
      //   complete: () => {
      //     console.log('Completed');
      //     this.globalService.hideLoading();
      //   }
      // });
      
    }
  }
}
