import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';

@Component({
    selector:'top-movie',
    templateUrl: './hotmovies.component.html',
    styleUrls: ['./hotmovies.component.css']
})

export class HotMoviesComponent implements OnInit{
    
    listMovies: any[] = [];
    constructor(private MVService: MovieService){

    }
    ngOnInit() {
        this.getTopMovie();
    }
    getTopMovie(){
            this.MVService.getTopRated().subscribe(data => {
            data.results.map(item => {
                return {
                    name: item.title,
                    image: 'https://image.tmdb.org/t/p/w500'+item.poster_path,
                    id: item.id
                }
            }).forEach(item => this.listMovies.push(item));
        });
    }

}