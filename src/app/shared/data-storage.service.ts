import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';

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
}