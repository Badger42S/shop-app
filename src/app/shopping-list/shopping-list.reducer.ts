import {Action} from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const initState={
    ingredients:[
        new Ingredient('razor',5),
        new Ingredient('smoke',6)
    ],
};

export function ShoppingListReduxer (state=initState, action: Action){
    switch(action.type){
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients:[...state.ingredients, action]
            };
        default: return state;
    }
}