import { Component, OnInit } from "@angular/core";
import { Label as ng2Chart } from "ng2-charts";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { ServerHttpService } from "src/app/Services/server-http.service";

@Component({
  selector: "app-chartjs",
  templateUrl: "./chartjs.component.html",
  styleUrls: ["./chartjs.component.css"],
})
export class ChartjsComponent implements OnInit {
  public global: [];
  public countries: [];
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  constructor(private http: ServerHttpService) {}

  ngOnInit(): void {
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

  chartOptions = {
    responsive: true,
  };

  // public data: [];
  // public label :string;
  // for (const a of this.countries){
  // public chartData = [];
  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  // }
  chartLabels = ["January", "February", "Mars", "April"];
}
