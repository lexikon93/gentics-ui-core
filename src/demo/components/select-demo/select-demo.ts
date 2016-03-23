import {Component} from 'angular2/core';
import {GTX_FORM_DIRECTIVES} from '../../../index';

@Component({
    template: require('./select-demo.tpl.html'),
    directives: [GTX_FORM_DIRECTIVES]
})
export class SelectDemo {
    selectMultiVal: string[] = ['bar', 'baz'];
    selectVal: string = 'bar';
}
