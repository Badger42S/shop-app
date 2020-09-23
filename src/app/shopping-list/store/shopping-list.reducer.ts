import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients:Ingredient[];
    editedIngredients:Ingredient;
    editedIngredientsIndex:number
}

export interface AppState{
    shoppingList:State;
}


const initState:State={
    ingredients:[
        new Ingredient('razor',5),
        new Ingredient('smoke',6)
    ],
    editedIngredients:null,
    editedIngredientsIndex:-1
};

export function shoppingListReduxer (
    state:State=initState, 
    action: ShoppingListActions.ShoppingListActions
){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients, action.data]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients, ...action.data]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.data.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.data.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.data.index]=updatedIngredient;

            return {
                ...state,
                ingredients:updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ingr, igIndex)=>{
                    return igIndex!==action.data
                })
            };
        default: return state;
    }
}