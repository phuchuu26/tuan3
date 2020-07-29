import { Component, OnInit, ViewChild } from "@angular/core";
// import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from "ngx-stripe";
// import { NgxStripeModule as stripe } from 'ngx-stripe';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions
// } from '@stripe/stripe-js';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: "es",
  };

  stripeTest: FormGroup;
  public token;
  constructor(private fb: FormBuilder, private stripeSvc: StripeService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ["", Validators.required],
    });

    this.stripeSvc.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create("card", {
          style: {
            base: {
              iconColor: "#666ee8",
              color: "#31325f",
              lineHeight: "40px",
              fontWeight: 300,
              fontSize: "20px",
            },
          },
        });
        this.card.mount("#card-element");
      }
    });
  }

  // public  stripe = require("stripe")("pk_test_52DU0HNaT3yQjlK5Mg5H6SER00DJsQHl0U");
  buy() {
    const name = this.stripeTest.get("name").value;
    this.stripeSvc.createToken(this.card, { name }).subscribe((result) => {
      if (result.token) {
        console.log("Token", result.token);
        this.token = result.token.id;
      } else if (result.error) {
        console.log("Error", result.error.message);
      }
    });


    // get bank token
    const params = {
      // mandatory
      accountNumber: '000123456789',
      countryCode: 'us',
      currency: 'usd',
      // optional
      routingNumber: '110000000', // 9 digits
      accountHolderName: 'Test holder name',
      accountHolderType: 'company', // "company" or "individual"
    }

    const token = await stripe.createTokenWithBankAccount(params)

    // Client specific code
    // api.sendTokenToBackend(token)
    // this.stripe.tokens.create(
    //   {
    //     bank_account: {
    //       country: "US",
    //       currency: "usd",
    //       account_holder_name: "Jenny Rosen",
    //       account_holder_type: "individual",
    //       routing_number: "110000000",
    //       account_number: "000123456789",
    //     },
    //   },
    //   function (err, token) {
    //     if(token){
    //       console.log(token);
    //     }
    //     // asynchronously called
    //   }
    // );
  }
}
