import { Pipe, PipeTransform } from '@angular/core';
import { Documento } from '../../model/interfaces/documento.interface';

@Pipe({name: 'reduceDocuments'})
export class ReduceDocumentsPipe implements PipeTransform {
  transform(documentos: Documento[] = []): { nomes: string[]; links: string[] } {
    const nomes = documentos.reduce<string[]>((acc, cur) => [...acc, cur.nome], []);

    const links = documentos.reduce<string[]>((acc, cur) => [...acc, cur.url], []);

    return { nomes, links };
  }
}
