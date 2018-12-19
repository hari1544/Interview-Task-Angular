import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserserviceService } from '../service/userservice.service';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public regForm: FormGroup;
  country = this.dataservice.countries;
  states;
  cities;
  userNameError: boolean = false;
  userEmailError: boolean = false;
  constructor(private router: Router, private userservice: UserserviceService, private dataservice: DataserviceService) { }


  ngOnInit() {
    this.regForm = new FormGroup({
      name: new FormControl(null),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(13)]),
      country: new FormControl(this.country),
      state: new FormControl(null),
      city: new FormControl(null),
      address: new FormControl(null)
    }, { validators: this.checkPasswords })
  }

  register(form: FormGroup) {
    const registerDetails = this.regForm.value;
    this.userservice.register(registerDetails).subscribe(data => {
      this.regForm = new FormGroup({});
      this.router.navigate(['/']);      
      setTimeout(() => {
        alert('Register successfully..!');
      }, 800); 
    });
  }


  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }


  validateUsername(username) {
    this.userservice.userNameValidation(username).subscribe(data => {
      console.log(data.length);
      if (data.length > 0)
        this.userNameError = true;
      else
        this.userNameError = false;
    })
  }

  validateEmail(email) {
    this.userservice.emailValidation(email).subscribe(data => {
      if (data.length > 0)
        this.userEmailError = true;
      else
        this.userEmailError = false;
    })
  }


  getState(country) {
    this.country.filter(data => {
      if (data.country == country) {
        this.states = data.states;
        if (data.cities)
          this.cities = data.cities;
      }
    })
  }

}
