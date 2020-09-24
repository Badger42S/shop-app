import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromSshoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private shopListSubscr:Subscription;

  constructor(
    private slService:ShoppingListService, 
    private store: Store<fromSshoppingList.AppState> ) { }

  ngOnDestroy(): void {
    // this.shopListSubscr.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList');
    // this.ingredients=this.slService.getIngredients();
    // this.shopListSubscr=this.slService.ingredientsChanged.subscribe(
    //   (ingredients:Ingredient[])=>{
    //     this.ingredients=ingredients;
    //   }
    // )
  }
  
  onEditItem(index:number){
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
