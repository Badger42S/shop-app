import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import {Recipe} from '../recipe.modal';
import {RecipeService} from '../recipe.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[]=[];
  recipeSubscr:Subscription;

  constructor(private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) { }
  
  ngOnInit() {
    this.recipeSubscr=this.recipeService.recipeChanged
    .subscribe(
      (newRecipes:Recipe[])=>{
        this.recipes=newRecipes;
      }
      )
      this.recipes=this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSubscr.unsubscribe();
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
