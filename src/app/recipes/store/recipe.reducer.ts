import {Recipe} from '../recipe.model';
import * as fromRecipesActions from './recipe.actions';
export interface State {
    recipes: Recipe[];
};

const initialState : State ={
    recipes:[]
};

export function recipeReducer(state = initialState, action:fromRecipesActions.RecipesActions){
    switch(action.type){
        case fromRecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes:[...action.data]
            };
        case fromRecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes:[...state.recipes, action.data]
            }
        case fromRecipesActions.UPDATE_RECIPE:
            const updatedRecipe={
                ...state.recipes[action.data.index], ...action.data.newRecipe
            };
            const updatedRecipes=[...state.recipes];
            updatedRecipes[action.data.index]=updatedRecipe;
            return {
                ...state,
                recipes:updatedRecipes
            }
        case fromRecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index)=>{
                    return index !== action.data
                })
            }
        default: 
            return state;
    }
}