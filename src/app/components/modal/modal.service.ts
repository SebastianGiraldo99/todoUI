import { ComponentType } from "@angular/cdk/portal";
import { Component, inject, Injectable } from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import { ITodoModel } from "../../models/ITodo.model";


@Injectable({providedIn: 'root'})
export class ModalService{
    private readonly _dialog = inject(MatDialog);



    openModal<CT, T= ITodoModel>(componentRef: ComponentType<CT>, data?: T, isEditing: boolean = false){
        const config = {data, isEditing};
        this._dialog.open(componentRef, {
            data: config,
            width: '500px',
        });
    }

    closeModal():void{
        this._dialog.closeAll();
    }
}