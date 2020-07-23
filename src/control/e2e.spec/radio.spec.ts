import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, ofActionSuccessful } from '@ngxs/store';
import { bufferCount, map, take } from 'rxjs/operators';

import { MarkAsDirtyAction, SetValueAction } from '../../actions';
import { NgxsFormsModule } from '../../module';
import { createFormControlState, FormControlState } from '../../state';

const RADIO_OPTIONS = ['op1', 'op2'] as readonly string[];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'radio-test',
  template: '<input *ngFor="let o of options; trackBy: trackByIndex" type="radio" [value]="o" [ngrxFormControlState]="state" />',
})
export class RadioTestComponent {
  @Input() state: FormControlState<string>;
  options = RADIO_OPTIONS;
  trackByIndex = (index: number) => index;
}

describe(RadioTestComponent.name, () => {
  let component: RadioTestComponent;
  let fixture: ComponentFixture<RadioTestComponent>;
  let actions$: Actions;
  let element1: HTMLInputElement;
  let element2: HTMLInputElement;
  const FORM_CONTROL_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = RADIO_OPTIONS[1];
  const INITIAL_STATE = createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsFormsModule, NgxsModule.forRoot()],
      declarations: [RadioTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTestComponent);
    component = fixture.componentInstance;
    component.state = INITIAL_STATE;
    fixture.detectChanges();
    actions$ = TestBed.get(Actions);
    element1 = (fixture.nativeElement as HTMLElement).querySelectorAll('input')[0];
    element2 = (fixture.nativeElement as HTMLElement).querySelectorAll('input')[1];
  });

  it('should set the name of all elements to the ID of the state', () => {
    expect(element1.name).toBe(INITIAL_STATE.id);
    expect(element2.name).toBe(INITIAL_STATE.id);
  });

  it('should update the name of the elements if the state\'s ID changes', () => {
    const newId = 'new ID';
    component.state = { ...INITIAL_STATE, id: newId };
    fixture.detectChanges();
    expect(element1.name).toBe(newId);
    expect(element2.name).toBe(newId);
  });

  it('should not set the id of any element', () => {
    expect(element1.id).not.toBe(INITIAL_STATE.id);
    expect(element2.id).not.toBe(INITIAL_STATE.id);
  });

  it('should select the correct option initially', () => {
    expect(element2.checked).toBe(true);
  });

  it(`should trigger a ${SetValueAction.name} with the selected value when an option is selected`, done => {
    actions$.pipe(take(1), map(a => a.action)).subscribe(a => {
      expect(a.type).toBe(SetValueAction.type);
      expect((a as SetValueAction<string>).value).toBe(RADIO_OPTIONS[0]);
      done();
    });

    element1.click();
  });

  it(`should trigger a ${MarkAsDirtyAction.name} when an option is selected`, done => {
    actions$.pipe(ofActionSuccessful(MarkAsDirtyAction)).subscribe(a => {
      expect(a.type).toBe(MarkAsDirtyAction.type);
      done();
    });

    element1.click();
  });

  it(`should trigger ${SetValueAction.name}s and ${MarkAsDirtyAction.name}s when switching between options`, done => {
    actions$.pipe(ofActionSuccessful(SetValueAction, MarkAsDirtyAction), bufferCount(4), take(1)).subscribe(([a1, a2, a3, a4]) => {
      expect(a1.type).toBe(SetValueAction.type);
      expect(a2.type).toBe(MarkAsDirtyAction.type);
      expect(a3.type).toBe(SetValueAction.type);
      expect(a4.type).toBe(MarkAsDirtyAction.type);
      expect((a1 as SetValueAction<string>).value).toBe(RADIO_OPTIONS[0]);
      expect((a3 as SetValueAction<string>).value).toBe(RADIO_OPTIONS[1]);
      done();
    });

    element1.click();
    component.state = { ...component.state, value: RADIO_OPTIONS[0] };
    fixture.detectChanges();
    element2.click();
  });

  it(`should trigger a ${SetValueAction.name} if the value of the selected option changes`, done => {
    const newValue = 'new value';

    actions$.pipe(take(1), map(a => a.action)).subscribe(a => {
      expect(a.type).toBe(SetValueAction.type);
      expect((a as SetValueAction<string>).value).toBe(newValue);
      done();
    });

    component.options = [RADIO_OPTIONS[0], newValue];
    fixture.detectChanges();
  });

  it('should deselect other options when option is selected', () => {
    element1.click();
    expect(element2.checked).toBe(false);
  });
});
