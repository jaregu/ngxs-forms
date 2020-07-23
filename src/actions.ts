import { KeyValue, NgrxFormControlId, ValidationErrors } from './state';

// NOTE: the explicit type declaration for the `TYPE` properties is required
// for the output declarations to properly use the literal string type instead
// of just `string`

export class SetValueAction<TValue> {
  static readonly type: 'ngrx/forms/SET_VALUE' = 'ngrx/forms/SET_VALUE';
  readonly type = SetValueAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly value: TValue,
  ) { }
}

export class SetErrorsAction {
  static readonly type: 'ngrx/forms/SET_ERRORS' = 'ngrx/forms/SET_ERRORS';
  readonly type = SetErrorsAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly errors: ValidationErrors,
  ) { }
}

export class SetAsyncErrorAction {
  static readonly type: 'ngrx/forms/SET_ASYNC_ERROR' = 'ngrx/forms/SET_ASYNC_ERROR';
  readonly type = SetAsyncErrorAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
    public readonly value: any,
  ) { }
}

export class ClearAsyncErrorAction {
  static readonly type: 'ngrx/forms/CLEAR_ASYNC_ERROR' = 'ngrx/forms/CLEAR_ASYNC_ERROR';
  readonly type = ClearAsyncErrorAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
  ) { }
}

export class StartAsyncValidationAction {
  static readonly type: 'ngrx/forms/START_ASYNC_VALIDATION' = 'ngrx/forms/START_ASYNC_VALIDATION';
  readonly type = StartAsyncValidationAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
  ) { }
}

export class MarkAsDirtyAction {
  static readonly type: 'ngrx/forms/MARK_AS_DIRTY' = 'ngrx/forms/MARK_AS_DIRTY';
  readonly type = MarkAsDirtyAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class MarkAsPristineAction {
  static readonly type: 'ngrx/forms/MARK_AS_PRISTINE' = 'ngrx/forms/MARK_AS_PRISTINE';
  readonly type = MarkAsPristineAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class EnableAction {
  static readonly type: 'ngrx/forms/ENABLE' = 'ngrx/forms/ENABLE';
  readonly type = EnableAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class DisableAction {
  static readonly type: 'ngrx/forms/DISABLE' = 'ngrx/forms/DISABLE';
  readonly type = DisableAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class MarkAsTouchedAction {
  static readonly type: 'ngrx/forms/MARK_AS_TOUCHED' = 'ngrx/forms/MARK_AS_TOUCHED';
  readonly type = MarkAsTouchedAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class MarkAsUntouchedAction {
  static readonly type: 'ngrx/forms/MARK_AS_UNTOUCHED' = 'ngrx/forms/MARK_AS_UNTOUCHED';
  readonly type = MarkAsUntouchedAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class FocusAction {
  static readonly type: 'ngrx/forms/FOCUS' = 'ngrx/forms/FOCUS';
  readonly type = FocusAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class UnfocusAction {
  static readonly type: 'ngrx/forms/UNFOCUS' = 'ngrx/forms/UNFOCUS';
  readonly type = UnfocusAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class MarkAsSubmittedAction {
  static readonly type: 'ngrx/forms/MARK_AS_SUBMITTED' = 'ngrx/forms/MARK_AS_SUBMITTED';
  readonly type = MarkAsSubmittedAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class MarkAsUnsubmittedAction {
  static readonly type: 'ngrx/forms/MARK_AS_UNSUBMITTED' = 'ngrx/forms/MARK_AS_UNSUBMITTED';
  readonly type = MarkAsUnsubmittedAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export class AddArrayControlAction<TValue> {
  static readonly type: 'ngrx/forms/ADD_ARRAY_CONTROL' = 'ngrx/forms/ADD_ARRAY_CONTROL';
  readonly type = AddArrayControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly value: TValue,
    public readonly index?: number,
  ) { }
}

export class AddGroupControlAction<TValue extends KeyValue, TControlKey extends keyof TValue = keyof TValue> {
  static readonly type: 'ngrx/forms/ADD_GROUP_CONTROL' = 'ngrx/forms/ADD_GROUP_CONTROL';
  readonly type = AddGroupControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: keyof TValue,
    public readonly value: TValue[TControlKey],
  ) { }
}

export class RemoveArrayControlAction {
  static readonly type: 'ngrx/forms/REMOVE_ARRAY_CONTROL' = 'ngrx/forms/REMOVE_ARRAY_CONTROL';
  readonly type = RemoveArrayControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly index: number,
  ) { }
}

export class SwapArrayControlAction {
  static readonly type: 'ngrx/forms/SWAP_ARRAY_CONTROL' = 'ngrx/forms/SWAP_ARRAY_CONTROL';
  readonly type = SwapArrayControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly fromIndex: number,
    public readonly toIndex: number
  ) { }
}

export class MoveArrayControlAction {
  static readonly type: 'ngrx/forms/MOVE_ARRAY_CONTROL' = 'ngrx/forms/MOVE_ARRAY_CONTROL';
  readonly type = MoveArrayControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly fromIndex: number,
    public readonly toIndex: number
  ) { }
}

export class RemoveGroupControlAction<TValue> {
  static readonly type: 'ngrx/forms/REMOVE_CONTROL' = 'ngrx/forms/REMOVE_CONTROL';
  readonly type = RemoveGroupControlAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: keyof TValue,
  ) { }
}

export class SetUserDefinedPropertyAction {
  static readonly type: 'ngrx/forms/SET_USER_DEFINED_PROPERTY' = 'ngrx/forms/SET_USER_DEFINED_PROPERTY';
  readonly type = SetUserDefinedPropertyAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
    public readonly name: string,
    public readonly value: any,
  ) { }
}

export class ResetAction {
  static readonly type: 'ngrx/forms/RESET' = 'ngrx/forms/RESET';
  readonly type = ResetAction.type;

  constructor(
    public readonly controlId: NgrxFormControlId,
  ) { }
}

export type Actions<TValue> =
  | SetValueAction<TValue>
  | SetErrorsAction
  | SetAsyncErrorAction
  | ClearAsyncErrorAction
  | StartAsyncValidationAction
  | MarkAsDirtyAction
  | MarkAsPristineAction
  | EnableAction
  | DisableAction
  | MarkAsTouchedAction
  | MarkAsUntouchedAction
  | FocusAction
  | UnfocusAction
  | MarkAsSubmittedAction
  | MarkAsUnsubmittedAction
  | AddGroupControlAction<TValue>
  | RemoveGroupControlAction<TValue>
  | AddArrayControlAction<any>
  | RemoveArrayControlAction
  | SetUserDefinedPropertyAction
  | ResetAction
  | SwapArrayControlAction
  | MoveArrayControlAction
  ;

export function isNgrxFormsAction(action: any) {
  return !!action.type && action.type.startsWith('ngrx/forms/');
}

export const ALL_NGRX_FORMS_ACTION_TYPES: Actions<any>['type'][] = [
  SetValueAction.type,
  SetErrorsAction.type,
  SetAsyncErrorAction.type,
  ClearAsyncErrorAction.type,
  StartAsyncValidationAction.type,
  MarkAsDirtyAction.type,
  MarkAsPristineAction.type,
  EnableAction.type,
  DisableAction.type,
  MarkAsTouchedAction.type,
  MarkAsUntouchedAction.type,
  FocusAction.type,
  UnfocusAction.type,
  MarkAsSubmittedAction.type,
  MarkAsUnsubmittedAction.type,
  AddGroupControlAction.type,
  RemoveGroupControlAction.type,
  AddArrayControlAction.type,
  RemoveArrayControlAction.type,
  SetUserDefinedPropertyAction.type,
  ResetAction.type,
  SwapArrayControlAction.type,
  MoveArrayControlAction.type,
];
