import { signal } from "@angular/core";
import { ITodoModel } from "../models/ITodo.model";

export const TodosContext = signal<ITodoModel[]>([]);
export const TodoToEdit = signal<ITodoModel | undefined>(undefined);


export enum statusEnum {
   PENDIENTE = 'Pendiente',
   EN_PROGRESO = 'En progreso',
   COMPLETADO = 'Completado',
   CANCELADO = 'Cancelado'   
};
