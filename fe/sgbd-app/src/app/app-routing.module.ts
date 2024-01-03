import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCarsComponent } from './components/view-cars/view-tables.component';
import { EditClientDetailsComponent } from './components/edit-car-details/edit-client-details.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientService } from './services/client.service';

const routes: Routes = [
      { 
        path: '', 
        component: HomePageComponent 
      },
      {
        path: 'edit-car',
        component: EditClientDetailsComponent,
      },
      {
        path: 'view-cars',
        component: ViewCarsComponent,
      },
      {
        path: 'create-car',
        component: CreateClientComponent,
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}