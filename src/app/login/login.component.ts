import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserserviceService } from '../service/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError:boolean=false;
  constructor(private userService: UserserviceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });   

  }

  login(form: FormGroup) {
    var post={};
    if (this.isEmail(this.loginForm.value.email)){

      post={
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    }else{      
      post = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    }
    console.log(post);
    this.userService.login(post).subscribe(data => {      
      this.loginError = false;
      this.router.navigate(['/home']); 
    }, err=>{
        this.loginError=true;
    });   
  }


  isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
