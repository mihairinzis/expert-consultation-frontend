import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormService} from "@app/shared/templates/form/form.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Observable} from "rxjs";
import {Document} from "@app/document/document-list-page/model/document";
import {DocumentDetailPageStore} from "@app/document/document-list-page/document-detail-page/document-detail-page-store.service";
import {RoutingService} from "@app/core/services/routing.service";
import {catchError, filter, take, tap} from "rxjs/operators";
import {DocumentBlock} from "@app/document/document-list-page/model/document-block";
import {CanLeave} from "@app/core/guards/can-leave-component.guard";

@Component({
  selector: 'ec-document-detail-page',
  templateUrl: './document-detail-page.component.html',
  providers: [DocumentDetailPageStore, FormService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailPageComponent implements OnInit, CanLeave {

  documentId: string | number | null;
  document$: Observable<Document>;

  form = this.formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    blocks: this.formBuilder.array([])
  });

  constructor(private documentDetailPageStore: DocumentDetailPageStore,
              public formService: FormService,
              private formBuilder: FormBuilder,
              private routingService: RoutingService) {
    this.formService.init(this.form);

    this.document$ = this.documentDetailPageStore.document$
      .pipe(
        tap(document => this.resetForm(document))
      );
  }

  ngOnInit(): void {
    this.documentId = this.routingService.getParam('documentId');
  }

  canLeave(): boolean | Observable<boolean> {
    return this.formService.confirmLeaveIfDirty();
  }

  saveDocument(): void {
    this.documentDetailPageStore.saveDocument(this.form.value)
      .pipe(
        take(1),
        catchError(err => this.formService.setError(err, new Document())),
        filter(doc => !this.documentId && !!doc.id),
        tap(doc => this.routingService.navigate(['/documents', doc.id])),
      ).subscribe();
  }

  resetForm(document: Document): void {
    this.formService.resetForm(document);
    this.blocks.clear();
    document.blocks.forEach(block => this.addBlock(block));
  }

  addBlock(block?: DocumentBlock) {
    this.blocks.push(this.formBuilder.group({
      id: [block?.id || ''],
      content: [block?.content || ''],
      index: [block?.index || this.blocks.length]
    }));
  }

  get blocks(): FormArray {
    return this.form.get('blocks') as FormArray;
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    enableToolbar: true,
    showToolbar: true,
    toolbarHiddenButtons: [
      [
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };
}
