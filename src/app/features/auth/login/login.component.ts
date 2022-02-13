import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexedDBService } from 'src/app/Services/indexed-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userDetails: any;
  submitted: boolean = false
  loginResponse: any;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private indexedDB: IndexedDBService
  ) { }


  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(loginData?: any): FormGroup {
    return this.formBuilder.group({
      userName: [
        loginData ? loginData.userName : "",
        [
          Validators.required
        ],
      ],


      Password: [
        loginData ? loginData.Password : "",
        [
          Validators.required,
        ],
      ],

    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.loginResponse = this.loginForm.getRawValue();
      this.getUserData();
    }
  }


  getUserData() {
    this.indexedDB.getData().then(
      (result) => {

        this.userDetails = result;



        if ((this.loginResponse.userName.toLowerCase() == this.userDetails['userName'].toLowerCase()) && (this.loginResponse.Password == this.userDetails['password'])) {

          let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFtYWwxMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.gcdeUIZTfb1YcnWSG943isnXNKvLQCnyT_kgjauwZz4";
          this.indexedDB.setToken(token).then(
            () => {
              console.log("token added")

              this.snackbar.open('Logged In sucessfully', '', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['success-snack']
              })

              this.router.navigate(['/userInfo'])

            },
            error => { console.log("error", error); }

          )



        } else {
          this.snackbar.open('Invalid Username or password', '', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: 'top',
            panelClass: ['error-snack']
          })
        }



      },
      error => { console.log("error", error); }
    )
  }

}
