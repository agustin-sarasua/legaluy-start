import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Business } from '../models/model';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnChanges {
  // myControl = new FormControl('');
  options: string[] = ['Mercedes', 'Montevideo', 'Punta del Este'];
  filteredOptions: Observable<string[]> | undefined;
  form: FormGroup;

  @Input() business: Business | undefined;
  
  constructor(public backend: BackendService, public globalService: GlobalService){
    this.form = new FormGroup({
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      how_to_arrive_instructions: new FormControl('')
    });

    this.setupForm();

    const cityControl = this.form.get('city');
    if (cityControl) {
      this.filteredOptions = cityControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  }

  private setupForm(): void {
    this.form.patchValue({
      city: this.business?.location?.city,
      address: this.business?.location?.address,
      how_to_arrive_instructions: this.business?.how_to_arrive_instructions
    });
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['business']) {
      this.setupForm()
    }
  }

  saveForm(): void {
    if (this.form.valid) {

      const { address, city, how_to_arrive_instructions } = this.form.value;

      if (this.business) {
        this.globalService.showLoading();
        
        const newBusiness: Business = {
          location: {
            address,
            city,
            country: "Uruguay"
          },
          how_to_arrive_instructions,
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
