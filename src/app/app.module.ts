import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {HeaderComponent} from './header/header.coomponent';

import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { AlertComponenr } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent,
    
    RecipeEditComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponenr,
    PlaceholderDirective
  ],
  imports: [
    RecipesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService, {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
