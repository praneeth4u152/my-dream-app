import { API_URL } from './../../app.constants';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';



//const httpOptions = {
//  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//  withCredentials: true,
//  Authorization: 'Basic ' + window.btoa('pranu:pranu')
//};
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('pranu:pranu')
  })
};


@Injectable({
  providedIn: 'root'
})

export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username) {
    console.log(username);
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`,httpOptions);
    //console.log("Execute Hello World Bean Service")
  }

  deleteTodo(username, id){
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`,httpOptions);
  }

  retrieveTodo(username, id){
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`,httpOptions);
  }

  updateTodo(username, id, todo){
    return this.http.put(
          `${API_URL}/users/${username}/todos/${id}`
                , todo,httpOptions);
  }

  createTodo(username, todo){
    return this.http.post(
              `${API_URL}/users/${username}/todos`
                , todo,httpOptions);
  }

}
