import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';

import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(
        private dataSavingService:DataStorageService, 
        private recipeService:RecipeService,
        private store:Store<fromApp.AppState>,
        private action$:Actions
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState=>{
                return recipesState.recipes;
            }),
            switchMap(recipes=>{
                if(recipes.length === 0){
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.action$.pipe(
                        ofType(RecipeActions.SET_RECIPES),
                        take(1));
                } else {
                    return of(recipes);
                }
            })
        )
    }
}