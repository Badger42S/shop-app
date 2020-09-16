import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import {DataStorageService} from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSubs:Subscription;
    isAuth=false;

    constructor(private dataSavingService:DataStorageService, private authService: AuthService){}
    
    ngOnInit(): void {
        this.userSubs= this.authService.userSubject.subscribe(
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
        this.dataSavingService.fetchRecipe().subscribe();
    }
}