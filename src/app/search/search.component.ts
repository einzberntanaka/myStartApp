import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, RemoteData,CompleterItem} from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/movie.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators  } from '@angular/forms';
import 'rxjs/Rx';

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    
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

    key = new FormControl('', Validators.required);
    /*title: string;
    img_src: string;
    img_bg: string;
    description: string;
    imdb: string;
    release_date: string;*/
    genres: string[] = [];

    listMovie: any[] = [];
    movieLists: CompleterData;

    movieModel: any;

    constructor(private MVService: MovieService, private completerService: CompleterService, private route: ActivatedRoute){


        this.key.valueChanges
         .debounceTime(500)
         .distinctUntilChanged()
         .flatMap(term => this.MVService.search(term))
         .subscribe(data => {
            this.listMovie = [];
            data.results.map(item => {
                return {
                    name: item.title,
                    id: item.id
                }
            }).forEach((item, index) => {
                if(index < 10){
                    this.listMovie.push(item);
                }
               
            });
            console.log(this.listMovie);
            this.movieLists = this.completerService.local(this.listMovie,'name','name'); 
        });
  
    }
     ngOnInit() {
       this.route.params.subscribe(params => {
            if(params['id']!=undefined){
                this.getMovieByKey(params['id']);
            }
        });
    }
    search(){
        if(this.searchString!= null){
            this.MVService.search(this.searchString).subscribe(data => {
                if(data.results.length > 0){
                   this.getMovieByKey(data.results[0].id);
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
            }).forEach((item, index) => {
                if(index < 15){
                    listMovie.push(item);
                }
            });
        });

        this.movieLists = this.completerService.local(listMovie,'name','name'); 
    }
    onItemSelect(selected:CompleterItem){
        if(selected){
            this.getMovieByKey(selected.originalObject.id);
        }
    }
    private getMovieByKey(keystring: string){
        this.MVService.searchByKey(keystring).subscribe( data => {
            if(data){
                this.genres = [];
                this.enable = true;
                data.genres.map(item => this.genres.push(item.name));
                this.movieModel = {
                    title: data.title,
                    img_src: 'https://image.tmdb.org/t/p/w500' + data.poster_path,
                    img_bg: data.backdrop_path !=null ? 'https://image.tmdb.org/t/p/w500' + data.backdrop_path : data.img_src,
                    description: data.overview,
                    imdb: data.vote_average,
                    release_date: data.release_date,
                    genres: this.genres
                }
                
            }
        })
    }

}