import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  url:string = "https://localhost:7088"


  getAllOrders(restaurant?:string, OrderAgain?:boolean):Observable<OrderModel[]>{
    if(restaurant != undefined && OrderAgain != undefined){
      return this.http.get<OrderModel[]>(`${this.url}/api/Orders?restaurant=${restaurant}&orderAgain=${OrderAgain}`)
    }
    else if(restaurant != undefined ){
      return this.http.get<OrderModel[]>(`${this.url}/api/Orders?restaurant=${restaurant}`)
    }
    else if(OrderAgain != undefined){
      return this.http.get<OrderModel[]>(`${this.url}/api/Orders?orderAgain=${OrderAgain}`)
    }
    else{
          return this.http.get<OrderModel[]>(`${this.url}/api/Orders/`);
    }

  }

  getById(id:number):Observable<OrderModel>{
    return this.http.get<OrderModel>(`${this.url}/api/Orders/${id}`);

  }
  addOrder(newOrder:OrderModel):Observable<OrderModel>{
    return this.http.post<OrderModel>(`${this.url}/api/Orders`, newOrder);
  }

  deleteOrder(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/api/Orders/${id}`);
  }

  updateOrder(updatedOrder:OrderModel):Observable<void>{
    return this.http.put<void>(`${this.url}/api/Orders/${updatedOrder.id}`, updatedOrder)
  }
}
