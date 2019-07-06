import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public products = [
    {
      name: 'Workflow',
      unitPrice: 199.99
    },
    {
      name: 'Document Generation',
      unitPrice: 9.99
    },
    {
      name: 'Form',
      unitPrice: 99.99
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
