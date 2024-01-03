import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'view-tables',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.scss']
})
export class ViewCarsComponent implements OnInit {

  clients: Client[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private changes: ChangeDetectorRef) { 
  }

  async ngOnInit(): Promise<void> {
    this.clients = []

    await this.getAllCars();
  }
  async getAllCars(){
    var result = await this.clientService.getAllCars()//.then(x => this.clients = x);
    this.clients = result
    this.changes.detectChanges();
  }

  navigateToCreateCar(){
    this.router.navigate(['create-client']);
  }

  onCardDelete(selectedCar: Client){
    this.clients = this.clients.filter(client => client.id !== selectedCar.id)
  }
}
