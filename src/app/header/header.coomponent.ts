import {Component, EventEmitter, Output} from '@angular/core';

import {DataStorageService} from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    constructor(private dataSavingService:DataStorageService){}

    onSaveRecipes(){
        this.dataSavingService.storeRecipe();
    }

    onFetchRecipes(){
        this.dataSavingService.fetchRecipe().subscribe();
    }
}