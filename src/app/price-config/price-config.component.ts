import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PriceConfig, Property } from '../models/model';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-price-config',
  templateUrl: './price-config.component.html',
  styleUrls: ['./price-config.component.css']
})
export class PriceConfigComponent implements OnChanges{
  currencies = ['USD', 'UY'];

  @Input() property: Property | undefined;
  
  form: FormGroup;
  metadata = {};

  constructor(public backend: BackendService, public globalService: GlobalService) {

    this.form = new FormGroup({
      currency: new FormControl('', Validators.required),
      basePrice: new FormControl('', Validators.required),
      weekendPrice: new FormControl(''),
      // extraPercentage: new FormControl('', Validators.required),
    });

  }

  private setupForm(): void {
    this.form.patchValue({
      currency: this.property?.price_config?.currency,
      basePrice: this.property?.price_config?.base_price,
      weekendPrice: this.property?.price_config?.weekend_price
    });
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property']) {
      this.setupForm()
    }
  }

  saveForm(): void {
    if (this.form.valid) {

      const { currency, basePrice, weekendPrice } = this.form.value;

      const newProperty: Property = {
        id: this.property?.id,
        price_config: {
          base_price: basePrice,
          currency: currency,
          weekend_price: weekendPrice
        }
      };

      const business_id = this.globalService.getBusiness().id
      if (business_id){
        this.globalService.showLoading();
        this.backend.updateProperty(business_id, newProperty).subscribe({
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
  // }
  
}
