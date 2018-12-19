import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userdata={};

  constructor(private userService:UserserviceService, private router:Router) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(data => {
      this.userdata=data;
    })
  }

  logout(){
    this.userService.logout().subscribe(data=>{      
      this.router.navigate(['/']);
      setTimeout(() => {
        alert('Logout successfully..!');
      }, 800);      
    })
  }

}
