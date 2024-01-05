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
import { ProviderListComponent } from './components/provider/provider-list/provider-list.component';
import { ProviderFormComponent } from './components/provider/provider-form/provider-form.component';
import { StorageLocationListComponent } from './components/storageLocation/storage-location-list/storage-location-list.component';
import { StorageLocationFormComponent } from './components/storageLocation/storage-location-form/storage-location-form.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemFormComponent } from './components/item/item-form/item-form.component';
import { GetEachOrderStatisticsComponent } from './components/order/get-each-order-statistics/get-each-order-statistics.component';
import { GetOverallOrderStatisticsComponent } from './components/order/get-overall-order-statistics/get-overall-order-statistics.component';
import { GetNeverOrderedItemsComponent } from './components/order/get-never-ordered-items/get-never-ordered-items.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ClientListComponent,
    ClientFormComponent,
    OrderListComponent,
    OrderFormComponent,
    ProviderListComponent,
    ProviderFormComponent,
    StorageLocationListComponent,
    StorageLocationFormComponent,
    ItemListComponent,
    ItemFormComponent,
    GetEachOrderStatisticsComponent,
    GetOverallOrderStatisticsComponent,
    GetNeverOrderedItemsComponent,
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
