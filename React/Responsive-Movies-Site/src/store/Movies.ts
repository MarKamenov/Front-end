import { observable, action } from 'mobx';
import * as ApiService from '../services/apiServices'
import { IMovieResponse } from '../types'

export default class MoviesStore {
	@observable public list:IMovieResponse[] = [];
	@observable public total:number;

	public init() {
		this.fetchMovies();
	}

	@action
	public async fetchMovies() {
		try {
			const response = await ApiService.getMovies();
			const {total_results, results} = response
			this.total = total_results
			this.list = results;
		} catch (e) {
			throw e;
		}
	}

	@action
	public async searchMovies(movie:string) {
		try {
			const response = await ApiService.searchMovies(movie);	
			const{results} = response
			this.list = results;
		} catch (e) {
			throw e;
		}
	}
}