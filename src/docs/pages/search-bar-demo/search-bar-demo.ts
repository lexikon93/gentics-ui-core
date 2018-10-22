import {Component} from '@angular/core';

@Component({
    templateUrl: './search-bar-demo.tpl.html'
})
export class SearchBarDemo {
    componentSource: string = require('!!raw-loader!../../../components/search-bar/search-bar.component.ts');

    changeCount: number = 0;
    searchCount: number = 0;
    clearCount: number = 0;

    term: string = 'search term';
    newTerm: string = '';
    hideClearButton: boolean = false;
}
