import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

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

  constructor(private route:ActivatedRoute, private recipeSevice:RecipeService) { }     

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
      const recipe=this.recipeSevice.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImgUrl=recipe.imgUrl;
      recipeDescription=recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name),
              'amount':new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName),
      'imgPath':new FormControl(recipeImgUrl),
      'description':new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount':new FormControl()
      })
    )
  }

  onSubmit(){
    console.log(this.recipeForm);
  }
}
