import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


@Injectable()
export class ApiService {
	constructor(private http: Http
	) { }
	private get apiBaseUrl() {
		var myUrl = './app/data/'
		return myUrl;
	}
	private handleError(error: any) {
		console.log(error);
		return Observable.throw(error.json());
	}
	public request(url, params = {}): Observable<any> {
		return this.http.get(this.apiBaseUrl + url, params = {})
			.map((response: Response) => {
				const data = response.json();
					return data;
				}).catch(this.handleError)
	}
}