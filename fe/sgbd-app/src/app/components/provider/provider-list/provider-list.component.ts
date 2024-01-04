import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  selectedProvider: Provider = {};
  isEditMode = false;

  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit(): void {
    this.providerService.providers$.subscribe((providers) => {
      this.providers = providers;
    });

    this.providerService.getAllProviders();
  }

  editProvider(provider: Provider): void {
    this.isEditMode = true;
    this.selectedProvider = { ...provider };
  }

  async deleteProvider(provider: Provider): Promise<void> {
    this.isEditMode = false;
    this.providerService.deleteProvider(provider);

    await this.providerService.getAllProviders();
  }

  getProviderProperties(provider: Provider): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(provider)) {
      const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
      properties.push({ label: formattedLabel, value: String(value) });
    }
    return properties;
  }

  navigateHome() {
    this.router.navigate(['']);
  }
  
  toggleEditMode(){
    this.isEditMode = ! this.isEditMode;
  }
}
