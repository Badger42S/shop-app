import {Action} from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES ='SET_RECIPES';
export const FETCH_RECIPES='FETCH_RECIPES';
export const ADD_RECIPE='ADD_RECIPE';
export const UPDATE_RECIPE ='UPDATE_RECIPE';
export const DELETE_RECIPE ='DELETE_RECIPE';
export const SOTRE_RECIPES ='SOTRE_RECIPES';

export class SetRecipe implements Action{
    readonly type= SET_RECIPES;
    constructor (public data:Recipe[]){}
}

export class FetchRecipes implements Action{
    readonly type=FETCH_RECIPES;
}

export class StoreRecipes implements Action{
    readonly type=SOTRE_RECIPES;
}

export class AddRecipe implements Action{
    readonly type=ADD_RECIPE;
    constructor(public data:Recipe){}
}
export class UpdateRecipe implements Action{
    readonly type=UPDATE_RECIPE;
    constructor(public data:{index:number, newRecipe: Recipe}){}
}
export class DeleteRecipe implements Action{
    readonly type=DELETE_RECIPE;
    constructor(public data:number){}
}

export type RecipesActions = 
    SetRecipe |
    FetchRecipes |
    AddRecipe |
    UpdateRecipe |
    DeleteRecipe |
    StoreRecipes
;