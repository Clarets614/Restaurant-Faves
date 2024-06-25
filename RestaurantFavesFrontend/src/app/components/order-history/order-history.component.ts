import { Component } from '@angular/core';
import { SingleOrderComponent } from '../single-order/single-order.component';
import { AddOrderFormComponent } from '../add-order-form/add-order-form.component';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../Models/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [SingleOrderComponent, AddOrderFormComponent, FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  
  constructor(private _orderService:OrderService){}

  allOrders:OrderModel[] = [];
  

  filteredOrders:string = "";
  filterOrderAgain: boolean = false;

  ngOnInit(){
    this.GetOrders();
  }


  GetOrders(){
    this._orderService.getAllOrders().subscribe((response:OrderModel[])=>{
      console.log(response);
      this.allOrders = response;
    }) 
  }

  removeOrder(o:OrderModel){
    this._orderService.deleteOrder(o.id).subscribe((response)=>{
      this.GetOrders();
    })
  }

  addOrder(o:OrderModel){
    this._orderService.addOrder(o).subscribe((response)=>{
      this.GetOrders();
    })
  }

  updateOrder(o:OrderModel){
    this._orderService.addOrder(o).subscribe((response)=>{
      console.log();
      this.GetOrders();
    })
  }


}
