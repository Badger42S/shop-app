import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient,} from '@angular/common/http';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects{
    constructor(
        private action$: Actions,
        private httpClient: HttpClient
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

}