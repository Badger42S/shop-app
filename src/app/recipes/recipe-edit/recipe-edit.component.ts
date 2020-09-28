import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(
    private route:ActivatedRoute, 
    private recipeService:RecipeService, 
    private router:Router,
    private store:Store<fromApp.AppState>
  ) { }     

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.editMode=params['id'] !=null;
          this.initForm();
        }
      )
  }

  private initForm(){
    let recipeName='';
    let recipeImgUrl='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);

    if(this.editMode){
      // const recipe=this.recipeService.getRecipe(this.id);
      this.store.select('recipes').pipe(
        map(recipeState=>{
          return recipeState.recipes.find((recipe, index)=>{
            return index===this.id;
          })
        })
      )
      .subscribe(recipe=>{
        recipeName=recipe.name;
        recipeImgUrl=recipe.imgUrl;
        recipeDescription=recipe.description;

        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name':new FormControl(ingredient.name, Validators.required),
                'amount':new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      })
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imgPath':new FormControl(recipeImgUrl, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onSubmit(){
    console.log(this.recipeForm);
    const newRecipe=new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingredients']
    );
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe:newRecipe}))
    }else{
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe))
    }
    this.onCancel();
  }
}
