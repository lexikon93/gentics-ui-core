import {Component} from 'angular2/core';
import {Notification, Button, GTX_FORM_DIRECTIVES} from '../../../index';
import {Autodocs, DemoBlock, HighlightedCode} from '../../components';

@Component({
    template: require('./notification-demo.tpl.html'),
    directives: [Button, GTX_FORM_DIRECTIVES, Autodocs, DemoBlock, HighlightedCode]
})
export class NotificationDemo {
    componentSource: string = require('!!raw!../../../components/notification/notification.service.ts');

    message: string = 'Hello, this is Toast.';
    delay: number = 3000;
    type: string = 'default';

    constructor(private notification: Notification) {}


    showBasic(): void {
        this.notification.show({
            message: this.message,
            type: this.type,
            delay: this.delay
        });
    }

    showWithAction(): void {
        this.notification.show({
            message: 'Email sent',
            action: {
                label: 'Undo',
                onClick: (): any =>  this.notification.show({
                    message: 'Cancelled sending',
                    type: 'success'
                })
            }
        });
    }

}