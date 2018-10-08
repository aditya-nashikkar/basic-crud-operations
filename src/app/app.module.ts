import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import{ RouterModule, Routes }   from '@angular/router';
import{ FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

import { Product } from './models/product';

import { ProductsService } from './services/products.service';
import { OperationsComponent } from './components/operations/operations.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const appRoutes:Routes=[

  { path: '', component: ListProductsComponent },
  { path: 'add-new-product', component: OperationsComponent },
  { path: 'update-product/:id', component: UpdateProductComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    OperationsComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
