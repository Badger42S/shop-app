import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService:RecipeService, private authService:AuthService){}
    
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
                this.recipeService.setRecipes(respData);}
        ));
    }
}