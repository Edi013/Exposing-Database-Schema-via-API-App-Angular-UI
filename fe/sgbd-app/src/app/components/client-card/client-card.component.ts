import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientClientdComponent implements OnInit{
  @Input() client: Client 
  @Output() onDelete = new EventEmitter<Client>();
  imageUrl: string

  constructor(
    private clientService : ClientService,
    private router : Router)
  {
  }
  
  ngOnInit(){
    this.imageUrl = 'assets/images/' + this.client.brand + '.jpg';
  }

  deleteClient(){
    this.clientService.deleteClient(this.client);
    this.onDelete.emit(this.client);
  }

  navigateToEdit(){
    this.router.navigate(
      ["edit-client"],
     {
      queryParams: {
        id: this.client.id,
        brand: this.client.brand,
        model: this.client.model,
        type: this.client.type,
        price: this.client.price
      }
     }
    );
  }
}
