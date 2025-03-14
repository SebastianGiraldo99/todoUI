import { signal } from "@angular/core";
import { ITodoModel } from "../models/ITodo.model";

export const TodosContext = signal<ITodoModel[]>([]);