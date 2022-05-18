import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Taskstate } from 'src/app/api/models/taskstate';
import { ToDoListService } from '../api/services';
import { ToDoListItem } from 'src/app/api/models/to-do-list-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
})
export class TaskComponentComponent {
  public toDoList: any = [];
  index: any = [];
  constructor(private fb: FormBuilder, private api: ToDoListService) {
    this.getData();
    this.getTable();
  }
  ToDoList = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(5),
      this.space,
    ]),
    dueDate: new FormControl(this.formatDate(new Date()), Validators.required),
    state: new FormControl(Taskstate.pending),
  });

  public table: Array<any> = [];

  getData() {
    this.api.apiGetToDoList().subscribe({
      next: (res: any) => {
        this.toDoList = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getTable() {
    this.api.apiGetToDoListTable().subscribe((tableresult: any) => {
      this.table = tableresult;
    });
  }

  onSum() {
    let { dueDate, id, title, state } = this.ToDoList.value;
    const toDoListItem: ToDoListItem = {
      dueDate,
      id,
      title,
      state,
    };

    if (this.formatDate(new Date()) <= toDoListItem.dueDate) {
      if (this.toDoList.length === 0) {
        this.toDoList = [toDoListItem];
      } else if (
        this.toDoList.filter((data: any) => data.title === toDoListItem.title)
          .length > 0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot insert the same task name!',
        });
      } else if (
        this.toDoList.filter(
          (data: any) => data.title.toUpperCase() === this.ToDoList.value.title
        ).length > 0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot insert the same task name!',
        });
      } else {
        this.toDoList = [...this.toDoList, toDoListItem];
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Can't enter past dates",
      });
    }
    this.api.apiPostToDoList(toDoListItem).subscribe((response) => {
      toDoListItem.id = response.id;
      this.getData();
    });
  }
  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get title() {
    return this.ToDoList.get('task');
  }
  get dueDate() {
    return this.ToDoList.get('dueDate');
  }
  get state() {
    return this.ToDoList.get('state');
  }

  public space(control: FormControl) {
    let isSpaceTrue = (control.value || '').trim().length === 0;
    let isValidTrue = !isSpaceTrue;
    return isValidTrue ? null : { whitespace: true };
  }

  UpdateData(param: ToDoListItem, index: number, state: Taskstate) {
    this.toDoList.splice(index, 1, {
      title: param.title,
      dueDate: param.dueDate,
      state: state,
      id: param.id,
      clicked: true,
    });
    this.api.apiPatchToDoList(param, state).subscribe();
  }

  stateText(value: number) {
    switch (value) {
      case 0:
        return 'Pending';
      case 1:
        return 'Completed';
      case 2:
        return 'Cancelled';
    }
    return 'No State';
  }
}
