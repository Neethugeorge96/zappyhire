import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phoneRegex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
  registerForm!: FormGroup;
  submitted = false;



  constructor(
    private formBuilder: FormBuilder,
    private Router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();

  }

  createFormGroup(registerData?: any): FormGroup {
    return this.formBuilder.group({
      // id: [!registerData ? 0 : registerData.id],
      name: [
        registerData ? registerData.name : "",
        [
          Validators.required, Validators.maxLength(20)
        ]
      ],
      dob: [
        registerData ? registerData.dob : "",
        [
          Validators.required
        ]
      ],
      email: [
        registerData ? registerData.email : "",
        [
          Validators.required, Validators.pattern(this.emailRegex)
        ],
      ],
      userName: [
        registerData ? registerData.userName : "",
        [
          Validators.required, Validators.maxLength(20)
        ]
      ],

      phone: [
        registerData ? registerData.phone : "",
        [Validators.required, Validators.pattern(this.phoneRegex),]
      ],
      password: [
        registerData ? registerData.password : "",
        [
          Validators.required,
        ],
      ],
      con_password: [
        registerData ? registerData.con_password : "",
        [
          Validators.required,
        ],
      ],
    });
  }

  validatePass() {
    if (this.registerForm.controls['password'].value != this.registerForm.controls['con_password'].value) {



      this.snackbar.open('password mismatch', '', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: 'top',
        panelClass: ['error-snack']
      })

      this.registerForm.controls['con_password'].setValue('')


    }
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      let response = this.registerForm.getRawValue();
      localStorage.setItem('userData', JSON.stringify(response));
      this.snackbar.open('user added sucessfully', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snack']
      })
      this.Router.navigate(['/auth'])
    }

  }
  onReset() {
    this.registerForm.reset();
  }


}
