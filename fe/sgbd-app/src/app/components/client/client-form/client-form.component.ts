import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() selectedClient: Client = { };
  @Input() isEditMode = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  async submitForm(): Promise<void> {
    if (this.isEditMode) {
      await this.clientService.updateClient(this.selectedClient);
    } else {
      await this.clientService.createClient(this.selectedClient);
    }

    this.selectedClient = {  };
    this.isEditMode = false;
  }
}
