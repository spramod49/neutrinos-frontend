import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProducts } from "../interfaces/IProducts";
import { ProductService } from "../product.service";
import { ShoppingCartService } from "../shopping-cart.service";
@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  errorMessage: string;
  cartItems: IProducts[];
  constructor(
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this._shoppingCartService.getCartItems().subscribe(result => {
      this.cartItems = result;
    }, error => (this.errorMessage = <any>error));
  }
  removeCartItem(id: string) {
    this._shoppingCartService.removeFromCart(id);
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem._id === id) {
        this.cartItems.splice(index, 1);
      }
    });
  }
}
