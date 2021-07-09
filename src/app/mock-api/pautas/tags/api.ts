import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { Tag } from 'app/modules/acervo/acoes/agrupar-emlista/agrupar-emlista.component';

@Injectable({
    providedIn: 'root'
})
export class TagMockApi {
    private _tag: Tag[] = tagData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._tag = tagData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('tags')
            .reply(() => {
                return [200, this._tag];
            });

        this._fuseMockApiService
            .onPost('tags')
            .reply(({request}) => {
                const novaTag = request.body;
                novaTag.id = FuseMockApiUtils.guid();
                this._tag.push(novaTag);

                return [200, novaTag];
            });

        this._fuseMockApiService
            .onPut('tags/:id')
            .reply(({request, urlParams}) => {
                const id = Number(urlParams.id);
                const novaTag: Tag = request.body;
                
                this._tag.forEach(tag => {
                    if (tag.id === id) {
                        tag.descricao = novaTag.descricao;
                        tag.publica = novaTag.publica;
                    }
                });
                
                const tag = this._tag.find(tag => tag.id === id);
                return [200, tag];
            });
    }
}
