import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
//import { ViewCarsComponent } from './components/view-cars/view-tables.component';
//import { EditClientDetailsComponent } from './components/edit-car-details/edit-client-details.component';
//import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientService } from './services/client.service';
import { ClientListComponent } from './components/client-list/client-list.component';

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
        component: ClientListComponent,
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
        component: ClientListComponent,
      },
      // {
      //   path: 'edit-car',
      //   component: EditClientDetailsComponent,
      // },
      // {
      //   path: 'view-cars',
      //   component: ViewCarsComponent,
      // },
      // {
      //   path: 'create-car',
      //   component: CreateClientComponent,
      // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}