import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  // Capture selected file
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProduct(event: any) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData();
    formData.append("productName", form.productName.value);
    formData.append("productDescription", form.description.value);
    formData.append("productService", form.service.value);

    if (this.selectedFile) {
      formData.append("productImage", this.selectedFile);
    }

    this.http.post("https://gomath-backend.onrender.com/product", formData)
      .subscribe((res) => {
        console.log("Uploaded Successfully", res);
      });
  }
}
