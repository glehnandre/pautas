import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { tags as tagData } from 'app/mock-api/pautas/tags/data';
import { Tag } from 'app/modules/acervo/model/interfaces/tag.interface';

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

        this._fuseMockApiService
            .onDelete('tags/:id')
            .reply(({urlParams}) => {
                let id: number = 0;

                if (urlParams.id) {
                    id = +urlParams.id;
                } else {
                    return [400, {
                        message: 'Parâmetros incorretos para a ação',
                    }];
                }

                const index = this._tag
                    .findIndex(tag => tag.id === id);

                if (index !== -1) {
                    this._tag.splice(index, 1);
                    return [201, {
                        message: 'Sucesso!',
                    }];
                } else {
                    return [404, {
                        message: 'Tag não encontrada',
                    }];
                }
            });
    }
}
