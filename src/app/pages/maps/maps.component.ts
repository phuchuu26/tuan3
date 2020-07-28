import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from "@angular/core";
// import { AgmCoreModule } from '@agm/core';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { AgmCoreModule } from "@agm/core";
// import { } from '@types/googlemaps';
// declare const google: any;
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit {
  constructor() {}

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  // options = {
  //   types: [],
  //   componentRestrictions: { country: "VN" },
  // };
  public iput: string;

  public title_add;
  public latitude;
  public longitude;
  public zoom;
  public quocgia: string;

  ngOnInit() {
    this.setCurrentLocation();
  }
  public handleAddressChange(address: Address) {
    // Do some stuff
    console.log(address);
    console.log("Latitud : " + address.geometry.location.lat());
    console.log("Longitud : " + address.geometry.location.lng());

    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.quocgia =
      address.address_components[
        address.address_components.length - 1
      ].long_name;
  }
  public setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  public change(e) {
    console.log(e);
    // onActivate(event) {
    window.scroll(0, 147);
    // Text.
    this.iput = "";
    // document.body.scrollTop = 147;
    // or document.querySelector('body').scrollTo(0,0)
    // ...
    // }
  }
}
