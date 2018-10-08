import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object ={};
  products = [];
  allProducts;
  currentProduct;
  productObj:object = {};
  flag:boolean = false;
  isExist:boolean = false;
  private isValidName:boolean = true;
  private isValidCategory:boolean = true;
  private isValidStatus:boolean = true;
  private isValidImgUrl:boolean = true;
  private typeList = ['Fruits', 'Seasoning', 'Vegetables'];

  constructor(private _productService: ProductsService, private _router: Router, private _route: ActivatedRoute) { }

  processFormUpdate(product) {
    this.productObj = {
      "id": this.id,
      "name": product.name,
      "category": product.type,
      "status": product.status,
      "imgUrl": product.imageUrl
    };

    this.isExist = false;
    this.isValidName = true;
    this.isValidCategory = true;
    this.isValidStatus = true;
    this.isValidImgUrl = true;

    console.log(product.name);

    if(product.name === '' || product.name === null || product.name === ' ') {
      console.log("Empty");
      this.isValidName = false;
      this.isExist = false;
    } 
    
    if(product.imageUrl === '' || product.imageUrl == null || product.imageUrl == ' ') {
      this.isValidImgUrl = false;
    }

    else {
      for(let i=0; i<this.products.length; i++) {
        let productName = this.products[i].name;
        if(productName.toLowerCase() === product.name.toLowerCase()) {
          console.log(productName);
          console.log(product.name);
          this.flag = true;
        }
      }
  
      console.log(this.flag);
  
      if (this.flag == true)
          this.isExist = true;
      else {
        this._productService.updateProduct(this.productObj).subscribe((data)=>{
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

    this._route.params.subscribe(params=>{
      this.id = +params['id'];
    });

    this._productService.getSearchedProducts().subscribe((serverData)=>{
      this.allProducts = serverData;
      // console.log("-------------------");
      // console.log(this.allProducts);
      // console.log("-------------------");
    })

    this._productService.getSearchedProducts().subscribe((serverData)=>{
      this.products = serverData;
      for(let i=0; i<this.products.length; i++) {
        if(parseInt(this.products[i].id) === this.id) {
          this.data = this.products[i];
          this.currentProduct = this.data['name'];
          this.products.splice(i-1, 1);
          console.log(this.products.splice(i-1, 1));
          console.log(this.products);
          console.log(this.currentProduct);
          console.log(this.data['name']); 
          break;
        }
      }
    })

    

  }
}

