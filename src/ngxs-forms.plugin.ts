import { Injectable } from '@angular/core';
import { getActionTypeFromInstance, getValue, InitState, NgxsPlugin, setValue, UpdateState } from '@ngxs/store';

import { isNgrxFormsAction } from './actions';
import { formGroupReducer } from './group/reducer';

@Injectable()
export class NgxsFormsPlugin implements NgxsPlugin {

  private processedRootStates: { [s: string]: boolean } = {};
  private formIdToStateKey: { [s: string]: string } = {};

  handle(state: any, action: any, next: any) {
    let nextState = state;
    const type = getActionTypeFromInstance(action);

    switch (type) {
      case InitState.type:
      case UpdateState.type: {
        for (const rootStateName of Object.keys(state)) {
          if (!this.processedRootStates[rootStateName]) {
            this.processedRootStates[rootStateName] = true;
            this.findFormsIds(rootStateName, state[rootStateName]);
          }
        }
        break;
      }
      default: {
        if (isNgrxFormsAction(action)) {
          const formId = this.getFormId(action.controlId);
          const formStateKey = this.formIdToStateKey[formId];
          if (formStateKey) {
            const existingFormState = getValue(state, formStateKey);
            const updatedFormState = formGroupReducer(existingFormState, action);
            if (existingFormState !== updatedFormState) {
              nextState = setValue(nextState, formStateKey, updatedFormState);
            }
          } else {
            console.warn(`There is no ngxs-forms with id: ${formId} found in ngxs state!`);
          }
        }
        break;
      }
    }

    return next(nextState, action);
  }

  private findFormsIds(key: string, state: any) {
    if (this.isNgrxFormState(state)) {
      this.formIdToStateKey[state.id] = key;
    } else {
      if (state && typeof state === 'object') {
        for (const prop of Object.keys(state)) {
          this.findFormsIds(`${key}.${prop}`, state[prop]);
        }
      }
    }
  }

  private isNgrxFormState(form: any) {
    return form
      && (typeof form === 'object')
      && form.id && (typeof form.id === 'string')
      && form.hasOwnProperty('value')
      && form.hasOwnProperty('controls');
  }

  private getFormId(controlId: string): string {
    const indexOfPoint = controlId.indexOf('.');
    return indexOfPoint > 0 ? controlId.substr(0, indexOfPoint) : controlId;
  }
}
