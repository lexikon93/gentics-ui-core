import {Component} from 'angular2/core';
import {GTX_FORM_DIRECTIVES} from '../../../index';

@Component({
    template: require('./input-demo.tpl.html'),
    directives: [GTX_FORM_DIRECTIVES]
})
export class InputDemo {
}
