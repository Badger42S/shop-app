import {Recipe} from './recipe.modal';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    private recipes:Recipe[]=[
        new Recipe('chopa', 'sharp', 'none',[new Ingredient('razor',5)]),
        new Recipe('dakka', 'boom', 'blah',[new Ingredient('smoke',6)]),
      ];

    recipeSelected=new EventEmitter<Recipe>();

    constructor(private slService:ShoppingListService){}  

    getRecipe(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}