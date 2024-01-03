import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
//import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCarsComponent } from './components/view-cars/view-tables.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';

@NgModule({
  declarations: [
    AppComponent,
    //HomePageComponent,
    ViewCarsComponent,
    ClientListComponent,
    ClientFormComponent,
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
