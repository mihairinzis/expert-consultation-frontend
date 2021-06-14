import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ApplicationLayoutComponent} from '@components/application-layout/application-layout.component';
import {TopBarComponent} from '@components/application-layout/top-bar/top-bar.component';
import {PageComponent} from './templates/page/page.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import {FormComponent} from './templates/form/form.component';
import {FormFieldComponent} from './templates/form/form-field/form-field.component';
import {FormInputDirective} from './directives/form-input.directive';
import {SectionDirective} from "@app/shared/directives/section";
import {ButtonDirective} from "@app/shared/directives/button.directive";
import {DialogModule} from "@ngneat/dialog";
import {ConfirmDialogComponent} from "@components/confirm-dialog/confirm-dialog.component";
import {NgxEditorModule} from "ngx-editor";

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,
  BreadcrumbModule,
  NgxEditorModule,
  DialogModule
];

const declarations = [
  ApplicationLayoutComponent,
  TopBarComponent,
  PageComponent,
  FormComponent,
  FormFieldComponent,
  ConfirmDialogComponent
];

const directives = [
  FormInputDirective,
  SectionDirective,
  ButtonDirective
];

@NgModule({
  declarations: [declarations, directives],
  imports: [modules],
  exports: [modules, declarations, directives]
})
export class SharedModule { }
