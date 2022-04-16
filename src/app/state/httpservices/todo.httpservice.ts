import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import ToDo from '../todo.model';
import {toDoListData} from 'src/assets/ToDoList.data';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return of(toDoListData);
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    debugger
    return this.httpclient.post<ToDo>('/create', JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
