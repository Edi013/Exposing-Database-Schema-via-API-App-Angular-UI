import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { ProviderListComponent } from './components/provider/provider-list/provider-list.component';

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
        component: ClientListComponent,
      },
      {
        path: 'view-storageLocation',
        component: ClientListComponent,
      },
      {
        path: 'view-provider',
        component: ProviderListComponent,
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}