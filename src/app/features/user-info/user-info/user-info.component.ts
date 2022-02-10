import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { LocationService } from '../../location-info/location.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userDetails: any;
  userData: any = {};

  constructor(private userService: UserInfoService,
    public datepipe: DatePipe,
    public locationService: LocationService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserDetails().subscribe((response: any) => {
      this.userDetails = response.results[0];
    })
  }

  getUserDetails(source: any) {
    switch (source) {
      case 'name':
        this.userData['title'] = 'My Name is';
        this.userData['details'] = this.userDetails['name'].title + ' ' + this.userDetails['name'].first + ' ' + this.userDetails['name'].last;
        break;
      case 'email':
        this.userData['title'] = 'My Email is';
        this.userData['details'] = this.userDetails['email']
        break;
      case 'phone':
        this.userData['title'] = 'My Phone is';
        this.userData['details'] = this.userDetails['phone']
        break;
      case 'dob':
        this.userData['title'] = 'My DOB is';
        this.userData['details'] = this.datepipe.transform(this.userDetails['dob'].date, 'yyyy-MM-dd');
        break;
    }
  }

  setUserData() {
    this.locationService.setUserData(this.userDetails);
  }
  logout() {
    this.authService.logout()
  }

}
