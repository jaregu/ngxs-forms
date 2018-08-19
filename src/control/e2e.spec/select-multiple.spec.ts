import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, ofActionSuccessful } from '@ngxs/store';
import { first, map } from 'rxjs/operators';

import { MarkAsDirtyAction, SetValueAction } from '../../actions';
import { box, Boxed } from '../../boxing';
import { NgrxValueConverters } from '../../control/value-converter';
import { NgxsFormsModule } from '../../module';
import { createFormControlState, FormControlState } from '../../state';

const SELECT_OPTIONS = ['op1', 'op2'];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-multiple-test',
  template: `
  <select multiple [ngrxFormControlState]="state" [ngrxValueConverter]="valueConverter">
    <option *ngFor="let o of options" [value]="o">{{ o }}</option>
  </select>
  `,
})
export class SelectMultipleComponent {
  @Input() state: FormControlState<string>;
  options = SELECT_OPTIONS;
  valueConverter = NgrxValueConverters.objectToJSON;
}

describe(SelectMultipleComponent.name, () => {
  let component: SelectMultipleComponent;
  let fixture: ComponentFixture<SelectMultipleComponent>;
  let actions$: Actions;
  let element: HTMLSelectElement;
  let option1: HTMLOptionElement;
  let option2: HTMLOptionElement;
  const FORM_CONTROL_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = `["${SELECT_OPTIONS[1]}"]`;
  const INITIAL_STATE = createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsFormsModule, NgxsModule.forRoot()],
      declarations: [SelectMultipleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(SelectMultipleComponent);
    component = fixture.componentInstance;
    component.state = INITIAL_STATE;
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement as HTMLElement;
    element = nativeElement.querySelector('select')!;
    option1 = nativeElement.querySelectorAll('option')[0];
    option2 = nativeElement.querySelectorAll('option')[1];
  });

  it('should select the correct option initially', () => {
    expect(option2.selected).toBe(true);
  });

  it('should trigger a SetValueAction with the selected value when an option is selected', done => {
    actions$.pipe(first(), map(a => a.action)).subscribe(a => {
      expect(a.type).toBe(SetValueAction.type);
      expect((a as SetValueAction<string>).value).toBe(JSON.stringify(SELECT_OPTIONS));
      done();
    });

    option1.selected = true;
    element.dispatchEvent(new Event('change'));
  });

  it(`should trigger a ${MarkAsDirtyAction.name} when an option is selected`, done => {
    actions$.pipe(ofActionSuccessful(MarkAsDirtyAction)).subscribe(a => {
      expect(a.type).toBe(MarkAsDirtyAction.type);
      done();
    });

    option1.selected = true;
    element.dispatchEvent(new Event('change'));
  });
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-multiple-test',
  template: `
  <select multiple [ngrxFormControlState]="state">
    <option *ngFor="let o of options" [value]="o">{{ o }}</option>
  </select>
  `,
})
export class SelectMultipleWithoutConverterComponent {
  @Input() state: FormControlState<Boxed<string[]>>;
  options = SELECT_OPTIONS;
}

describe(SelectMultipleWithoutConverterComponent.name, () => {
  let component: SelectMultipleWithoutConverterComponent;
  let fixture: ComponentFixture<SelectMultipleWithoutConverterComponent>;
  let actions$: Actions;
  let element: HTMLSelectElement;
  let option1: HTMLOptionElement;
  let option2: HTMLOptionElement;
  const FORM_CONTROL_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = box([SELECT_OPTIONS[1]]);
  const INITIAL_STATE = createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsFormsModule, NgxsModule.forRoot()],
      declarations: [SelectMultipleWithoutConverterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(SelectMultipleWithoutConverterComponent);
    component = fixture.componentInstance;
    component.state = INITIAL_STATE;
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement as HTMLElement;
    element = nativeElement.querySelector('select')!;
    option1 = nativeElement.querySelectorAll('option')[0];
    option2 = nativeElement.querySelectorAll('option')[1];
  });

  it('should select the correct option initially', () => {
    expect(option2.selected).toBe(true);
  });

  it('should trigger a SetValueAction with the selected value when an option is selected', done => {
    actions$.pipe(first(), map(a => a.action)).subscribe(a => {
      expect(a.type).toBe(SetValueAction.type);
      expect((a as SetValueAction<Boxed<string[]>>).value).toEqual(box(SELECT_OPTIONS));
      done();
    });

    option1.selected = true;
    element.dispatchEvent(new Event('change'));
  });

  it(`should trigger a ${MarkAsDirtyAction.name} when an option is selected`, done => {
    actions$.pipe(ofActionSuccessful(MarkAsDirtyAction)).subscribe(a => {
      expect(a.type).toBe(MarkAsDirtyAction.type);
      done();
    });

    option1.selected = true;
    element.dispatchEvent(new Event('change'));
  });
});
