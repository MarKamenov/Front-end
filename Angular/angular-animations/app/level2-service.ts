import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { Level1Service } from './level1-service'
import { ApiService } from './api-service'
import 'rxjs/add/observable/of';

@Injectable()
export class Level2Service {
	constructor(private http: Http, private apiService: ApiService) { }

	_childrenData: any[] = null;

	public getLevel2Data(parent: string): Observable<any> {
		return this.apiService.request('level2Sites.json')
			.map(data => {
				this._childrenData = data.filter(childNodes => {
					return childNodes.contractId === parent
				})
				return this._childrenData
			})
		} 
	}

