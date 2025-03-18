import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ITodoModel } from '../models/ITodo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private baseURl: string = 'http://api-todorecords.somee.com/api/';

  private readonly _http = inject(HttpClient);



  getAllTasks():Observable<ITodoModel[]>{
    return this._http.get<ITodoModel[]>(this.baseURl+`TodoRecords`).pipe(
      catchError(this.handleError)
    );
  }

  getTaskById(id: number):Observable<ITodoModel>{
    return this._http.get<ITodoModel>(this.baseURl+`TodoRecords/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: ITodoModel):Observable<ITodoModel>{
    return this._http.post<ITodoModel>(this.baseURl+`TodoRecords`, task ).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(task: ITodoModel):Observable<ITodoModel>{
    return this._http.put<ITodoModel>(this.baseURl+`TodoRecords/${task.idTodo}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number):Observable<ITodoModel>{
    return this._http.delete<ITodoModel>(this.baseURl+`TodoRecords/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log('Un error ocurrio en el cliente:', error.error.message);
    }
    else{
      console.log(`Un error ocurrio en el servidor: (${error.status})`, error.message);
    }
    return throwError(()=> new Error('Hubo un error inesperado.'));
  }

}
