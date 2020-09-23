import {Action} from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT='ADD_INGREDIENT';
export const ADD_INGREDIENTS='ADD_INGREDIENTS';
export const UPDATE_INGREDIENT='UPDATE_INGREDIENT';
export const DELETE_INGREDIENT='DELETE_INGREDIENT';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;

    constructor(public data:Ingredient){}
}
export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;

    constructor(public data:Ingredient[]){}
}
export class UpdateIngredients implements Action{
    readonly type=UPDATE_INGREDIENT;
    constructor(public data:{index:number, ingredient:Ingredient}){}
}
export class DeleteIngredients implements Action{
    readonly type=DELETE_INGREDIENT;
    constructor(public data:number){}
}

export type ShoppingListActions = 
    AddIngredient | 
    AddIngredients |
    UpdateIngredients |
    DeleteIngredients
;