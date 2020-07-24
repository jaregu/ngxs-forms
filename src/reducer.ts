import { formArrayReducer } from './array/reducer';
import { formControlReducer } from './control/reducer';
import { formGroupReducer } from './group/reducer';
import { 
	AbstractControlState, 
	FormControlState,
	FormArrayState,
	FormState, 
	isArrayState, 
	isFormState, 
	isGroupState } from './state';
import { Actions } from './actions';

export function formStateReducer<TValue>(
  state: FormState<TValue> | AbstractControlState<TValue> | undefined,
  action: any,
): FormState<TValue> {
  if (!state) {
    throw new Error('The form state must be defined!');
  }

  if (!isFormState(state)) {
    throw new Error(`state must be a form state, got ${state}`);
  }

  if (isGroupState(state)) {
    return formGroupReducer(state, action) as any;
  }

  if (isArrayState(state)) {
		const arrayState: FormArrayState<any> = state;
    return formArrayReducer(arrayState, action) as any;
  }

  return formControlReducer(state as FormControlState<any>, action) as any;
}

export interface ActionConstructor {
  new(...args: any[]): Actions<any>;
  readonly TYPE: string;
}

export type CreatedAction<TActionCons> = TActionCons extends new (...args: any[]) => infer TAction ? TAction : never;

