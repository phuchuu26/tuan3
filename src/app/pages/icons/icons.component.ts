import { Component, OnInit, ViewChild } from '@angular/core';
// import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions
// } from '@stripe/stripe-js';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;
  public token;
  constructor(private fb: FormBuilder, private stripeSvc: StripeService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', Validators.required]
    });

    this.stripeSvc.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666ee8',
              color: '#31325f',
              lineHeight: '40px',
              fontWeight: 300,
              fontSize: '20px'
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeSvc.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        console.log('Token', result.token);
        this.token = result.token.id;
      } else if (result.error) {
        console.log('Error', result.error.message);
      }
    });
  }
}
