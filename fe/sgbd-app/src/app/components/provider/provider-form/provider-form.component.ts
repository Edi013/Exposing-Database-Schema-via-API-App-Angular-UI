import { Component, Input, OnInit } from '@angular/core';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
})
export class ProviderFormComponent implements OnInit {
  @Input() selectedProvider: Provider = {};
  @Input() isEditMode = false;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {}

  async submitForm(): Promise<void> {
    if (this.isEditMode) {
      await this.providerService.updateProvider(this.selectedProvider);
    } else {
      await this.providerService.createProvider(this.selectedProvider);
    }

    this.selectedProvider = {};
    this.isEditMode = false;
    await this.providerService.getAllProviders();
  }
}
