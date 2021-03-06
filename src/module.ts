import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';

import { NgrxFormControlDirective } from './control/directive';
import { NgrxLocalFormControlDirective } from './control/local-state-directive';
import { NgrxFormDirective } from './group/directive';
import { NgxsFormsPlugin } from './ngxs-forms.plugin';
import { NgrxLocalFormDirective } from './group/local-state-directive';
import { NgrxStatusCssClassesDirective } from './status-css-classes.directive';
import { NgrxCheckboxViewAdapter } from './view-adapter/checkbox';
import { NgrxDefaultViewAdapter } from './view-adapter/default';
import { NgrxNumberViewAdapter } from './view-adapter/number';
import { NgrxFallbackSelectOption } from './view-adapter/option';
import { NgrxRadioViewAdapter } from './view-adapter/radio';
import { NgrxRangeViewAdapter } from './view-adapter/range';
import { NgrxSelectOption, NgrxSelectViewAdapter } from './view-adapter/select';
import { NgrxSelectMultipleOption, NgrxSelectMultipleViewAdapter } from './view-adapter/select-multiple';

const exportsAndDeclarations = [
  NgrxFormControlDirective,
  NgrxLocalFormControlDirective,
  NgrxFormDirective,
  NgrxLocalFormDirective,
  NgrxCheckboxViewAdapter,
  NgrxDefaultViewAdapter,
  NgrxNumberViewAdapter,
  NgrxRadioViewAdapter,
  NgrxRangeViewAdapter,
  NgrxSelectMultipleOption,
  NgrxSelectMultipleViewAdapter,
  NgrxSelectOption,
  NgrxSelectViewAdapter,
  NgrxFallbackSelectOption,
  NgrxStatusCssClassesDirective,
];

@NgModule({
  declarations: exportsAndDeclarations,
  exports: exportsAndDeclarations,
})
export class NgxsFormsModule {

  static forRoot(): ModuleWithProviders<NgxsFormsModule> {
    return {
      ngModule: NgxsFormsModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxsFormsPlugin,
          multi: true,
        },
      ],
    };
  }
}
