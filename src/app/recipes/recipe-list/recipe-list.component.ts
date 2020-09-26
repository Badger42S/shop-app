import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {  Router, ActivatedRoute } from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[]=[];
  recipeSubscr:Subscription;

  constructor(
    private recipeService: RecipeService, 
    private router:Router, 
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>
  ) { }
  
  ngOnInit() {
    this.recipeSubscr=this.store.select('recipes')
      .pipe(map(recipeState=>{
        return recipeState.recipes;
      }))
      .subscribe(
        (newRecipes:Recipe[])=>{
          this.recipes=newRecipes;
        })
  }

  ngOnDestroy(): void {
    this.recipeSubscr.unsubscribe();
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
