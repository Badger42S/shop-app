import {Action} from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES ='SET_RECIPES';
export const UPDATE_RECIPE ='';
export const DELETE_RECIPE ='';

export class SetRecipe implements Action{
    readonly type= SET_RECIPES;
    constructor (public data:Recipe[]){}
}

export type RecipesActions = SetRecipe;