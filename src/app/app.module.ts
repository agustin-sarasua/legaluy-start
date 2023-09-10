import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { MatCardModule } from '@angular/material/card';
import { BusinessProfileComponent } from './business-profile/business-profile.component';

import { ReactiveFormsModule } from '@angular/forms'; 
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddressComponent } from './address/address.component';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import {FormsModule} from '@angular/forms';
import { BusinessContactComponent } from './business-contact/business-contact.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {MatDividerModule} from '@angular/material/divider';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { PriceConfigComponent } from './price-config/price-config.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CalendarSelectionComponent } from './calendar-selection/calendar-selection.component';
import {MatChipsModule} from '@angular/material/chips';
import { OverlayModule } from '@angular/cdk/overlay';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OpenDaysComponent } from './open-days/open-days.component';
import { JurisprudenciaComponent } from './jurisprudencia/jurisprudencia.component';
import { BjnSearchResultsComponent } from './bjn-search-results/bjn-search-results.component';
import { ChatSentenciaComponent } from './chat-sentencia/chat-sentencia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    BusinessProfileComponent,
    AddressComponent,
    BusinessContactComponent,
    CalendarComponent,
    PriceConfigComponent,
    CalendarSelectionComponent,
    CreatePropertyComponent,
    OpenDaysComponent,
    JurisprudenciaComponent,
    BjnSearchResultsComponent,
    ChatSentenciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    SidenavComponent,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    OverlayModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-szxtl072nd0t8rsr.us.auth0.com',
      clientId: 'OefFo3k4jpnrEvQU9O8DHTNCxtF1ZAeV',
      authorizationParams: {
        redirect_uri: window.location.origin,
        
        // Request this audience at user authentication time
        audience: 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/',
    
        // Request this scope at user authentication time
        scope: 'read:current_user',
      },
    
      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/',
    
                // The attached token should have these scopes
                scope: 'read:current_user'
              }
            }
          },
          {
            // Match any request that starts 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://dev-szxtl072nd0t8rsr.us.auth0.com/api/v2/',
    
                // The attached token should have these scopes
                scope: 'admin'
              }
            }
          }
        ]
      }
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
