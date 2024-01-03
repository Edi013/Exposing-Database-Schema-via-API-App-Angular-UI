import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service.js';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients$ = this.clientService.clients$;
  selectedClient: Client = { id: 0, firstName: '', lastName: '' };
  isEditMode = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe();
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
