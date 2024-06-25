import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderModel } from '../../Models/order';

@Component({
  selector: 'app-add-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-order-form.component.html',
  styleUrl: './add-order-form.component.css'
})
export class AddOrderFormComponent {

  formOrder:OrderModel = {} as OrderModel;

  @Output() submittedOrder = new EventEmitter<OrderModel>();

  emitSubmitted(){
    let newOrder:OrderModel = { ...this.formOrder}
    //newOrder.orderAgain = false;
    this.submittedOrder.emit(newOrder)
    this.formOrder = {} as OrderModel;
  }
}
