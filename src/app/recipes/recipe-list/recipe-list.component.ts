import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {Recipe} from '../recipe.modal';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected=new EventEmitter<Recipe>();

  recipes:Recipe[]=[
    new Recipe('chopa', 'sharp', 'none'),
    new Recipe('dakka', 'boom', 'blah'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
