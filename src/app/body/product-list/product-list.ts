import { Component } from '@angular/core';
import { Product } from "./product/product";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductModal } from './product-modal/product-modal';


@Component({
  selector: 'app-product-list',
  imports: [ Product,CommonModule,ProductModal],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
   products:any = [];

     ngOnInit():void{
    this.http.get('https://gomath-backend.onrender.com/products').subscribe((res:any)=>{
      this.products=res.data;
      
    })
  }

  constructor(private http:HttpClient){

  }
  selectedProduct: any = null;

showProductModal(product: any) {
  console.log(product)
  this.selectedProduct = product;
}



  

}
