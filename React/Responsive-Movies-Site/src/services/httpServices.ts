import { stringify } from "querystring";

export function get(url:string, params?:any){
    return fetchData(params ? `${url}?${stringify(params)}`: url, {
        method: 'GET',
        headers: {},
    });
}

function fetchData(url: string, options: RequestInit): Promise<any>{
    return fetch(url, options).then(parseResponse);
}

async function parseResponse(response: Response){
    let json: any;

    try {
        json = await response.json();
    } catch(e) {
        json = undefined;
    }

    return json;
}