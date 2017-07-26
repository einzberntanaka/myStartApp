import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import {RatingModule} from 'ngx-rating';

import { SearchComponent } from './search.component';
import { HotMoviesComponent } from '../hotmovies/hotmovies.component';

import { MovieService } from '../shared/movie.service';

const SearchRoutes: Routes = [
    { 
        path: 'movie',  
        component: SearchComponent
    },
    { 
        path: 'movie/:id', 
        component: SearchComponent 
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2CompleterModule,
        RatingModule,
        RouterModule.forChild(SearchRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        SearchComponent,
        HotMoviesComponent
    ],
    providers: [
        MovieService,
    ]
})

export class SearchModule {}