import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api-service'
import 'rxjs/add/observable/of';

@Injectable()
export class FilterService {
	constructor(private http: Http, private apiService: ApiService) { }
	_breachesData: any[] = null;

	public getFilteredData(params: { level?: number, contractId?: string, siteId?: string, breachType?: number }): Observable<any> {
		return this.apiService.request('data.json', params)
			.map(data => {
			if(params.level === 1){
				if (params.breachType === null) {
					return this._breachesData = data.filter(breach => {
						return breach.contractId === params.contractId
					})
				} else {
					return this._breachesData = data.filter(breach => {
						return breach.contractId === params.contractId && breach.breachType === params.breachType

					})
				}
			}
			if(params.level === 2){
				if(params.breachType === null){
						return this._breachesData = data.filter(breach => {
						return breach.siteId === params.siteId &&
						breach.contractId === params.contractId
					})
				}
				else{
					return this._breachesData = data.filter(breach => {
						return breach.contractId === params.contractId && breach.siteId === params.siteId && breach.breachType === params.breachType
					})
				}
			}
		})
	}
}

