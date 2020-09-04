import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailRecipe:Recipe;
  id:number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
      private router:Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.detailRecipe=this.recipeService.getRecipe(this.id);
        }
      )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.detailRecipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}
