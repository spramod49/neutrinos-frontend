import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../product.service";
import { IProducts } from "../interfaces/IProducts";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  errorMessage: string;
  products: IProducts[];

  constructor(
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this._productService.getProducts().subscribe(result => {
      this.products = result;
    }, error => (this.errorMessage = <any>error));
  }

  addToCart(id: string, addedToCart: boolean) {
    this._shoppingCartService.addToCart(id);
    this.products.forEach((product, index) => {
      if (product._id === id) {
        product.addedToCart = !product.addedToCart;
      }
    });
  }
}
