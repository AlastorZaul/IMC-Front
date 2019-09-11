import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Homologation')
export class Homologation {
    @JsonProperty('id', Number, true)
    id: number = undefined;
    @JsonProperty('employeur', String)
    actif: string = undefined;
    @JsonProperty('statut', String)
    code: string = undefined;
 

    public constructor(init?: Partial<Homologation>) {
        Object.assign(this, init);
    }
}