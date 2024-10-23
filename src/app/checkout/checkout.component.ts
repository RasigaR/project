import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent, User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }

  user:User = AppComponent.modelUser;
  total:string=' ';
  cardNumberVal:boolean=false;
  monthVal:boolean=false;
  yearVal:boolean=false;
  cvvVal:boolean=false;
  nameOnCardVal:boolean=false;

  cardNumber:string=' ';
  month:number=0;
  year:number=0;
  cvv:number=0;
  nameOnCard:string=' ';


  ngOnInit() {
    if (sessionStorage.getItem("userData") == null) {
      this.router.navigate(['login']);
    }
    this.total = sessionStorage.getItem('total') ?? '';

  }

  validCard(){
    if(this.cardNumber.length==0){
      this.cardNumberVal=false;
    }
    if(this.cardNumber.length>0 && this.cardNumber.length<16){
      this.cardNumberVal=false;
    }else if(this.cardNumber.length==16){
      let matcher = new RegExp('^(?=.*[0-9])(?=.{16})');
      this.cardNumberVal=matcher.test(this.cardNumber);
    }
  }

  validMonth(){
    this.monthVal = this.month >= 1 && this.month <= 12;
    console.log(this.monthVal);
  }

  validCvv(){
    this.cvvVal = this.cvv >=100 && this.cvv <= 999
  }

  validName(){
    this.nameOnCardVal=this.nameOnCard.length>=4 && this.nameOnCard.length<=10;
  }

  message:string='';

  changeDB():void{
    if(this.cardNumberVal&&this.monthVal&&this.yearVal&&this.cvvVal&&this.nameOnCardVal) {
      let url = "http://localhost:8080/changeDB";
      this.http.get(url).subscribe(
        res => {
          console.log("DB Updated");
        },
        err => {
          alert('Failed to update DB');
        }
      )
    }else{
      if(!this.cardNumberVal)
        this.message+="Card Number Not Valid \n";
      if(!this.monthVal)
        this.message+="Enter A Valid Month \n";
      if(!this.yearVal)
        this.message+="Enter A Valid Year\n";
      if(!this.cvvVal)
        this.message+="Enter A Valid CVV \n";
      if(!this.nameOnCardVal)
        this.message+="Enter A Valid Name";

      alert(this.message);
      this.message='';
      this.router.navigate(['checkout']);
    }
  }

  validYear() {
    this.yearVal= this.year>=19 && this.year<=99;
    console.log(this.yearVal);
  }


}

