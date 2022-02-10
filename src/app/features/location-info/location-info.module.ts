import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInfoComponent } from './location-info/location-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LocationInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: LocationInfoComponent,

      },

    ]),
  ]
})
export class LocationInfoModule { }
