import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  
  constructor(private slService:ShoppingListService) { }
  
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
  
  onAdd(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedNumber,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
  }
}
