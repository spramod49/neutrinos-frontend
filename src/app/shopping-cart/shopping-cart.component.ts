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
  cartItems: IProducts[] = [];

  //Service injection
  constructor(
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService
  ) {}

  //Fetches all the items in the cart.
  ngOnInit() {
    this._shoppingCartService.getCartItems().subscribe(result => {
      this.cartItems = result;
    }, error => (this.errorMessage = <any>error));
  }

  //Removes an item from the cart.
  removeCartItem(id: string) {
    this._shoppingCartService.removeFromCart(id);
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem._id === id) {
        this.cartItems.splice(index, 1);
      }
    });
  }

  //Calculates the total amount of all the items in the cart.
  totalAmount(): number {
    let sum: number = 0;
    this.cartItems.forEach(cartItem => {
      sum += Number(cartItem.price);
    });
    return sum;
  }
}
