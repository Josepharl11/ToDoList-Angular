/* tslint:disable */
/* eslint-disable */
export enum Taskstate {
  pending = 0,
  completed = 1,
  cancelled = 2,
}

export let Taskstatus: Taskstate;
Taskstatus = Taskstate.pending;
export const StateCompleted = Taskstate.completed;
export const StateCancelled = Taskstate.cancelled;
