import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'todo-list', component: TodoListComponent, canActivate: [authGuard]},
    {path: 'todo-complete', component: TodoListComponent, canActivate: [authGuard]},
    {path: '**', redirectTo:'/login'}
];
