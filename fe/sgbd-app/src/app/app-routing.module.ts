import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { ProviderListComponent } from './components/provider/provider-list/provider-list.component';
import { StorageLocationListComponent } from './components/storageLocation/storage-location-list/storage-location-list.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { GetEachOrderStatisticsComponent } from './components/order/get-each-order-statistics/get-each-order-statistics.component';
import { GetNeverOrderedItemsComponent } from './components/order/get-never-ordered-items/get-never-ordered-items.component';
import { GetOverallOrderStatisticsComponent } from './components/order/get-overall-order-statistics/get-overall-order-statistics.component';

const routes: Routes = [
      { 
        path: '', 
        component: HomePageComponent 
      },
      {
        path: 'view-client',
        component: ClientListComponent,
      },
      {
        path: 'view-order',
        component: OrderListComponent,
      },
      {
        path: 'view-item',
        component: ItemListComponent,
      },
      {
        path: 'view-storage-location',
        component: StorageLocationListComponent,
      },
      {
        path: 'view-provider',
        component: ProviderListComponent,
      },
      {
        path: 'view-order-statistics',
        component: GetEachOrderStatisticsComponent,
      },
      {
        path: 'view-overall-order-statistics',
        component: GetOverallOrderStatisticsComponent,
      },
      {
        path: 'view-never-ordered-items',
        component: GetNeverOrderedItemsComponent,
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}