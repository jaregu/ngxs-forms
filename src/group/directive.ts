import { Directive, HostListener, Inject, Input, OnInit, Optional } from '@angular/core';
import { Store } from '@ngxs/store';

import { Actions, MarkAsSubmittedAction } from '../actions';
import { FormGroupState } from '../state';

// this interface just exists to prevent a direct reference to
// `Event` in our code, which otherwise causes issues in NativeScript
// applications
interface CustomEvent extends Event { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'form:not([ngrxFormsAction])[ngrxFormState]',
})
export class NgrxFormDirective<TValue extends { [key: string]: any }> implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('ngrxFormState') state: FormGroupState<TValue>;

  constructor(
    @Optional() @Inject(Store) private store: Store | null
  ) {
    this.store = store;
  }

  protected dispatchAction(action: Actions<TValue>) {
    if (this.store !== null) {
      this.store.dispatch(action);
    } else {
      throw new Error('Store must be present in order to dispatch actions!');
    }
  }

  ngOnInit() {
    if (!this.state) {
      throw new Error('The form state must not be undefined!');
    }
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: CustomEvent) {
    event.preventDefault();
    if (this.state.isUnsubmitted) {
      this.dispatchAction(new MarkAsSubmittedAction(this.state.id));
    }
  }
}
