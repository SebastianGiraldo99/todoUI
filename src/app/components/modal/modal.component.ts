import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITodoStatusModel } from '../../models/ITodo.status.model';
import { ModalService } from './modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataApiService } from '../../services/data-api.service';
import Swal from "sweetalert2";
import { TodosContext } from '../../context/todo.context';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styles : ''
})
export class ModalComponent implements OnInit {
  modalTitle: string = '';
  todo_status: ITodoStatusModel[]= [];
  Form: FormGroup = new FormGroup({
    idTodo: new FormControl(''),
    title: new FormControl('', Validators.required),
    description : new FormControl('',Validators.required),
    status: new FormControl('', Validators.required),
    createAt: new FormControl(''),
    updateAt: new FormControl(''),
  });
  isEdit: boolean | undefined;
  //Injections
  private readonly _dialog = inject(ModalService);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _dataService = inject(DataApiService);

  //Signals
  get tasks() { 
    return TodosContext();
  }
  
  ngOnInit(): void {
    this.createDataModel();
    this.loadData();

  }

  getTitle():string{
    return this._matDialog.data ? "Editar tarea": "Agregar tarea";
  }

  createDataModel(){
    this.todo_status = [
      {id: 1, name: 'Pendiente'},
      {id: 2, name: 'En progreso'},
      {id: 3, name: 'Completado'},
      {id: 4, name: 'Cancelado'},
    ];
  }

  loadData():void{
    const dataTask = this._matDialog.data;
    if(dataTask){
      this.Form.patchValue(dataTask);
      this.isEdit = true;
    }
  }

  editTask(){
    const data = this.Form.value;
    // console.log(this._matDialog.data);
    this._dataService.updateTask(data).subscribe((response)=>{
      if(response.idTodo > 0){
        Swal.fire({
          title: 'Actualizacion Exitosa',
          text: 'Registro actualizado con exito',
          icon: 'success',
        });
        TodosContext.update((tasks) =>
          tasks.map((t) => t.idTodo === response.idTodo ? response : t))
      }
      this.closeModal();
    });
  }

  createTask(){
    const data = this.Form.value;
    this._dataService.createTask(data).subscribe((response)=>{
      if(response.idTodo > 0){
        Swal.fire({
          title : 'Creación Exitosa',
          text: 'Registro Creado con exito',
          icon: 'success',
        });
        TodosContext.update((task) => [...task, data]);
      }
      this.closeModal();
    })

  }
  

  closeModal(){
    this._dialog.closeModal();
  }
}
