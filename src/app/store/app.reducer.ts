import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList: fromShoppingList.State;
    auth:fromAuth.State;
}

export const appreducer:ActionReducerMap<AppState> ={
    shoppingList: fromShoppingList.shoppingListReduxer,
    auth: fromAuth.authReducer
};