import { Component, OnInit } from '@angular/core';
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
export class ProductList implements OnInit {
  allProducts: any[] = []; // Store all products
  products: any[] = []; // Displayed products (filtered)
  
  productRows: any[][] = [[], [], []]; // 3 separate rows of products

  categories: string[] = [];
  selectedCategory: string = 'All Products';
  searchQuery: string = '';

  selectedProduct: any = null;

  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.http.get('assets/products.json').subscribe((res:any)=>{
      this.allProducts = res;
      this.products = res;
      this.extractCategories();
      this.distributeProducts();
    });
  }

  extractCategories() {
    const uniqueCategories = new Set(this.allProducts.map(p => p.productService));
    this.categories = Array.from(uniqueCategories).sort();
  }

  onCategoryChange(event: any) {
    this.filterByCategory(event.target.value);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.products = this.allProducts.filter(product => {
      const matchesCategory = this.selectedCategory === 'All Products' || product.productService === this.selectedCategory;
      const matchesSearch = product.productName.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });
    this.distributeProducts();
  }

  distributeProducts() {
    this.productRows = [[], [], []];
    this.products.forEach((product, index) => {
      // Logic: 0-3 -> Row 0, 4-7 -> Row 1, 8-11 -> Row 2, 12-15 -> Row 0, etc.
      const rowIdx = Math.floor((index % 12) / 4);
      this.productRows[rowIdx].push(product);
    });
  }

  showProductModal(product: any) {
    console.log(product)
    this.selectedProduct = product;
  }

  scrollRow(rowContainer: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 300; // Scroll by roughly one item width + gap
    if (direction === 'left') {
      rowContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      rowContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}

