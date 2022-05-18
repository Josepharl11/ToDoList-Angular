/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

import { PatchState } from '../models/patch-state';
import { PostItem } from '../models/post-item';
import { ToDoListItem } from '../models/to-do-list-item';
import { environment } from 'src/environments/environment';
import { Taskstate } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Type-content': 'application/json',
    }),
  };

  myAppUrl: string = `${environment.apiUrl}/ToDoList`;
  constructor(private http: HttpClient) {}

  apiGetToDoList() {
    return this.http.get(this.myAppUrl);
  }

  apiPostToDoList(toDoListItem: ToDoListItem): Observable<ToDoListItem> {
    return this.http.post<ToDoListItem>(this.myAppUrl, toDoListItem);
  }

  apiPatchToDoList(
    toDoListItem: ToDoListItem,
    _state: Taskstate
  ): Observable<ToDoListItem> {
    return this.http.patch<ToDoListItem>(
      `${this.myAppUrl}/${toDoListItem.id}`,
      {
        state: _state,
      }
    );
  }

  apiGetToDoListTable() {
    return this.http.get(this.myAppUrl);
  }
}
