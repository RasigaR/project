import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuServiceService } from '../menu-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  model!: menu[];
  values:Quantity[] = [];
  total!: number;

  modalCart:cart={
    quantity1:0,
    quantity2:0,
    quantity3:0
  };

  constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData") == null) {
      this.router.navigate(['login']);
    }
    this.getItems();
  }


  clearLocal(){
    sessionStorage.clear();
  }

  getItems():void{
    this.menuService.getItems().subscribe((men: any[]) => {
      this.model = men;
      for (let i=0;i<this.model.length;i++){
        this.values.push(new Quantity());
        this.values[i].quantity=0;
      }
    });
  }


  getTotal():void{
    console.log(this.values);
    let url = "http://localhost:8080/cart";
    this.modalCart.quantity1=this.values[0].quantity;
    this.modalCart.quantity2=this.values[1].quantity;
    this.modalCart.quantity3=this.values[2].quantity;
    this.http.post<number>(url,this.values).subscribe(

      (      res: number)=>{
        // AppComponent.total=res;
        sessionStorage.setItem('total',res.toString());
        this.total=res;
      },
      (      err: any)=>{
        alert("Please select at least 1 item");
      }
    )

  }
}

export interface menu {
  id:string;
  item:string;
  price:number;
  quantity:number;
  url:string;
  formID:string;
  cartID:string;
}

export interface cart {
  quantity1:number;
  quantity2:number;
  quantity3:number;
}

export class Quantity {
  quantity!: number;
}

