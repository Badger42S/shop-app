import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList: fromShoppingList.State;
    auth:fromAuth.State;
    recipes:fromRecipes.State;
}

export const appreducer:ActionReducerMap<AppState> ={
    shoppingList: fromShoppingList.shoppingListReduxer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};