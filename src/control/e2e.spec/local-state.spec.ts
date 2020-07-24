import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions, NgxsModule } from '@ngxs/store';
import { Subject } from 'rxjs';
import { count, takeUntil } from 'rxjs/operators';

import { MarkAsDirtyAction } from '../../actions';
import { createFormControlState, FormControlState } from '../../state';
import { NgxsFormsModule } from 'src/module';

const SELECT_NUMBER_OPTIONS = [1, 2];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-test',
  template: `
  <select [ngrxFormControlState]="state" (ngrxFormsAction)="handleAction($event)">
    <option *ngFor="let o of options" [value]="o">{{ o }}</option>
  </select>`,
})
export class NumberSelectComponentLocalStateComponent {
  @Input() state: FormControlState<number>;
  options = SELECT_NUMBER_OPTIONS;

  action: any | null = null;
  handleAction(actionParam: any) {
    this.action = actionParam;
  }
}

describe(NumberSelectComponentLocalStateComponent.name, () => {
  let component: NumberSelectComponentLocalStateComponent;
  let fixture: ComponentFixture<NumberSelectComponentLocalStateComponent>;
  let actions$: Actions;
	let element: HTMLSelectElement;
	const actionsFinished = new Subject<any>();
  const actionsFinish = () => actionsFinished.next('Finished');
  const FORM_CONTROL_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = SELECT_NUMBER_OPTIONS[1];
  const INITIAL_STATE = createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

	beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
    });
	});

  beforeEach(async(() => {
		TestBed.configureTestingModule({
      imports: [NgxsFormsModule],
      declarations: [NumberSelectComponentLocalStateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
		fixture = TestBed.createComponent(NumberSelectComponentLocalStateComponent);
		actions$ = TestBed.get(Actions);
    component = fixture.componentInstance;
    component.state = INITIAL_STATE;
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement as HTMLElement;
    element = nativeElement.querySelector('select')!;
  });

  it(`should not trigger a ${MarkAsDirtyAction.name} to the global store when an option is selected`, done => {

		actions$.pipe(takeUntil(actionsFinished), count()).subscribe(c => {
			expect(c).toEqual(0);
			done();
		});

    element.selectedIndex = 0;
    element.dispatchEvent(new Event('change'));
    actionsFinish();
  });

  it(`should trigger a ${MarkAsDirtyAction.name} to the event emitter when an option is selected`, () => {
    element.selectedIndex = 0;
    element.dispatchEvent(new Event('change'));

    expect(component.action).toBeTruthy();
    expect(component.action!.type).toBe(MarkAsDirtyAction.type);
  });
});
