import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [

  {
    path : '',
    redirectTo : '/auth',
    pathMatch : 'full'
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "userInfo",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./features/user-info/user-info.module").then((m) => m.UserInfoModule),
  },
  {
    path: "locationInfo",
    loadChildren: () =>
      import("./features/location-info/location-info.module").then((m) => m.LocationInfoModule),
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
