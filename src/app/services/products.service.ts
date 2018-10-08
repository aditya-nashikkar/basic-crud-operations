import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {

  private baseUrl: string = "http://localhost:5555/products";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  private product = new Product();
  
  constructor(private _http:Http) { }

  getProducts(page:number, sort:string, order:string) {
    return this._http.get(this.baseUrl+'?_page='+page+'&_limit=5&_sort='+sort+'&_order='+order, this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
  }

  getSearchedProducts() {
    return this._http.get(this.baseUrl, this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
  }

  deleteProduct(id:Number){
    return this._http.delete(this.baseUrl+'/'+id,this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
  }

  createProduct(product) {
    return this._http.post(this.baseUrl, JSON.stringify(product), this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
  }

  updateProduct(product) {
    return this._http.put(this.baseUrl+'/'+product.id, JSON.stringify(product),  this.options).map((response:Response)=>response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error:Response) {
    return Observable.throw(error);
  }

}
