import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'edit-client-details',
  templateUrl: './edit-client-details.component.html',
  styleUrls: ['./edit-client-details.component.scss']
})
export class EditClientDetailsComponent implements OnInit {
  client: Client = {
    id: 0,
    brand: "",
    model: "",
    type: "",
    price: 0,
  }

  editForm!: FormGroup;

  constructor(
    private clientService: ClientService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
   }

  ngOnInit(): void {
    this.client.brand = this.route.snapshot.queryParams['brand'] ?? "";
    this.client.id = parseInt(this.route.snapshot.queryParams['id'] ?? "", 10);
    this.client.model = this.route.snapshot.queryParams['model'] ?? "";
    this.client.type = this.route.snapshot.queryParams['type'] ?? "";
    this.client.price = parseFloat(this.route.snapshot.queryParamMap.get('price') ?? "");

    this.editForm = this.formBuilder.group({
      brand: [this.client.brand, Validators.required],
      model: [this.client.model, Validators.required],
      type:  [this.client.type, Validators.required],
      price: [this.client.price, Validators.required],
    });
  }

  updateClient(){
    this.clientService.updateClient(this.client);

    this.router.navigate(['view-clients']);
  }

  navigateToViewClients(){
    this.router.navigate(['view-clients']);
  }

  getBrandErrorMessage() {
    let brandControl = this.editForm.controls['brand'];
    return brandControl.value == "" ?
       'Brand required.'
       : '';
  }

  getModelErrorMessage() {
    let modelControl = this.editForm.controls['model'];
    return modelControl.value == "" ?
    'Model required.'
    : '';
  }

  getTypeErrorMessage() {
    let typeControl = this.editForm.controls['type'];
    return typeControl.value == "" ?
    'Type required.'
    : '';
  }

  getPriceErrorMessage() {
    let priceControl = this.editForm.controls['price'];
    return priceControl.value == "" ?
    'Price required.'
    : '';
  }
}
