import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{
    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>
    ){}

    @Effect()
    fetchRecipe=this.action$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(()=>{
            return this.httpClient.get<Recipe[]>(
                'https://ng-course-ace87.firebaseio.com/recipes.json'
            )
        }),
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} 
            })
        }),
        map(recipes=>{
            return new RecipeActions.SetRecipe(recipes);
        })
    );

    @Effect({dispatch:false})
    storeRecipes=this.action$.pipe(
        ofType(RecipeActions.SOTRE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState])=>{
            return this.httpClient.put('https://ng-course-ace87.firebaseio.com/recipes.json',
                recipesState.recipes
            )
        })
    )
}