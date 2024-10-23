import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  model:Login={
    username:'',
    password:''
  };

  message:string=' ';

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.length>0)
      this.router.navigate(['welcome']);
  }

  sendFeedback(): void {
    let url = "http://localhost:8080/login";
    let key='userData';
    this.http.post<User>(url,this.model).subscribe(
      res => {
        // localStorage.setItem(key,JSON.stringify(res));
        sessionStorage.setItem(key,JSON.stringify(res));
        if(res!=null && !res.merchant) {
          this.router.navigate(['welcome']);
        }
        if(res!=null && res.merchant){
          this.router.navigate(['merchantWelcome']);
        }
        if(res==null) {
          this.message = "Username Or Password is Wrong";
          sessionStorage.clear();
        }
      },
      err=>{
        console.log([this.model]);
        alert("An error has occurred while logging in");
      }
    )
  }
}

export interface Login {
  username:string;
  password:string;
}



