import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number
}

export interface AppState{
    shoppingList:State;
}


const initState:State={
    ingredients:[
        new Ingredient('razor',5),
        new Ingredient('smoke',6)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.data
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex]=updatedIngredient;
            return {
                ...state,
                ingredients:updatedIngredients,
                editedIngredientIndex:-1,
                editedIngredient:null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ingr, igIndex)=>{
                    return igIndex!==state.editedIngredientIndex
                }),
                editedIngredientIndex:-1,
                editedIngredient:null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.data]},
                editedIngredientIndex:action.data
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1
            };
        default: return state;
    }
}