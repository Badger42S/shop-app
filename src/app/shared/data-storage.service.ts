import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions'

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(
        private httpClient: HttpClient, 
        private recipeService:RecipeService, 
        private authService:AuthService,
        private store:Store<fromApp.AppState>
    ){}
    
    storeRecipe(){
        const recipe = this.recipeService.getRecipes();
        this.httpClient.put('https://ng-course-ace87.firebaseio.com/recipes.json',
            recipe
        )
            .subscribe(
                response=>{
                    console.log(response);
                }
            );
    }

    fetchRecipe(){
        return this.httpClient.get<Recipe[]>(
            'https://ng-course-ace87.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes=>{
                return recipes.map(recipe=>{
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} 
                })
            }),
            tap(respData=>{
                console.log(respData);
                // this.recipeService.setRecipes(respData);}
                this.store.dispatch(new RecipesActions.SetRecipe(respData))
            })
        );
    }
}