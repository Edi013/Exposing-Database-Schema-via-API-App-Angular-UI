import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  client: Client = {
    id: 0,
    brand: "",
    model: "",
    type: "",
    price: 0,
  }

  createForm!: FormGroup;

  constructor(
    private clientService: ClientService, 
    private formBuilder: FormBuilder,
    private router: Router) {
   }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type:  ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  createClient(){
    this.clientService.createClient(this.client);

    this.router.navigate(['view-clients']);
  }

  navigateToViewClients(){
    this.router.navigate(['view-clients']);
  }

  getBrandErrorMessage() {
    let brandControl = this.createForm.controls['brand'];
    return brandControl.value == "" ?
       'Brand required.'
       : '';
  }

  getModelErrorMessage() {
    let modelControl = this.createForm.controls['model'];
    return modelControl.value == "" ?
    'Model required.'
    : '';
  }

  getTypeErrorMessage() {
    let typeControl = this.createForm.controls['type'];
    return typeControl.value == "" ?
    'Type required.'
    : '';
  }

  getPriceErrorMessage() {
    let priceControl = this.createForm.controls['price'];
    return priceControl.value == "" ?
    'Price required.'
    : '';
  }
}
