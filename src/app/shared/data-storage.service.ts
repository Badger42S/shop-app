import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.modal';

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService:RecipeService){}
    
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
        this.httpClient.get<Recipe[]>('https://ng-course-ace87.firebaseio.com/recipes.json')
            .pipe(map(recipes=>{
                return recipes.map(recipe=>{
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} 
                })
            }))
            .subscribe(respData=>{
                console.log(respData);
                this.recipeService.setRecipes(respData);
            })
    }
}