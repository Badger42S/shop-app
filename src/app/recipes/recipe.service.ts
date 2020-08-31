import {Recipe} from './recipe.modal';
import { EventEmitter } from '@angular/core';

export class RecipeService{
    private recipes:Recipe[]=[
        new Recipe('chopa', 'sharp', 'none'),
        new Recipe('dakka', 'boom', 'blah'),
      ];

    recipeSelected=new EventEmitter<Recipe>();

    getRecipe(){
        return this.recipes.slice();
    }
}