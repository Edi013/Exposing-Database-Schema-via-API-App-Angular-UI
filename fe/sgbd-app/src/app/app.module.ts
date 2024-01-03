import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCarsComponent } from './components/view-cars/view-cars.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { EditCarDetailsComponent } from './components/edit-car-details/edit-car-details.component';
import { CreateCarComponent } from './components/create-car/create-car.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarCardComponent,
    HomePageComponent,
    ViewCarsComponent,
    EditCarDetailsComponent,
    CreateCarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DatePipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
