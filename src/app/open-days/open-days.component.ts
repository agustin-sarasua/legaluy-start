import { Component, Input } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Property } from '../models/model';
import { GlobalService } from '../global.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-open-days',
  templateUrl: './open-days.component.html',
  styleUrls: ['./open-days.component.css']
})
export class OpenDaysComponent {
  form: FormGroup
  @Input() property: Property | undefined;
  
  constructor(public backend: BackendService, public globalService: GlobalService){
    this.form = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
      selectedDayStatus: new FormControl('', Validators.required)
    });
  }

  private getDatesInRange(startDate: Date, endDate: Date): Date[] {
    
    const dates: Date[] = [];
    
    if (startDate && endDate) {
      const currentDate: Date = new Date(startDate);
      
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dates;
  }

  saveForm(): void {
    if (this.form.valid) {

      const { start, end, selectedDayStatus } = this.form.value;

      const business_id = this.globalService.getBusiness().id
      const property_id = this.property?.id
      if (business_id && property_id){
        this.globalService.showLoading();
        this.backend.updateOpenDays(business_id, property_id, selectedDayStatus, this.getDatesInRange(start, end)).subscribe({
          next: (data) => {
            console.log(data);
            // this.priceConfig = data.price_config
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
