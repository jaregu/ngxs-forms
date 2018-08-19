import { MarkAsTouchedAction } from './actions';
import { formStateReducer } from './reducer';
import { FORM_CONTROL_ID, FORM_CONTROL_INNER5_ID, FORM_CONTROL_INNER_ID, FormGroupValue, INITIAL_STATE } from './update-function/test-util';

describe(formStateReducer.name, () => {
  it('should apply the action to controls', () => {
    const resultState = formStateReducer<FormGroupValue['inner']>(INITIAL_STATE.controls.inner, new MarkAsTouchedAction(FORM_CONTROL_INNER_ID));
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner);
  });

  it('should apply the action to groups', () => {
    const resultState = formStateReducer<FormGroupValue>(INITIAL_STATE, new MarkAsTouchedAction(FORM_CONTROL_ID));
    expect(resultState).not.toBe(INITIAL_STATE);
  });

  it('should apply the action to arrays', () => {
    const resultState = formStateReducer<FormGroupValue['inner5']>(INITIAL_STATE.controls.inner5, new MarkAsTouchedAction(FORM_CONTROL_INNER5_ID));
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner5);
  });

  it('should throw if state is undefined', () => {
    expect(() => formStateReducer(undefined, { type: '' })).toThrowError();
  });

  it('should throw if state is not a form state', () => {
    expect(() => formStateReducer({} as any, { type: '' })).toThrowError();
  });
});
