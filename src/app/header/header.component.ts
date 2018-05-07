import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  //Service injection.
  constructor(private _shoppingCartService: ShoppingCartService) {}
  cartItemCount: number;

  //Runs when the header component is initialized and also if item was added or removed from the cart.
  ngOnInit() {
    this._shoppingCartService
      .getCartItems()
      .subscribe(items => (this.cartItemCount = items.length));
  }
}
