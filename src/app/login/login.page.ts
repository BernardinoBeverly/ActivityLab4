import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  showPassToggle = 'eye';


  get emailAdd() {
    return this.loginForm.get('emailAdd');
  }

  get password() {
    return this.loginForm.get('password');
  }


  public validatormessage = {
    emailAdd: [
      { type: 'required', message: 'Email address is required.'},
      { type: 'pattern', message: 'Enter valid Email address.'}
    ],
    password: [      // if password is does not complete pattern it returns as Incorrect.
      { type: 'required', message: 'Enter your password.'},
      { type: 'pattern', message: 'Incorrect password.'}
    ]
  };

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  public login() {
    this.loginForm.reset(); //reset the forms after login to avoid save inputs.
  }

  showPass(): void { //eye toggle for show and hide password
    this.showPassword = !this.showPassword;

    if(this.showPassToggle === 'eye') {
      this.showPassToggle = 'eye-off';
    }
    else{
      this.showPassToggle = 'eye';
    }
  }

  forgotPass(): void {

    alert('Sorry. We cannot retrieve your account right now. Please try again.');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAdd: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')]],
      password:['',[Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]],
    });
  }
}
