import { InitState, UpdateState } from '@ngxs/store';

import { SetValueAction } from './actions';
import { NgxsFormsPlugin } from './ngxs-forms.plugin';
import { createFormGroupState } from './state';

interface TestFormModel {
  id: number;
  name: string;
}

describe(`NgxsFormsPlugin`, () => {
  let plugin: NgxsFormsPlugin;
  let next: any;
  let nextState: any;
  let nextAction: any;
  const TEST_FORM_ID = '[Some scope] Special form';
  const testFormState = createFormGroupState<TestFormModel>(TEST_FORM_ID,
    {
      id: 10,
      name: 'foobar',
    });
  const SECOND_TEST_FORM_ID = '[Second] Second form';
  const secondTestFormState = createFormGroupState<TestFormModel>(SECOND_TEST_FORM_ID,
    {
      id: 10,
      name: 'foobar',
    });

  beforeEach(function() {
    plugin = new NgxsFormsPlugin();
    next = (state: any, action: any) => {
      nextState = state;
      nextAction = action;
    };
  });

  it('should call next state with unknown action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = {};
    plugin.handle(someState, someAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(someAction);
  });

  it('should not change state if before is not called InitState or UpdateState', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new SetValueAction<number>(
      testFormState.controls.id.id,
      11
    );
    plugin.handle(someState, someAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(someAction);
  });

  it('should process InitState action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new InitState();
    plugin.handle(someState, someAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(someAction);
  });

  it('should process UpdateState action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new UpdateState();
    plugin.handle(someState, someAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(someAction);
  });

  it('should process InitState with UpdateState', () => {
    const someState = { state1: 'original state', form: testFormState };
    const initAction = new InitState();
    plugin.handle(someState, initAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(initAction);
    const updateAction = new InitState();
    plugin.handle(someState, updateAction, next);
    expect(nextState).toBe(someState);
    expect(nextAction).toBe(updateAction);
  });

  it('should change value after InitState action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new InitState();
    plugin.handle(someState, someAction, next);
    plugin.handle(someState, new SetValueAction<number>(
      testFormState.controls.id.id,
      11
    ), next);
    expect(nextState).not.toBe(someState);
    expect(nextState.form.controls.id.value).toBe(11);
  });

  it('should change value after UpdateState action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new UpdateState();
    plugin.handle(someState, someAction, next);
    plugin.handle(someState, new SetValueAction<number>(
      testFormState.controls.id.id,
      11
    ), next);
    expect(nextState).not.toBe(someState);
    expect(nextState.form.controls.id.value).toBe(11);
  });

  it('should not change state after same value action', () => {
    const someState = { state1: 'original state', form: testFormState };
    const someAction = new UpdateState();
    plugin.handle(someState, someAction, next);
    plugin.handle(someState, new SetValueAction<number>(
      testFormState.controls.id.id,
      10
    ), next);
    expect(nextState).toBe(someState);
  });

  it('should change value inside deep nested form', () => {
    const someState = { first: { second: { deep: { deeperForm: secondTestFormState } } }, form: testFormState };
    plugin.handle(someState, new InitState(), next);
    plugin.handle(someState, new SetValueAction<number>(
      secondTestFormState.controls.id.id,
      11
    ), next);
    expect(nextState).not.toBe(someState);
    expect(nextState.form.controls.id.value).toBe(10);
    expect(nextState.first.second.deep.deeperForm.controls.id.value).toBe(11);
  });

  it('should not change whole form value set value action', () => {
    const someState = { state1: 'original state', form: testFormState };
    plugin.handle(someState, new UpdateState(), next);
    plugin.handle(someState, new SetValueAction<TestFormModel>(
      testFormState.id,
      { id: 11, name: 'new' }
    ), next);
    expect(testFormState).not.toBe(nextState.form);
    expect(nextState.form.controls.id.value).toBe(11);
    expect(nextState.form.controls.name.value).toBe('new');
  });
});
