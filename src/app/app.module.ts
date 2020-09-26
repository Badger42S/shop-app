import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {HeaderComponent} from './header/header.coomponent';
import { RecipesModule } from './recipes/recipes.module';
import {ShoppingListModule } from './shopping-list/shopping-list.module';
import {ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import {shoppingListReduxer } from './shopping-list/store/shopping-list.reducer';
import { authReducer } from './auth/store/auth.reducer';
import { AlertComponenr } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { AuthEffests } from './auth/auth.effects';
import * as fromApp from './store/app.reducer';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponenr,
    PlaceholderDirective
  ],
  imports: [
    RecipesModule,
    ShoppingListModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appreducer),
    EffectsModule.forRoot([AuthEffests]),
    StoreDevtoolsModule.instrument({logOnly:environment.production})
  ],
  providers: [ShoppingListService, RecipeService, {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
