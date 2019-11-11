import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import{ OrderSummaryService } from '../../services/order-summary.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { selectItemComponent } from '../snackBar/app.selectItem.component'

@Component({
  selector: 'app-items',
  templateUrl: './app.items.component.html',
  styleUrls: ['./app.items.component.css']
})
export class AppItemsComponent implements OnInit {
  title = 'cartApplication';
  storeItems: Array<[]>;
  constructor(
    private items: ItemsService,
    public orderSummary : OrderSummaryService,
    private snackBar: MatSnackBar){

  }

  ngOnInit(){
    // get items on onload from service 
     this.items.getItems().subscribe( (res) => {
        console.log(res);
        return this.storeItems = res
     })
  }
  

  addToCart( item ){
    this.orderSummary.currentItem = item.name;
    this.snackBar.openFromComponent( selectItemComponent, {
      duration: 2 * 1000,
      verticalPosition: 'top',
    });
    // check item repeat base on item id
    if( this.orderSummary.cartItems.hasOwnProperty(item.id) ){
      this.orderSummary.cartItems[`${item.id}`].push({...item})
    }else{
      this.orderSummary.cartItems[`${item.id}`] = [{...item}]
    }
   // this.parseOrderSummary = Object.values(this.orderSummary.cartItems);
    this.orderSummary.parseOrderSummary = Object.values(this.orderSummary.cartItems);
    console.log(this.orderSummary.cartItems)
    console.log(this.orderSummary.parseOrderSummary)
  // console.log(this.orderSummary.calculateOrderItems())
    this.orderSummary.calculateOrderItems();
    this.orderSummary.claculateOrderItemsTotal();
  }

}
