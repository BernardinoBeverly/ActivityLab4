import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  showPassword = false;
  showPassToggle = 'eye';
  showRetypePassword = false;
  showRetypePassToggle = 'eye';

  get name() {
    return this.createForm.get('name');
  }

  get emailAdd() {
    return this.createForm.get('emailAdd');
  }

  get phone() {
    return this.createForm.get('phone');
  }

  get password() {
    return this.createForm.get('password');
  }

  get confirmpass() {
    return this.createForm.get('confirmpass');
  }

  public validatormessage = {
    name: [
      { type: 'required', message: 'Name is required.'},
      { type: 'minlength', message: 'Name must be 6 characters above.'}
    ],
    emailAdd: [
      { type: 'required', message: 'Email address is required.'},
      { type: 'pattern', message: 'Enter valid Email address.'}
    ],
    phone: [
      { type: 'required', message: 'Phone number is required.'},
      { type: 'pattern', message: 'Phone must be numbers only.'},
      { type: 'minlength', message: 'Phone number must be 11 numbers only.'},
      { type: 'maxlength', message: 'Phone number must be 11 numbers only.'}
    ],
    password: [
      { type: 'required', message: 'Enter your password.'},
      { type: 'minlength', message: 'Password must be 6 characters above.'},
      { type: 'pattern', message: 'Password must contains numbers and special characters.'}
    ],
    confirmpass: [
      { type: 'required', message: 'Confirm your password.'},
      { type: 'matchingPass', message: 'Your password does not match.'},
    ],
  };

  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  matchingPass(controlName: string, matchingControlName: string){
    return(formBuilder: FormGroup)=>{
      const enteredPw = formBuilder.controls[controlName];
      const matchingPw = formBuilder.controls[matchingControlName];
      if(matchingPw.errors && !matchingPw.errors.matchingPass){
        return;
      }
      if(enteredPw.value !== matchingPw.value){
        matchingPw.setErrors({matchingPass:true});
      }
      else{
        matchingPw.setErrors(null);
      }
    };
  }

  public signup() {
    this.createForm.reset();
  }

  showPass(): void {
    this.showPassword = !this.showPassword;

    if(this.showPassToggle === 'eye') {
      this.showPassToggle = 'eye-off';
    }
    else{
      this.showPassToggle = 'eye';
    }
  }


  showRetypePass(): void {
    this.showRetypePassword = !this.showRetypePassword;

    if(this.showRetypePassToggle === 'eye') {
      this.showRetypePassToggle = 'eye-off';
    }
    else{
      this.showRetypePassToggle = 'eye';
    }
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      emailAdd: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')]],
      phone: ['',[Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11), Validators.maxLength(11)]],
      password:['',[Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]],
      confirmpass: ['',[Validators.required,]]
    },
    {
      validators: this.matchingPass('password', 'confirmpass') //for password confirmation.
    });
  }
}
