import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private _shoppingCartService: ShoppingCartService) {}
  cartItemCount: number;
  ngOnInit() {
    this._shoppingCartService
      .getCartItems()
      .subscribe(items => (this.cartItemCount = items.length));
  }
}
