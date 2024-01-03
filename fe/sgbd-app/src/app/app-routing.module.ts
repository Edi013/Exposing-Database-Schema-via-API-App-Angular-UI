import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCarsComponent } from './components/view-cars/view-cars.component';
import { EditCarDetailsComponent } from './components/edit-car-details/edit-car-details.component';
import { CreateCarComponent } from './components/create-car/create-car.component';

const routes: Routes = [
      { 
        path: '', 
        component: HomePageComponent 
      },
      {
        path: 'edit-car',
        component: EditCarDetailsComponent,
      },
      {
        path: 'view-cars',
        component: ViewCarsComponent,
      },
      {
        path: 'create-car',
        component: CreateCarComponent,
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}