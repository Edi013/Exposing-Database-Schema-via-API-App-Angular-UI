import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service.js';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  @Input() selectedClient: Client = { id: 0, firstName: '', lastName: ''};
  @Input() isEditMode = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.isEditMode) {
      this.clientService.updateClient(this.selectedClient).subscribe();
    } else {
      this.clientService.createClient(this.selectedClient).subscribe();
    }

    // Clear the form after submission
    this.selectedClient = { id: 0, firstName: '', lastName: '' };
    this.isEditMode = false;
  }
}
