import { SnotifyPosition } from "ng-snotify";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ServerHttpService } from "src/app/Services/server-http.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Users } from "src/app/models/Users";
import { SnotifyService } from "ng-snotify";
import { emailValidator } from "src/app/custom-validation/CustomValidators";
import { CommonService } from "src/app/Services/common.service";

import { Store, select } from "@ngrx/store";

import * as customerActions from "./../../store/actions/user.action";
import * as fromCustomer from "./../../store/reducers/user.reducer";
import { Observable } from "rxjs";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.css"],
})
export class AdduserComponent implements OnInit {
  public id: number = 0;
  public urlImage: string;
  public customers$: Observable<Users[]>;
  public error$: Observable<String>;
  public userForm = new FormGroup({
    fullname: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    phone: new FormControl("", [Validators.required, Validators.minLength(9)]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    address: new FormControl("", [Validators.required, Validators.minLength(5)]),
    avatar: new FormControl(""),
    status: new FormControl(""),
  });

  constructor(
    private router: Router,
    private serverHttp: ServerHttpService,
    private route: ActivatedRoute,
    private thongbao: SnotifyService,
    private common: CommonService,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    if (this.id > 0) {
      this.loadData();
      // this.tt = this=
    } else {
      this.userForm.patchValue({
        status: true,
      });
    }
  }
  get fullname() {
    return this.userForm.get("fullname");
  }
  public loadData() {
    this.serverHttp.getUser(this.id).subscribe((data) => {
      // let data;
      // dispatch(new customerActions.LoadCustomer(this.id))
      // data = this.store.dispatch(new customerActions.LoadCustomer(this.id));
      console.log("lay 1 user ", data);
      for (const controlName in this.userForm.controls) {
        if (controlName) {
          this.userForm.controls[controlName].setValue(data[controlName]);
        }
      }
      this.tt = this.userForm.controls.status.value;
    });
    console.log("tt " + this.tt);
    console.log(this.userForm);
  }

  public submit() {
    const user = {id:null,avatar:''};
    // console.log('data ' + this.userForm.controls.status.value);
    // this.userForm.controls.avatar.setValue(this.avt);
    for (const a in this.userForm.controls) {
      if (a) {
        console.log(this.userForm.controls[a].value);
        user[a] = this.userForm.controls[a].value;
      }

    }
    user.id = this.id ;
    user.avatar = this.avt;

    return user as Users;
  }
  public tt: boolean;
  public save() {
    if (this.id > 0) {
      // this.serverHttp.updateUser(this.id, this.submit()).subscribe((e) => {
      //   console.log("data " + e.id);
      // });
      this.store.dispatch(new customerActions.UpdateCustomer(this.submit()));
      // this.store.dispatch(new customerActions.LoadCustomers());
      this.router.navigate(["quanlyusers"]);
      // this.store.dispatch(new customerActions.LoadCustomers());
      // this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
      // this.error$ = this.store.pipe(select(fromCustomer.getError));
      this.suathanhcong();
    } else {
      this.store.dispatch(new customerActions.CreateCustomer(this.submit()));
      // this.serverHttp.adduser(this.submit()).subscribe((data) => {
        // this.common.increamentStudent();
        this.userForm.reset();
      // });
      this.them();
      this.common.tangUsers();
    }
  }
  public e ;

  public changeStatus() {
    // this.userForm.patchValue({
    //   fullname: 'a',
    //     status: !status
    // });
    // this.thanhcong();
    // console.log('trang thai '+ this.userForm.controls.status.value);
    // this.userForm.controls.status.setValue(!this.userForm.controls.status.value);
    // console.log('trang thai sau khi doi '+ this.userForm.controls.status.value);
    // this.loadData();
    // this.userForm.controls.status.value = !this.userForm.controls.status.value;
    // console.log('trang thai ' + this.userForm.controls.status.value);
    // this.thongbao.info('ok',{timeout:5000});
    this.e = this.store.dispatch(new customerActions.LoadCustomer(this.id));
    // this.serverHttp.getUser(this.id).subscribe((e) => {
      console.log("getuser : ", this.e);
      // this.users = e;
      // this.common.setTotalStudents(data.length);
      this.tt = this.e.status;
      console.log("trang thai :" + this.tt);
      this.tt = !this.tt;
      this.e.status = this.tt;
      console.log("TT sau khi doi :" + this.tt);
      console.log("tang thai 2:" + this.e.status);
      this.store.dispatch(new customerActions.CreateCustomer(this.e));
      // this.serverHttp.updateUser(e).subscribe((e) => {
      //   console.log("da luu" + e.status);
      // });
      this.loadData();
      this.thanhcong();
    };

  public tt1: boolean;
  public doitrangthai() {
    this.tt1 = !this.tt1;
    console.log("sau khi nhap: " + this.tt1);
    // this.userForm.controls.status.value = this.tt1;
    this.userForm.controls.status.setValue(this.tt1);
  }
  // if( this.userForm.controls.status.value===true)

  public them() {
    this.thongbao.info("Thêm user thành công", "Xác nhận", {
      position: SnotifyPosition.rightTop,
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
    });
  }
  public suathanhcong() {
    this.thongbao.info("Sửa thành công", "Xác nhận", {
      position: SnotifyPosition.rightTop,
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
    });
  }

  public thanhcong() {
    this.thongbao.info("Thêm thành công", "Xác nhận", {
      position: SnotifyPosition.rightTop,
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
    });
  }
  public avt;
  public onChangeImage(image,a) {
    let file = image.target.files;
    // console.log(image1.urlImage);
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (image) => {
      this.urlImage = reader.result as string;
      // console.log(image);
      this.avt = image.target.result;
    };



}
}
