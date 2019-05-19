import * as HttpService from './httpServices';

const hostUrl = 'https://api.themoviedb.org/3';
const searchMovie = `${hostUrl}/search/movie`;
const apiKey='2f99b27170449ded8031de13322b14b8';

export async function getMovies() {
    return await HttpService.get(hostUrl +'/discover/movie',{api_key:`${apiKey}`});
}

 export async function searchMovies(search: string) {
     return await HttpService.get(searchMovie,{api_key:`${apiKey}`,language:'en-US',query:search,page:1,include_adult:false});
} 

