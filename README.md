# ngxs-forms

[![npm version](https://badge.fury.io/js/ngxs-forms.svg)](https://www.npmjs.com/package/ngxs-forms)
[![Build Status](https://travis-ci.org/jaregu/ngxs-forms.svg?branch=master)](https://travis-ci.org/jaregu/ngxs-forms)
[![codecov](https://codecov.io/gh/jaregu/ngxs-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/jaregu/ngxs-forms)
[![license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
<!-- 
[![Docs](https://readthedocs.org/projects/ngrx-forms/badge/?version=master)](http://ngrx-forms.readthedocs.io/en/master/?badge=master)
 -->

This is fork of the best forms implementation for redux style stores. Original **ngrx-forms** uses `@ngrx/store`, this fork is updated to be used with **@ngxs/store** store.

#### Installation
```bash
npm install ngxs-forms --save

# or if you are using yarn
yarn add ngxs-forms
```

This library has a peer dependency on `@angular/core`, `@angular/common`, `@angular/forms`, and `@ngxs/store`, so make sure appropriate versions of those packages are installed.

#### Quick start

Add NgxsFormsModule.forRoot() to root app module
```typescript

import { NgxsFormsModule } from 'ngxs-forms';
// ...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // ...
    NgxsFormsModule.forRoot()
  ],
  // ...
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Define NGXS state
```typescript
import { FormGroupState, createFormGroupState } from 'ngxs-forms';

// ...

interface FormModel {
  id: number;
  name: string;
  
  // ...
}

interface StateModel {
  loading: boolean;
  specialForm: FormGroupState<FormModel>;
  
  //...
}

const initialModelState: FormModel = {
  id: null,
  name: '',
  
  // ...
}

const SOME_FORM_ID = '[Some scope] Special form';
const initialSpecialFormState = createFormGroupState<FormModel>(SOME_FORM_ID, initialModelState);

const initialState: StateModel = {
  loading: false,
  specialForm: initialSpecialFormState
};

@State<StateModel>({
  name: 'someSpecialState',
  defaults: initialState
})
@Injectable()
export class SpecialState {
  
  // ...
}
```

Add NgxsFormsModule in feature module and use state in component (no special reducers needed)
```typescript

// ...
@NgModule({
  declarations: [
    SomeComponent
  ],
  imports: [
    // ...
    NgxsFormsModule
  ],
})
export class SomeFeatureModule { }

// ...
@Component({
  selector: 'app-special',
  template: `
  <form novalidate [ngrxFormState]="(specialState$ | async).specialForm">
    <input type="text" [ngrxFormControlState]="(specialState$ | async).specialForm.controls.name"></input>
  </form>`,
})
export class SomeComponent implements OnInit {

  @Select(SpecialState) specialState$: Observable<StateModel>;

```

#### Documentation
Learn more about **ngrx-forms** at [github](https://github.com/MrWolfZ/ngrx-forms)
or [official ngrx-forms documentation](http://ngrx-forms.readthedocs.io/en/master)
or visit the [example application](https://ngrx-forms-example-app-v2.herokuapp.com/).

Learn more about **@ngxs/store** store at [github](https://github.com/ngxs/store) or visit [homepage](http://ngxs.io).

#### License
Everything in this repository is [licensed under the MIT License](LICENSE) unless otherwise specified.

Original work Copyright (c) 2017-present Jonathan Ziller

Modified work Copyright 2018-present Mārcis Meijers
