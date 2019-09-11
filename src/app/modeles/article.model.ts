import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Article')
export class Article {
    @JsonProperty('id', Number)
    id: number;
    @JsonProperty('code', String)
    code: string;
    @JsonProperty('contenu', String, true)
    contenu: string;
    @JsonProperty('titre', String)
    titre: string;
    @JsonProperty('afficherSommaire', Boolean, true)
    afficherSommaire: boolean;
    @JsonProperty('parent', Article, true)
    parent: Article;
    @JsonProperty('enfants', [Article], true)
    enfants: Article[];

    constructor() {
        this.id = undefined;
        this.code = undefined;
        this.titre = undefined;
        this.contenu = undefined;
        this.afficherSommaire = undefined;
        this.parent = undefined;
        this.enfants = undefined;
    }
}
