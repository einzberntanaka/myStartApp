import { Injectable } from '@angular/core';


@Injectable()
export class MovieService {
    title: string;
    image_url: string;
    description: string;
    imdb: string;
    
    constructor() {
    }

    search(searchString: string) {
        alert(searchString);
        this.title = '123';
        this.image_url = 'http://test.png';
        this.description = 'non-description';
        this.imdb = 'testing';
    }
    /*  search(text: string) : Movie {
        this.title = '123';
        this.image_url = 'http://test.png';
        this.description = 'non-description';
        this.imdb = 'testing';
    }*/
}