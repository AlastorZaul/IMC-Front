import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from 'src/app/modeles/utils/custom-converters';
import { Remuneration } from 'src/app/modeles/remuneration.model';



// CLASSES DTO "DEMANDE"
@JsonObject('Demande')
export class Demande {
    @JsonProperty('id', Number, true)
    id: number = undefined;
    @JsonProperty('autresClauses', String, true)
    autresClauses: String = undefined;
    @JsonProperty('commentaire', String, true)
    commentaire: String = undefined;
    @JsonProperty('courrielContact', String, true)
    courrielContact: String = undefined;

    @JsonProperty('dateCloture', DateConverter, true)
    dateCloture: Date = undefined;
    @JsonProperty('dateCreation', DateConverter, true)
    dateCreation: Date = undefined;
    @JsonProperty('dateDecision', DateConverter, true)
    dateDecision: Date = undefined;
    @JsonProperty('dateDecisionImpression', DateConverter, true)
    dateDecisionImpression: Date = undefined;
    @JsonProperty('dateEnvisageeRupture', DateConverter, true)
    dateEnvisageeRupture: Date = undefined;
    @JsonProperty('dateFinDelaiInstruction', DateConverter, true)
    dateFinDelaiInstruction: Date = undefined;
    @JsonProperty('dateFinDelaiRetractation', DateConverter, true)
    dateFinDelaiRetractation: Date = undefined;
    @JsonProperty('dateImpression', DateConverter, true)
    dateImpression: Date = undefined;
    @JsonProperty('dateReception', DateConverter, true)
    dateReception: Date = undefined;
    @JsonProperty('dateSignature', DateConverter, true)
    dateSignature: Date = undefined;
    @JsonProperty('dateTeletransmission', DateConverter, true)
    dateTeletransmission: Date = undefined;
    @JsonProperty('dateTransfert', DateConverter, true)
    dateTransfert: Date = undefined;

    @JsonProperty('decisionMotifAutre', String, true)
    decisionMotifAutre: String = undefined;
    @JsonProperty('documentFormulaireDemande', String, true)
    documentFormulaireDemande: String = undefined;


    @JsonProperty('remuneration', Remuneration, true)
    remuneration: Remuneration = undefined;


    public constructor(init?: Partial<Demande>) {
        Object.assign(this, init);
        if (this.remuneration) {
            this.remuneration = new Remuneration(this.remuneration);
        }

    }


    /** @description: nettoyage de l'objet en vue d'une duplication */
    cleanPourDuplication() {
        // Infos de base

        // Remuneration
        this.remuneration.id = undefined;
        // Dates
        this.dateCloture = undefined;
        this.dateCreation = undefined;
        this.dateDecision = undefined;
        this.dateDecisionImpression = undefined;
        this.dateEnvisageeRupture = undefined;
        this.dateFinDelaiInstruction = undefined;
        this.dateFinDelaiRetractation = undefined;
        this.dateImpression = undefined;
        this.dateReception = undefined;
        this.dateSignature = undefined;
        this.dateTeletransmission = undefined;
        this.documentFormulaireDemande = undefined;
        this.dateTransfert = undefined;
        // Decision

    }
}
