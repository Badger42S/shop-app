import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromSshoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) slform:NgForm;

  subscription:Subscription;
  editMode=false;
  editedNumber:number;
  editedItem:Ingredient;
  
  constructor(private slService:ShoppingListService,
    private store: Store<fromSshoppingList.AppState> 
  ) { }
  
  ngOnInit(): void {
    this.subscription=this.slService.startedEditing
    .subscribe((index:number)=>{
      this.editedNumber=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngredient(index);
      this.slform.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.slService.updateIngredient(this.editedNumber,newIngredient);
      this.store.dispatch(new ShoppingListAction.UpdateIngredients({index:this.editedNumber, ingredient:newIngredient}));
    }else{
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.editMode=false;
    this.slform.reset();
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedNumber);
    this.store.dispatch(new ShoppingListAction.DeleteIngredients(this.editedNumber));
    this.onClear();
  }
}
