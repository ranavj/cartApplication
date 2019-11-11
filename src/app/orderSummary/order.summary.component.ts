import {Component } from '@angular/core';

import { OrderSummaryService } from "../../services/order-summary.service"

@Component({
    selector: 'app-order-summary',
    templateUrl: './order.summary.component.html',
    styleUrls: ['./order.summary.component.css']
  })

  export class AppOrderSummary{

    constructor(public orderSummary: OrderSummaryService){}
  }