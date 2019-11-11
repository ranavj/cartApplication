import { Component } from "@angular/core";
import { OrderSummaryService } from "../../services/order-summary.service";
@Component({
    selector: 'app.selectItem.component',
    templateUrl: 'app.selectItem.component.html'
    
  })
  export class selectItemComponent {
    constructor(public orderSummary: OrderSummaryService ){}
  }