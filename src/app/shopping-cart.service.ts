import { Injectable } from "@angular/core";
import { IProducts } from "./interfaces/IProducts";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/Rx";
@Injectable()
export class ShoppingCartService {
  cart: Subject<IProducts[]> = new Subject();
  cartItems: IProducts[];

  private _cartitemsurl: string = "http://localhost:3000/cart";
  constructor(private _http: Http) {}

  headers = new Headers({ "Content-Type": "application/json" });
  options = new RequestOptions({ headers: this.headers });

  initializeItems() {
    this._http.get(this._cartitemsurl).subscribe((items: Response) => {
      this.cartItems = <IProducts[]>items.json();
      this.cart.next(this.cartItems);
    });
  }

  getCartItems() {
    this.initializeItems();
    return this.cart.asObservable();
  }

  addToCart(id: string) {
    this._http
      .post(this._cartitemsurl + "/" + id, {}, this.options)
      .toPromise()
      .then(res => {
        this.getCartItems().subscribe(result => {
          this.cartItems = result;
        });
        this.cart.next(this.cartItems);
      })
      .catch(err => {
        throw err;
      });
  }

  removeFromCart(id: string) {
    this._http
      .post(this._cartitemsurl + "/" + id, {}, this.options)
      .toPromise()
      .then(res => {
        this.getCartItems().subscribe(result => {
          this.cartItems = result;
        });
        this.cart.next(this.cartItems);
      })
      .catch(err => {
        throw err;
      });
  }
}
