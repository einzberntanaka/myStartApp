import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { SearchComponent } from './search.component';

import { MovieService } from '../shared/movie.service';

const SearchRoutes: Routes = [
    { 
        path: 'search',  
        component: SearchComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(SearchRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        MovieService,
    ]
})

export class SearchModule {}