import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client = { };
  isEditMode = false;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.clients$
      .subscribe((clients) => {
        this.clients = clients;
      });
  
    this.clientService.getAllClients();
  }

  editClient(client: Client): void {
    this.isEditMode = true;
    this.selectedClient = { ...client };
  }

  deleteClient(client: Client): void {
    this.isEditMode = false;
    this.clientService.deleteClient(client);
  }

  getClientProperties(client: Client): { label: string; value: string }[] {
    const properties: { label: string; value: string }[] = [];

    return Object.entries(client).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: String(value),
    }));
  }

  navigateHome(){
    this.router.navigate(['']);
  }
}
