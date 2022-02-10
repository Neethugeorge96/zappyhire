import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css']
})
export class LocationInfoComponent implements OnInit,OnDestroy {

  userData : any;
  subscription!: Subscription;
  locationDetails :any;
  weatherDetails :any;

  constructor(private locatonService : LocationService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getLocationDetails();
  }

  getLocationDetails(){
    this.subscription = this.locatonService.getUserData().subscribe((response : any)=>{
      this.userData = response;
      this.locationDetails = this.userData.location
      this.getWeatherData()
      console.log( this.locationDetails)
    })
  }

  getWeatherData(){
    let latitude = this.locationDetails['coordinates'].latitude;
    let longitude = this.locationDetails['coordinates'].longitude;
    this.locatonService.getWeatherDetails(latitude,longitude).subscribe((response :any)=>{
      console.log(response.data[0]);
      this.weatherDetails = response.data[0];
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout()
  }

}
