import { Component, OnInit } from "@angular/core";
import { ServerHttpService } from "src/app/Services/server-http.service";
import { Router } from "@angular/router";
import { Users } from "./../../models/Users";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { CommonService } from "src/app/Services/common.service";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import * as customerActions from "./../../store/actions/user.action";
import * as fromCustomer from "./../../store/reducers/user.reducer";

@Component({
  selector: "app-quanlyuser",
  templateUrl: "./quanlyuser.component.html",
  styleUrls: ["./quanlyuser.component.css"],
})
export class QuanlyuserComponent implements OnInit {
  public users: Users[] = [];
  public tt: boolean;
  public totalUser: number;
  public p: number = 1;
  public customers$: Observable<Users[]>;
  public error$: Observable<String>;
  constructor(
    private serverHttp: ServerHttpService,
    private router: Router,
    private thongbao: SnotifyService,
    private common: CommonService,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(new customerActions.LoadCustomers());
    // this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    // this.error$ = this.store.pipe(select(fromCustomer.getError));
    // this.store.dispatch(new customerActions.LoadCustomers());
    this.loadData();
    // this.test();
  }
  private loadData() {
    // this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    // this.error$ = this.store.pipe(select(fromCustomer.getError));
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomer.getError));
    this.store.dispatch(new customerActions.LoadCustomers());

    // this.serverHttp.getusers().subscribe((e) => {
    //   // console.log('getusers', e);
    //   this.users = e;
    //   this.tt = e.status;
    //   // this.common.setTotalStudents(data.length);
    //   this.totalUser = e.length;
    //   this.common.layTongUsers(this.totalUser);
    //   // console.log(this.totalUser);
    // });
  }

  public themuser() {
    console.log("them");
    this.router.navigate(["add-user", 0]);
  }

  public xoaUser(id: number) {
    // console.log("xoa " + id);
    // this.serverHttp.deleteUser(id).subscribe((e) => {
    //   console.log("xoa user so " + e.id);
    // });
    this.store.dispatch(new customerActions.DeleteCustomer(id));
    // this.loadData();
  }

  public editUser(idUser) {
    this.router.navigate(["add-user", idUser]);
  }


  public thanhcong() {
    this.thongbao.info(
      "Đã thay đổi trạng thái",
      "Xác nhận",
      {
        position: SnotifyPosition.rightTop,
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
      }
      // config: {
      //   position: SnotifyPosition.rightTop,
      // },
    );
  }
  public huy() {
    this.thongbao.error("Đã hủy tiến trình", "Xác nhận", {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    });
  }
  public cho() {
    this.thongbao.warning("Chờ 1 thời gian !", "Xác nhận", {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop,
    });
  }

  public xacnhan(id) {
    this.thongbao.confirm(
      "Bạn có chắc thay đổi trạng thái chứ!!",
      "Thông báo",
      {
        position: SnotifyPosition.rightTop,
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: "Yes",
            action: (toast) => {
              this.change(id);
              console.log("Clicked: Yes");
              this.thongbao.remove(toast.id);
            },
            bold: false,
          },
          {
            text: "No",
            action: (toast) => {
              console.log("Clicked: No");
              this.thongbao.remove(toast.id);
              this.huy();
            },
          },
          {
            text: "Later",
            action: (toast) => {
              console.log(toast);
              console.log("Clicked: Later " + toast);
              this.thongbao.remove(toast.id);
              this.cho();
            },
          },
          {
            text: "Close",
            action: (toast) => {
              console.log("Clicked: No");
              this.thongbao.remove(toast.id);
            },
            bold: true,
          },
        ],
      }
    );
  }
  public nhap(id) {
    this.xacnhan(id);
  }
  public change(id) {
    this.serverHttp.getUser(id).subscribe((e) => {
      console.log("getuser : ", e);
      // this.users = e;
      // this.common.setTotalStudents(data.length);
      this.tt = e.status;
      console.log("trang thai :" + this.tt);
      this.tt = !this.tt;
      e.status = this.tt;
      console.log("TT sau khi doi :" + this.tt);
      console.log("tang thai 2:" + e.status);
      this.serverHttp.updateUser( e).subscribe((e) => {
        console.log("da luu" + e.status);
        this.loadData();
        this.thanhcong();
        // this.xacnhan();
      });
    });
  }
}
