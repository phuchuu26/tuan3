import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = [
      { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
      { path: '/quanlyusers', title: 'Quản lý users',  icon:'ni-circle-08 text-blue', class: '' },
      { path: '/icons', title: 'Thanh toán điện tử',  icon:'ni-planet text-blue', class: '' },
      { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
      { path: '/user-profile', title: 'Thống kê Coronavirus',  icon:'ni-single-02 text-yellow', class: '' },
      { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
      { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
      { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
      { path: '/chartjs', title: 'chartjs',  icon:'ni-circle-08 text-pink', class: '' },
    ];
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
