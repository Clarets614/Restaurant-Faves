import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderModel } from '../../Models/order';

@Component({
  selector: 'app-single-order',
  standalone: true,
  imports: [],
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.css'
})
export class SingleOrderComponent {

  @Input() displayOrder:OrderModel = {} as OrderModel;
  
  @Output() delete = new EventEmitter<OrderModel>();
  @Output() update = new EventEmitter<OrderModel>();

  emitDelete(){
    this.delete.emit(this.displayOrder);
  }

  emitUpdate(){
    this.displayOrder.orderAgain = !this.displayOrder.orderAgain;
    this.update.emit(this.displayOrder);
  }
}
