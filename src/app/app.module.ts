import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ProductService } from "./product.service";
import { ShoppingCartService } from "./shopping-cart.service";

const appRoutes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "cart", component: ShoppingCartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ShoppingCartComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpModule],
  providers: [ProductService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule {}
