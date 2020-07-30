import { Component, OnInit, ViewChild } from "@angular/core";
// import 'stripe';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions,
// } from "@stripe/stripe-js";
// import { StripeService, StripeCardComponent, Elements, ElementsOptions } from 'ngx-stripe';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from "ngx-stripe";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { ServerHttpService } from "src/app/Services/server-http.service";
import {
  HttpClientModule,
  HttpHeaders,
  HttpClient,
} from "@angular/common/http";

@Component({
  selector: "app-banktoken",
  templateUrl: "./banktoken.component.html",
  styleUrls: ["./banktoken.component.css"],
})
export class BanktokenComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: "es",
  };

  stripeTest: FormGroup;
  public token: string;
  constructor(
    private fb: FormBuilder,
    private stripeSvc: StripeService,
    private http: ServerHttpService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      country: new FormControl("us", [Validators.required]),
      currency: new FormControl("usd", [Validators.required]),
      account_holder_name: new FormControl("Jenny Rosen", [
        Validators.required,
      ]),
      account_holder_type: new FormControl("individual", [Validators.required]),
      routing_number: new FormControl("110000000", [Validators.required]),
      account_number: new FormControl("000123456789", [Validators.required]),
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

  async buy() {
    const bankAccount = {
      "bank_account[country]": this.stripeTest.controls.country.value,
      "bank_account[currency]": this.stripeTest.controls.currency.value,
      "bank_account[account_holder_name]": this.stripeTest.controls
        .account_holder_name.value,
      "bank_account[account_holder_type]": this.stripeTest.controls
        .account_holder_type.value,
      "bank_account[routing_number]": this.stripeTest.controls.routing_number
        .value,
      "bank_account[account_number]": this.stripeTest.controls.account_number
        .value,
    };
    console.log(Object.values(bankAccount));
    console.log(bankAccount);
    this.httpClient
      .post<any>(
        "https://api.stripe.com/v1/tokens",
        Object.keys(bankAccount)
          .map((key) => key + "=" + bankAccount[key])
          .join("&"),
        {
          headers: new HttpHeaders({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer pk_test_52DU0HNaT3yQjlK5Mg5H6SER00DJsQHl0U",
          }),
        }
      )
      .subscribe((result) => {
        console.log(result);
        this.token = result.id;
      });
    // console.log(this.bank_account);
  }
}
