import { TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, Store, } from '@ngxs/store';
import { Subject } from 'rxjs';
import { count, map, take, takeUntil } from 'rxjs/operators';

import { MarkAsSubmittedAction } from '../actions';
import { createFormGroupState } from '../state';
import { NgrxFormDirective } from './directive';

describe(NgrxFormDirective.name, () => {
  let directive: NgrxFormDirective<{}>;
  let store: Store;
  let actions$: Actions;
  const actionsFinished = new Subject<any>();
  const actionsFinish = () => actionsFinished.next('Finished');
  const FORM_GROUP_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = {};
  const INITIAL_STATE = createFormGroupState<{}>(FORM_GROUP_ID, INITIAL_FORM_CONTROL_VALUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
    });
  });

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
    directive = new NgrxFormDirective<{}>(store);
    directive.state = INITIAL_STATE;
    directive.ngOnInit();
  });

  it('should throw if state is not set when component is initialized', () => {
    directive = new NgrxFormDirective<{}>(store);
    expect(() => directive.ngOnInit()).toThrowError();
  });

  it('should throw while trying to emit actions if no store was provided', () => {
    directive = new NgrxFormDirective<{}>(null as any as Store);
    directive.state = INITIAL_STATE;
    directive.ngOnInit();
    expect(() => directive.onSubmit({ preventDefault: () => void 0 } as any)).toThrowError();
  });

  it(`should dispatch a ${MarkAsSubmittedAction.name} if the form is submitted and the state is unsubmitted`, done => {
    actions$.pipe(take(1), map(a => a.action)).subscribe(a => {
      expect(a).toEqual(new MarkAsSubmittedAction(INITIAL_STATE.id));
      done();
    });

    directive.onSubmit({ preventDefault: () => void 0 } as any);
  });

  it(`should not dispatch a ${MarkAsSubmittedAction.name} if the form is submitted and the state is submitted`, done => {
    actions$.pipe(takeUntil(actionsFinished), count()).subscribe(c => {
      expect(c).toEqual(0);
      done();
    });

    directive.state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
    directive.onSubmit({ preventDefault: () => void 0 } as any);
    actionsFinish();
  });
});
