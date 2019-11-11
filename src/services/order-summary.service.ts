import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  parseOrderSummary: Array<[]> = [];
  cartItems: Object;
  parseOrder:any;
  orderTotal: Array<[]>;
  currentItem: string;
  constructor() { 
    this.cartItems = {}
  }

  getDiscountValue(item):number{
    let orignalPrice = Number(item.price);
    let discount = Number(item.discount)/100;
    let totalPrice = orignalPrice - (orignalPrice * discount);
    return totalPrice;
  }

  

  calculateOrderItems(){
    this.parseOrder = this.parseOrderSummary.map( (item: [], index: number) => {
      return item.reduce( ( acum, value : object, index1 ) : Object => {
        return acum[index] = { 
          'price' : ( this.getDiscountValue( value ) * (index1+1) ),
          'qty': index1+1,
          'name': value['name'],
          'singleItem': value['price'],
          'discount': (value['price'] - this.getDiscountValue(value)) * (index1+1),
          'withoutDiscountPrice': value['price']* (index1+1),
          'id': value['id']
        }
      }, [
        {
          'price': 0,
          'qty': 0,
          'name': '',
          'singleItem': 0,
          'discount': 0,
          'withoutDiscountPrice': 0,
          'id': 0
        }
      ]);
    })
    return this.parseOrder;
  }

  claculateOrderItemsTotal(){
   this.orderTotal = this.parseOrder.reduce( (acum, value) : Object => {
         acum[0] = {
          'totalPrice': acum[0]['totalPrice']+ value['price'],
          'discount': acum[0]['discount']+ value['discount'],
          'withoutDiscountPrice': acum[0]['withoutDiscountPrice']+ value['withoutDiscountPrice']
        }
        return acum;
    }, [{
       'totalPrice': 0,
       'discount': 0,
       'withoutDiscountPrice': 0
    }])
    console.log(this.orderTotal);
  }
 
  subtractItemsTotal(_id){
  //   this.parseOrder.map( (item, index) => {
  //     if(item[id] == id){
  //       item['discount'] = item['discount']/item['qty'],
  //       item['price']  = item['price']/ item['qty'],
  //       item[''] = item['qty']-1
  //     }
  //   })
  // from both cartitem and parseOrderSummary item removes
  // parallelly
  /**
   * cartItem data format = {
   *  9546: [{...},{...}],
   *  8778: [{..}]
   * }
   * and parseOrderSummary items 
   * Object.value(cartItem)
   * that return Array of cartItems
   * 
   *  */ 
      this.parseOrderSummary.forEach( (item : Array<[]>, index)  => {
       if( item[0]['id'] == _id && item.length == 1 ){
            
            // remove from parallelly item from cartItems Object also
             delete this.cartItems[_id]
             this.parseOrderSummary[index].splice(0, 1 )
             return true;
        } if( item[0]['id'] == _id  ){

           // remove from parallelly item from cartItems Object also
           console.log(this.cartItems[_id])
           this.cartItems[_id].splice(0,1)
           return true;
        }
        
      })

      // delete empty array 
      this.parseOrderSummary = this.parseOrderSummary.filter( function(el){
        return el.length != 0;
      });
      
      this. calculateOrderItems();
      return this.claculateOrderItemsTotal();
      
   }
  

   repeatToCart(item){
    this.cartItems[`${item}`].push( this.cartItems[`${item}`][0] )
    this.parseOrderSummary = Object.values(this.cartItems);
    this.calculateOrderItems();
    this.claculateOrderItemsTotal();
  }

} 
