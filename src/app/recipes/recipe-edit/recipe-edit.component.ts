import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
    if(this.editMode){
      const recipe=this.recipeSevice.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImgUrl=recipe.imgUrl;
      recipeDescription=recipe.description;
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName),
      'imgPath':new FormControl(recipeImgUrl),
      'description':new FormControl(recipeDescription),
    })
  }

  onSubmit(){
    console.log(this.recipeForm);
  }
}
