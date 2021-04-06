import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  url: string = 'https://propenster-node-apis.herokuapp.com/api/v1/mairuwadrivers/';



  constructor(private http: HttpClient) { }



  postDriver(driver){
    return this.http.post(this.url, driver);

  }
}
