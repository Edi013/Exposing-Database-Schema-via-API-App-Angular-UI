import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client = { id: 0, firstName: '', lastName: '' };
  isEditMode = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.clients$
      .subscribe((clients) => {
        this.clients = clients;
      });
  
    this.clientService.getAllClients();
  }

  editClient(client: Client): void {
    this.isEditMode = true;
    this.selectedClient = { ...client }; // Create a copy to avoid two-way binding issues
  }

  deleteClient(client: Client): void {
    this.isEditMode = false;
    this.clientService.deleteClient(client).subscribe();
  }
}
