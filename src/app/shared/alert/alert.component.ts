import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector:'app-component',
    templateUrl:'./alert/alert.component.html',
    styleUrls:['./alert/alert.component.css']
})
export class AlertComponenr{
    @Input() message:string;
    @Output() close= new EventEmitter<void>();

    onClosed(){
        this.close.emit();
    }
}