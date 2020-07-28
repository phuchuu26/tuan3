import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public totalService: number;
  public totalService$ = new BehaviorSubject<number>(0);
  constructor() {

   }
   public layTongUsers(sum:number){
    this.totalService = sum;
    this.totalService$.next(sum);
    console.log(sum);
    // this.totalService
  }
  public tangUsers(){
    this.totalService++;
    this.totalService$.next(this.totalService);
    console.log(this.totalService);
    // this.totalService
  }
}
