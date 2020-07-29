import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerHttpService } from "src/app/Services/server-http.service";
import * as _ from 'lodash';
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public global: [];
  public countries: [];
  constructor(private http: ServerHttpService) {}
  
  ngOnInit() {
    // this.http.getDataCovid().subscribe((data) => {
    //   console.log(data);
    // })
    this.http.getDataCovidCountry().subscribe((data) => {
      // delete data.Countries.Premium;
      // delete data.Countries;
      data.Countries.forEach(function (v) {
        delete v.Premium;
        delete v.CountryCode;
        delete v.Slug;
      });
      console.log(data);
      this.global = data.Global;
      this.countries = data.Countries;
      console.log(this.countries);
    });
  }

  public  orderBy(key, dir){
    console.log(key);

    // this.countries.forEach(function (v){
      // v = _.orderBy(v, key, dir);
    // })
    this.countries = _.orderBy(this.countries, key, dir)
  }

}
