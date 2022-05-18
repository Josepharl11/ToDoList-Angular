/* tslint:disable */
/* eslint-disable */
import { Taskstate } from './taskstate';
export interface ToDoListItem {
  createdAt?: string;
  dueDate: string;
  id: string;
  state: Taskstate;
  title: string;
}
