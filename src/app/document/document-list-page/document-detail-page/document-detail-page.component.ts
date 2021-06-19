import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "@app/shared/templates/form/form.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Document} from "@app/document/document-list-page/model/document";
import {DocumentDetailPageStore} from "@app/document/document-list-page/document-detail-page/document-detail-page-store.service";
import {RoutingService} from "@app/core/services/routing.service";
import {catchError, filter, take, tap} from "rxjs/operators";
import {DocumentBlock} from "@app/document/document-list-page/model/document-block";
import {CanLeave} from "@app/core/guards/can-leave-component.guard";
import {Editor, Toolbar} from "ngx-editor";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'ec-document-detail-page',
  templateUrl: './document-detail-page.component.html',
  providers: [DocumentDetailPageStore, FormService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailPageComponent implements OnInit, OnDestroy, CanLeave {

  documentId: string | number | null;
  document$: Observable<Document>;
  editableBlockIndex: number;
  editor: Editor = new Editor({history: true});
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    [{heading: ['h1', 'h2', 'h3', 'h4']}],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = this.formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    blocks: this.formBuilder.array([])
  });

  constructor(private documentDetailPageStore: DocumentDetailPageStore,
              public formService: FormService,
              private formBuilder: FormBuilder,
              private routingService: RoutingService,
              private sanitizer: DomSanitizer) {
    this.formService.init(this.form);

    this.document$ = this.documentDetailPageStore.document$
      .pipe(
        tap(document => this.resetForm(document))
      );
  }

  ngOnInit(): void {
    this.documentId = this.routingService.getParam('documentId');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    this.editableBlockIndex = -1;
    this.blocks.clear();
    if (document.blocks?.length) {
      document.blocks.forEach(block => this.addBlock(block));
    } else {
      this.addBlock();
    }
  }

  addBlock(block?: DocumentBlock): void {
    this.blocks.push(this.formBuilder.group({
      id: [block?.id || ''],
      content: [block?.content || '<p></p>'],
      index: [block?.index || this.blocks.length]
    }));
    this.editableBlockIndex = this.blocks.length - 1;
  }

  blockContentChanged(blockIndex: number, content: string): void {
    this.blocks.at(blockIndex)?.get('content')?.patchValue(content);
  }

  safeBlockContent(blockIndex: number): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.blockContent(blockIndex).replaceAll('<p></p>', '<p>&nbsp;</p>')
    );
  }

  blockContent(blockIndex: number): string {
    return this.blocks.at(blockIndex)?.get('content')?.value;
  }

  removeBlock(blockIndex: number): void {
    this.blocks.removeAt(blockIndex);
    if (this.editableBlockIndex > this.blocks.length - 1) {
      this.editableBlockIndex = this.blocks.length - 1;
    }
  }

  get blocks(): FormArray {
    return this.form.get('blocks') as FormArray;
  }
}
