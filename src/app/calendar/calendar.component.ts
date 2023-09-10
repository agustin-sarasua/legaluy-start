import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { GlobalService } from '../global.service';
import { PriceConfig, Property } from '../models/model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  
  @ViewChild('firstSidenav', { static: true }) firstDrawer!: MatSidenav;
  @ViewChild('secondSidenav', { static: true }) secondDrawer!: MatSidenav;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay = {} as CalendarMonthViewDay;
  selectedDayViewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDays: CalendarMonthViewDay[] = [];

  selectedProperty?: Property;
  properties?: Property[] = [];
  
  ngOnInit(): void {
    this.toggleDrawers()
  }
  
  onPropertyChange() {
    console.log(this.selectedProperty); 

  }

  constructor(public backend: BackendService, public globalService: GlobalService) { 
    // if (this.globalService.getBusiness().properties){
    this.globalService.showLoading();
    this.backend.getBusinessInfo().subscribe({
      next: (data) => {
        console.log(data);
        this.properties = data.properties
        if (this.properties !== undefined && this.properties.length > 0){
          this.selectedProperty = this.properties?.at(0)
        }
        this.globalService.hideLoading();
      },
      error: (error) => {
        console.error('Error:', error);
        this.globalService.hideLoading();
      },
      complete: () => {
        console.log('Completed');
        this.globalService.hideLoading();
      }
    });
  
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['business']) {
  //     this.setupForm()
  //   }
  // }

  // saveForm(): void {
  //   if (this.form.valid) {

  //     const formData = this.form.value;
  //     if (this.business) {
  //       this.globalService.showLoading();
  //       this.backend.updateBusiness(formData).subscribe({
  //         next: (data) => {
  //           console.log(data);
  //           this.business = data
  //         },
  //         error: (error) => {
  //           console.error('Error:', error);
  //           this.globalService.hideLoading();
  //           if (error.status === 400) {
  //             alert(error.error); // Assuming the error object has a "message" property
  //           }
  //         },
  //         complete: () => {
  //           console.log('Completed');
  //           this.globalService.hideLoading();
  //         }
  //       });
  //     }
  //   }
  // }

  dayClicked(selectedDay: CalendarMonthViewDay): void {
    const selectedDateTime = selectedDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      (day) => day.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
      delete selectedDay.cssClass;
      this.selectedDays.splice(dateIndex, 1);
    } else {
      this.selectedDays.push(selectedDay);
      selectedDay.cssClass = 'cal-day-selected';
    }
    this.toggleDrawers()
  }

  getSelectedDays(start: Date, end: Date): CalendarMonthViewDay[] {
    const days: CalendarMonthViewDay[] = [];
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const day: CalendarMonthViewDay = {
        date: new Date(date),
        inMonth: true,
        events: [],
        badgeTotal: 0,
        day: date.getDate(),
        isFuture: date > new Date(),
        isPast: date < new Date(),
        isToday: date.toDateString() === new Date().toDateString(),
        isWeekend: this.isWeekend(date),
        cssClass: this.selectedDays.some(
          (selectedDay) => this.compareDates(selectedDay.date, date)
        )
          ? 'cal-day-selected'
          : '',
      };
      days.push(day);
    }
    return days;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.cssClass = this.selectedDays.some((selectedDay) =>
        this.compareDates(selectedDay.date, day.date)
      )
        ? 'cal-day-selected'
        : '';
    });
  }

  compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  toggleDrawers(): void {
    if (this.selectedDays.length > 0) {
      this.firstDrawer.close();
      this.secondDrawer.open();
    } else {
      this.firstDrawer.open();
      this.secondDrawer.close();
    }
  }
}