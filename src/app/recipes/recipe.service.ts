import {Recipe} from './recipe.modal';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeChanged=new Subject<Recipe[]>();

    // private recipes:Recipe[]=[
    //     new Recipe('chopa', 'sharp', 'none',[new Ingredient('razor',5)]),
    //     new Recipe('dakka', 'boom', 'blah',[new Ingredient('smoke',6)]),
    // ];

    private recipes:Recipe[]=[];

    constructor(private slService:ShoppingListService, private store:Store<{shoppingList: {ingredients:Ingredient[]}}>){}  

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index:number){
        return this.recipes[index];
    }

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe){
        this.recipes[index]=recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}