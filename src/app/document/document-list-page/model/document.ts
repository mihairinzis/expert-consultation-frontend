import {DocumentBlock} from "@app/document/document-list-page/model/document-block";

export class Document {
  id: string;
  title: string;
  blocks: DocumentBlock[];
}
