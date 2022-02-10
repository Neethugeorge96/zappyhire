import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor( private http:HttpClient) { }
  userinfoUrl = 'https://randomuser.me/api/'

  getUserDetails(){
    return this.http.get<any>(this.userinfoUrl)
  }
}
