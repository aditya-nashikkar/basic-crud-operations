import { Component, OnInit } from '@angular/core';
import{Router}  from '@angular/router';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  private products;
  private product: Product;
  private allProductsLength;
  private filteredProducts;
  private page: number;
  private totalPageNumber: number;
  private totalPagination: number;
  private currentPage: number;
  private orderType: string = 'desc';
  private sortType:string = 'id';
  private sortIconName:string;
  private sortIconCategory:string;
  private sortIconStatus:string;
  private isFilterOn:boolean = false;

  constructor(private _productService:ProductsService, private _router:Router) { }

  ngOnInit() {
    this.page = 1;
    this.getProductsByPage(1, this.sortType, this.orderType);
    this.getTotalNumberOfProducts();
    this.isFilterOn = false;
  }

  getProductsByPage(page:number, sort:string, orderType:string) {
    this._productService.getProducts(page, sort, orderType).subscribe((data)=>{
      this.filteredProducts = this.products  = data;
      this.isFilterOn = false;
    },(error)=>{
      this.isFilterOn = false;
    });
  }

  getTotalNumberOfProducts() {
    this._productService.getSearchedProducts().subscribe((data)=>{
      this.allProductsLength = new Array(Math.ceil(data.length/5));
      this.totalPageNumber = data.length;
      this.totalPagination = Math.ceil(this.totalPageNumber/5);
      this.isFilterOn = false;
    },(error)=>{
      this.isFilterOn = false;
    });
  }

  deleteProduct(product) {
    this.isFilterOn = false;
    this.currentPage = this.page;
    this._productService.deleteProduct(product.id).subscribe((data)=>{
    this.filteredProducts.splice(this.filteredProducts.indexOf(product),1)
    if(this.filteredProducts.length == 0) {
      this.getTotalNumberOfProducts();
      this.getProductsByPage(1,this.sortType,this.orderType);  
      this.page = 1;
    } else {
      this.page = this.currentPage;
      this.getProductsByPage(this.page, this.sortType,this.orderType);
      this.getTotalNumberOfProducts();
      
    }
    },(error)=>{
      this.isFilterOn = false;
    });
  }

  filter(query:string) {
    this.isFilterOn = true;
    this._productService.getSearchedProducts().subscribe((data)=>{
      this.filteredProducts = this.products  = data;
      this.filteredProducts = (query) ?
      this.products.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) || 
             p.category.toLowerCase().includes(query.toLowerCase()) || 
             p.status.toLowerCase().includes(query.toLowerCase()) 
      ) :  
      this.getProductsByPage(1, this.sortType,this.orderType);
    },(error)=>{
    });
  }
  
  setLastPageIndex() {
    this.isFilterOn = false;
    this.page = Math.ceil(this.totalPageNumber/5);
    this.getProductsByPage(this.page, this.sortType,this.orderType);
  }

  setFirstPageIndex() {
    this.isFilterOn = false;
    this.page = 1;
    this.getProductsByPage(1, this.sortType,this.orderType);
  }

  setNextPageIndex() {
    this.isFilterOn = false;
    if(this.page == this.totalPagination)
      this.page = this.totalPagination;
    else {
      this.page = this.page + 1;
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    }
      
  }

  setPrevPageIndex() {
    this.isFilterOn = false;
    if(this.page == 1)
      this.page = 1;
    else {
      this.page = this.page - 1;
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    }  
  }

  setCurrentPageIndex(i) {
    this.isFilterOn = false;
    this.page = i;
    this.getProductsByPage(this.page, this.sortType,this.orderType);
  }

  sortByName() {
    this.isFilterOn = false;
    this.sortIconCategory = "";
    this.sortIconStatus = "";
    this.sortType = "name";
    if(this.orderType == 'desc') {
      this.orderType = 'asc'; 
      this.sortIconName = "fa fa-sort-up";
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    } else {
      this.orderType = 'desc';
      this.sortIconName = "fa fa-sort-down";
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    }
  }
  
  sortByCategory() {
    this.isFilterOn = false;
    this.sortIconName = "";
    this.sortIconStatus = "";
    this.sortType = "category";
    if(this.orderType == 'desc') {
      this.orderType = 'asc'; 
      this.getProductsByPage(this.page, this.sortType,this.orderType);
      this.sortIconCategory = "fa fa-sort-up";
    } else {
      this.orderType = 'desc';
      this.sortIconCategory = "fa fa-sort-down";
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    }
  }

  sortByStatus() {
    this.isFilterOn = false;
    this.sortIconName = "";
    this.sortIconCategory = "";
    this.sortType = "status";
    if(this.orderType == 'desc') {
      this.orderType = 'asc'; 
      this.getProductsByPage(this.page, this.sortType,this.orderType);
      this.sortIconStatus = "fa fa-sort-up";
    } else {
      this.orderType = 'desc';
      this.sortIconStatus = "fa fa-sort-down";
      this.getProductsByPage(this.page, this.sortType,this.orderType);
    }
  }
  
}
