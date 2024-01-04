import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ClientListComponent,
    ClientFormComponent,
    OrderListComponent,
    OrderFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [RouterModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DatePipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
