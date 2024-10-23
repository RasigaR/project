import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {


  newFoodItems:foodItems={
    id:'',
    name:'',
    price:0,
    quantityAvailable:0,
    fileDataF:' '
  };

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.length==0)
      this.router.navigate(['welcome']);
  }

  url:string=' ';
  onSubmit():void{
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('newFoodItem',JSON.stringify(this.newFoodItems));
    console.log(formData.get('file'));
    console.log(formData.get('newFoodItem'));

    if(formData.get('file')==null || formData.get('file')==undefined)
    {
      console.log(formData.get('file'));
      this.url="http://localhost:8080/addNewItem";
    }
    else
    {
      this.url="http://localhost:8080/addNewItemUrl";
    }
    this.http.post(this.url, formData)
      .subscribe(
        res=>
        {
          console.log(this.newFoodItems);
          alert("Item Added Successfully!");
        },err=>{
          alert("Failed to add item. Please Try after sometime!");
        }
      )
  }

  selectedFile:any=null;

  onFileSelected(event: { target: { files: any[]; }; }) {
    this.selectedFile = event.target.files[0];
  }

  present:boolean=true;

  checkAvailability() {
    this.http.post<boolean>("http://localhost:8080/checkItemId",this.newFoodItems.id).subscribe(
      res=>{
        this.present=res;
      },err=>{
        alert("Error. Try After Sometime");
      }
    )
  }

  clearLocal(){
    sessionStorage.clear();
  }
}

export interface foodItems {
  id: string;
  name:string;
  price:number;
  quantityAvailable:number;
  fileDataF:string;
}
