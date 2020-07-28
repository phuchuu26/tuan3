import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/quanlyusers', title: 'Quản lý users',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/icons', title: 'Thanh toán điện tử',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Thống kê Coronavirus',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public total : number;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router ,
    private common: CommonService,
    private server: ServerHttpService
    ) {
      // this.total = this.common.totalService;
      this.common.totalService$.subscribe((e:number) =>{
        this.total = e;
        console.log(e);
      })
      if(this.total === 0){
        this.server.getusers().subscribe((e)=>{
          this.total = e.length;
        })
      }
   }

  ngOnInit() {

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
