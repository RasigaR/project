import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merchant-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merchant-welcome.component.html',
  styleUrl: './merchant-welcome.component.css'
})
export class MerchantWelcomeComponent implements OnInit {

  modelMerchant: User = {
    username:'',
    password:'',
    email:'',
    phone:0,
    firstname:'',
    lastname:'',
    address:'',
    merchant:true
  };

  constructor(private router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData")==null) {
      this.router.navigate(['login']);
    }

    
    let userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    console.log(userData);
    Object.assign(this.modelMerchant,userData);
  }


  clearLocal(){
    sessionStorage.clear();
  }
}
