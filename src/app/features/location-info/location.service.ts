import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public userData = new BehaviorSubject<any>('default message');

  weatherUrl = 'https://api.weatherbit.io/v2.0/current?lat='
  weatherKey = 'd4f2364a713d45aca46711bffd7e1947'
  constructor(private http:HttpClient) { }

  setUserData(data: any){
    this.userData.next(data);
  }

  getUserData(){
    return this.userData;
  }

  getWeatherDetails(lat:any,lon:any){
    return this.http.get<any>(this.weatherUrl  +lat + '&lon=' + lon + '&key=' + this.weatherKey)
  }

}
