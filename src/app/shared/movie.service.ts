import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MovieService {
    constructor(private http: Http) {

    }

    search(searchString: string){
        if(searchString==''){
            searchString='*'
        }
        return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=29376cbf5278c925ae56e7b3d311765a&query=${searchString}`)
            .map((res:Response) => res.json());
    }
    searchByKey(key: string){
        return this.http.get(`https://api.themoviedb.org/3/movie/${key}?api_key=29376cbf5278c925ae56e7b3d311765a&language=en-US`)
            .map((res:Response) => res.json());
    }
    getTopRated(){
        return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=29376cbf5278c925ae56e7b3d311765a&language=en-US`)
        .map((res:Response) => res.json());
    }
    private clone(object: any){
        return JSON.parse(JSON.stringify(object));
    }
}