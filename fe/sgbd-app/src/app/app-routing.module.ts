import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}