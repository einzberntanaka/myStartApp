import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, RemoteData,CompleterItem} from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/movie.service';
import {Observable} from 'rxjs/Observable';

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
/*export class Movie {
    id: string;
    name: string;
    image: string;
    description: string;
    imdb: string;
}*/
export class SearchComponent implements OnInit {
    searchString: string;
    enable: boolean;
    result: any;

    title: string;
    img_src: string;
    img_bg: string;
    description: string;
    imdb: string;
    release_date: string;
    genres: string[] = [];

    movieLists: CompleterData;


    constructor(private MVService: MovieService, private completerService: CompleterService, private route: ActivatedRoute){

    }
     ngOnInit() {
       this.route.params.subscribe(params => {
            if(params['id']!=''){
                this.getMovieByKey(params['id']);
            }
        });
    }
    search(){
        if(this.searchString!= null){
            this.MVService.search(this.searchString).subscribe(data => {
                if(data.results.length > 0){
                    this.enable = true;
                    this.result = data.results;
                    this.title = this.result[0].title;
                    this.img_src = 'https://image.tmdb.org/t/p/w500' + this.result[0].poster_path;
                    this.img_bg = this.result[0].backdrop_path !=null ? 'https://image.tmdb.org/t/p/w500' + this.result[0].backdrop_path :this.img_src;
                    this.description = this.result[0].overview;
                    this.imdb = this.result[0].vote_average;
                    this.release_date = this.result[0].release_date;
                }
            });
       
        }
    }
    onChange(){
        let listMovie: any[] = [];
        this.MVService.search(this.searchString).subscribe(data => {
            data.results.map(item => {
                return {
                    name: item.title,
                    id: item.id
                }
            }).forEach(item => listMovie.push(item));
        });
        console.log(listMovie);
        this.movieLists = this.completerService.local(listMovie,'name','name'); 
    }
    onItemSelect(selected:CompleterItem){
        if(selected.originalObject){
            this.getMovieByKey(selected.originalObject.id);
        }
    }
    getMovieByKey(keystring: string){
        this.MVService.searchByKey(keystring).subscribe( data => {
            if(data){
                this.genres = [];
                this.enable = true;
                this.title = data.title;
                this.img_src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
                this.img_bg = data.backdrop_path !=null ? 'https://image.tmdb.org/t/p/w500' + data.backdrop_path :this.img_src;
                this.description = data.overview;
                this.imdb = data.vote_average;
                this.release_date = data.release_date;
                data.genres.map(item => this.genres.push(item.name));
            }
        })
    }
}