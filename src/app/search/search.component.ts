import { Component } from '@angular/core';

import { MovieService } from '../shared/movie.service';

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
export class SearchComponent {
    searchString: string;
    result: any;

    title: string;
    img_src: string;
    description: string;
    imdb: string;


    constructor(private MVService: MovieService){

    }
    search(){
        if(this.searchString!= null){
            this.MVService.search(this.searchString);
            this.title = this.MVService.title;
            this.img_src = this.MVService.image_url;
            this.description = this.MVService.description;
            this.imdb = this.MVService.imdb;
        }
    }

}