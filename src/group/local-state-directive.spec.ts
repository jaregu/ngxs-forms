import { TestBed } from '@angular/core/testing';
import { Actions, NgxsModule } from '@ngxs/store';
import { Subject } from 'rxjs';
import { count, take, takeUntil } from 'rxjs/operators';

import { MarkAsSubmittedAction } from '../actions';
import { createFormGroupState } from '../state';
import { NgrxLocalFormDirective } from './local-state-directive';

describe(NgrxLocalFormDirective.name, () => {
  let directive: NgrxLocalFormDirective<{}>;
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
    directive = new NgrxLocalFormDirective<{}>();
    directive.state = INITIAL_STATE;
    directive.ngOnInit();
  });

  describe('local action emit', () => {
    it(`should not dispatch a ${MarkAsSubmittedAction.name} to the global store if the form is submitted and the state is unsubmitted`, done => {

			actions$.pipe(takeUntil(actionsFinished), count()).subscribe(c => {
        expect(c).toEqual(0);
        done();
      });

			directive.onSubmit({ preventDefault: () => void 0 } as any);
			actionsFinish();
    });

    it(`should dispatch a ${MarkAsSubmittedAction.name} to the event emitter if the form is submitted and the state is unsubmitted`, done => {
      directive.ngrxFormsAction.pipe(take(1)).subscribe(a => {
        expect(a).toEqual(new MarkAsSubmittedAction(INITIAL_STATE.id));
        done();
      });

      directive.onSubmit({ preventDefault: () => void 0 } as any);
    });

    it(`should not dispatch a ${MarkAsSubmittedAction.name} to the global store if the form is submitted and the state is submitted`, done => {
			actions$.pipe(takeUntil(actionsFinished), count()).subscribe(c => {
        expect(c).toEqual(0);
        done();
      });

      directive.state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      directive.onSubmit({ preventDefault: () => void 0 } as any);
      actionsFinish();
    });

    it(`should not dispatch a ${MarkAsSubmittedAction.name} to the event emitter if the form is submitted and the state is submitted`, done => {
      directive.ngrxFormsAction.pipe(count()).subscribe(c => {
        expect(c).toEqual(0);
        done();
      });

      directive.state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      directive.onSubmit({ preventDefault: () => void 0 } as any);
      directive.ngrxFormsAction.complete();
    });
  });
});
