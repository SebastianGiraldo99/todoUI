import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ITodoModel } from '../../models/ITodo.model';
import {statusEnum, TodosContext } from '../../context/todo.context';
import { DatePipePipe } from "../../pipes/date-pipe.pipe";
import { ModalService } from '../modal/modal.service';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [DatePipePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  //Signals
  get tasks() {
    return TodosContext();
  }

  status = statusEnum;
  
  taskToEdit: ITodoModel | undefined;

  private readonly _dataApi = inject(DataApiService);
  private readonly _modalService = inject(ModalService);
  private readonly _activateRoute = inject(ActivatedRoute);


  

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    const actualRoute = this._activateRoute.snapshot.url[0].path;
    this._dataApi.getAllTasks().subscribe((tasks: ITodoModel[]) => {
      if( actualRoute === 'todo-list'){
        const valid_task = tasks.filter((task)=> task.isDeleted === false);
        return TodosContext.set(valid_task);
      };
      const completed_task = tasks.filter((task)=> task.status === this.status.COMPLETADO);
      return TodosContext.set(completed_task);

    });


    
  }

  deleteTask(idTodo: number) {
      Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar esta tarea?',
        icon: 'error',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText : 'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          this._dataApi.deleteTask(idTodo).subscribe((response)=>{
            if(response){
              TodosContext.update((tasks) => tasks.filter(t => t.idTodo !== idTodo));
            }
          });
        }
      });
    
  }
  editTask(task: ITodoModel) {
    this.taskToEdit = task;
    this._modalService.openModal<ModalComponent, ITodoModel>(ModalComponent, task)

  }

  createTask(){
    this._modalService.openModal<ModalComponent>(ModalComponent);
  }

  closeModal() {
    
  }
}
