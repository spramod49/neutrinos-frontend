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

  //Service Injection.
  constructor(
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService
  ) {}

  // Fetches all the products from the database and stores it in 'products' variable.
  ngOnInit() {
    this._productService.getProducts().subscribe(result => {
      this.products = result;
    }, error => (this.errorMessage = <any>error));
  }

  //Adds a product to a cart.
  addToCart(id: string, addedToCart: boolean) {
    this._shoppingCartService.addToCart(id);
    this.products.forEach((product, index) => {
      if (product._id === id) {
        product.addedToCart = !product.addedToCart;
      }
    });
  }
}
