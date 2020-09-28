import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSubs:Subscription;
    isAuth=false;

    constructor(
        private dataSavingService:DataStorageService,
        private authService: AuthService, 
        private store:Store<fromApp.AppState>
    ){}
    
    ngOnInit(): void {
        this.userSubs= this.store.select('auth')
        .pipe(
            map(authState=>{
                return authState.user;
            })
        )
        .subscribe(
            user=>{
                this.isAuth=!!user;
            }
        );
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }

    onSaveRecipes(){
        this.dataSavingService.storeRecipe();
    }

    onFetchRecipes(){
        // this.dataSavingService.fetchRecipe().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }
}