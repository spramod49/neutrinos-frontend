import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { IProducts } from "./interfaces/IProducts";
@Injectable()
export class ProductService {
  private _productsurl: string = "http://localhost:3000/products";

  constructor(private _http: Http) {}

  // Makes a http call to the server and returns all the products.
  getProducts(): Observable<IProducts[]> {
    return this._http
      .get(this._productsurl)
      .map((response: Response) => <IProducts[]>response.json())
      .catch(this.handleError);
  }

  //Throws an error if the server is down.
  private handleError(error: Response) {
    return Observable.throw(error.json().error || "Server error");
  }
}
