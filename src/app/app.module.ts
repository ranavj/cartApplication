import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
// metirial packages
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// custom components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppItemsComponent } from './items/app.items.component';
import { AppOrderSummary } from './orderSummary/order.summary.component';
import { selectItemComponent } from './snackBar/app.selectItem.component';
// services
import { ItemsService } from '../services/items.service';
import { OrderSummaryService } from '../services/order-summary.service';




const routes = [
  { path: 'allitems', component: AppItemsComponent},
  { path: 'cart-page', component: AppOrderSummary },
  { path: '**', redirectTo: '/allitems' }
];
@NgModule({
  declarations: [
    AppComponent,
    AppItemsComponent,
    AppOrderSummary,
    selectItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatBadgeModule,
    HttpClientModule,
    CommonModule,
    AngularFontAwesomeModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ ItemsService, OrderSummaryService ],
  entryComponents: [selectItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
