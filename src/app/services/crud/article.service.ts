import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { ROUTES_API } from 'src/app/constantes/routes-api';
import { Article } from '../../modeles/article.model';
import { BaseCrudService } from '../base-crud.service';
import { ConfigurationService } from '../configuration.service';
import { JsonConverterService } from '../json-converter.service';



@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(http: HttpClient, toasterService: ToasterService,
    jsonConverterService: JsonConverterService,
    configService: ConfigurationService ) {
    super(http, Article, toasterService, jsonConverterService, configService);
    this.url = this.url + ROUTES_API.SCHEMA_PARAMETRES + ROUTES_API.ARTICLE;
  }

  getFullArborescence(): Observable<Article | Error> {
    return this.getOne(this.url + '/arborescence');
  }
}
