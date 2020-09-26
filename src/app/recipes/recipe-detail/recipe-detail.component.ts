import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailRecipe:Recipe;
  id:number;

  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params=>{
        return +params['id'];
      }),
      switchMap(id=>{
        this.id=id;
        return this.store.select('recipes')
      }),
      map(recipeState=>{
        return recipeState.recipes.find((recipe, index)=>{
          return index === this.id;
        })
      })
    )
    .subscribe(recipe=>{
      this.detailRecipe=recipe;
    })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.detailRecipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
