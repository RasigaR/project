import { Component, OnInit } from '@angular/core';
import { cart, menu, Quantity } from '../menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuServiceService } from '../menu-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merchant-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merchant-menu.component.html',
  styleUrl: './merchant-menu.component.css'
})
export class MerchantMenuComponent implements OnInit {

  model!: menu[];

  modalCart:cart={
    quantity1:0,
    quantity2:0,
    quantity3:0
  };

  values:Quantity[] = [];

  constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService,
              public _DomSanitizationService: DomSanitizer ) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData") == null) {
      this.router.navigate(['login']);
    }
    this.getItems();
  }
  getItems() {
    throw new Error('Method not implemented.');
  }
}

