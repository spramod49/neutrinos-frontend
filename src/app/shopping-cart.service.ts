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

  // makes the http call and initializes all the items into the cartItems array.
  initializeItems() {
    this._http.get(this._cartitemsurl).subscribe((items: Response) => {
      this.cartItems = <IProducts[]>items.json();
      this.cart.next(this.cartItems);
    });
  }

  //Calls the initialize items function and returns the subject as an observable for cross component communication(Mainly the header component)
  getCartItems() {
    this.initializeItems();
    return this.cart.asObservable();
  }

  //Makes a http request to add an item to the cart.
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

  //Makes a http request to remove an item from the cart.
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
