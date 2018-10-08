import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  private product:Product;
  private id:string;
  private fetchId:number;
  private name:string;
  private type:string;
  private status:string;
  private imageUrl:string;
  private products;
  private flag:boolean = false;
  private isExist:boolean = false;
  private isValidName:boolean = true;
  private isValidCategory:boolean = true;
  private isValidStatus:boolean = true;
  private isValidImgUrl:boolean = true;
  private typeList = ['Fruits', 'Seasoning', 'Vegetables'];

  constructor(private _productService: ProductsService, private _router: Router, private _route: ActivatedRoute) { }

  productObj:object = {};

  processFormCreate(product) {
    this.productObj = {
      "name": product.name,
      "category": product.type,
      "status": product.status,
      "imgUrl": product.imageUrl
    }

    console.log(product.status);

    this.isExist = false;
    this.isValidName = true;
    this.isValidCategory = true;
    this.isValidStatus = true;
    this.isValidImgUrl = true;

    if(product.name === '' || product.name == null || product.name == ' ') {
      console.log("Empty");
      this.isValidName = false;
      this.isExist = false;
    } 
    
    if(product.type === '' || product.type == null || product.type == ' ') {
      this.isValidCategory = false;
    }

    if(product.status === undefined) {
      this.isValidStatus = false;
    }

    if(product.imageUrl === '' || product.imageUrl == null || product.imageUrl == ' ') {
      this.isValidImgUrl = false;
    }
    
    else {
        for(let i=0; i<this.products.length; i++) {
          let productName = this.products[i].name;
          if(productName.toLowerCase() === product.name.toLowerCase()) {
            this.flag = true;
            this.isValidName = true;
          }
        }
        console.log(this.flag);
        if (this.flag == true)
          this.isExist = true;
        else {
          this._productService.createProduct(this.productObj).subscribe((data)=>{
          console.log(data);
          this._router.navigate(['/']);
          },(error)=>{
            console.log(error);
        });
        }    
        this.flag = false;
      }
  }

  ngOnInit() {
  
    this._route.params.subscribe(params => {
      this.fetchId = +params['id'];
      console.log(this.fetchId);
    });

    this._productService.getSearchedProducts().subscribe((serverData)=>{
      this.products = serverData;
      console.log(this.products);
    })  
    
  }  
}
