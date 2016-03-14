import {Component, Input, Output, EventEmitter, ElementRef, Optional} from 'angular2/core';
import {ControlValueAccessor, NgControl} from 'angular2/common';
import {InputField} from '../input/input.component';
import {Modal} from '../modal/modal.component';

/**
 * Rome is a date picker widget: https://github.com/bevacqua/rome
 */
const rome: any = require('rome');
const momentjs: moment.MomentStatic = rome.moment;


@Component({
    selector: 'gtx-date-time-picker',
    template: require('./date-time-picker.tpl.html'),
    directives: [InputField, Modal]
})
export class DateTimePicker implements ControlValueAccessor {

    @Input() timestamp: number;
    @Input() label: string = '';
    @Input() format: string;
    @Input() set displayTime(val: any) {
        this._displayTime = val === true || val === 'true';
    }
    @Output() change: EventEmitter<number> = new EventEmitter();
    // ValueAccessor members
    onChange: any = (_: any) => {};
    onTouched: any = () => {};

    /**
     * cal is an instance of a Rome calendar, for the API see https://github.com/bevacqua/rome#rome-api
     */
    private cal: any;
    private uid: string = 'calendar_' + Math.random().toString(16).slice(2);
    private value: moment.Moment = momentjs();
    private _displayTime: boolean = true;
    private displayValue: string = ' ';
    private time: any = {
        h: 0,
        m: 0,
        s: 0
    };

    constructor(@Optional() ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    /**
     * If a timestamp has been passed in, initialize the value to that time.
     */
    ngOnInit(): void {
        if (this.timestamp) {
            this.value = momentjs.unix(Number(this.timestamp));
            this.displayValue = this.getTimeString(this.value, this._displayTime);
            this.updateTimeObject(this.value);
        }
    }

    /**
     * Initialize the Rome widget instance.
     */
    ngAfterViewInit(): void {
        let calendarEl: Element = document.querySelector('#' + this.uid);
        this.cal = rome(calendarEl, { time: false })
            .on('data', () => this.value = this.cal.getMoment());
    }

    ngOnDestroy(): void {
        this.cal.destroy();
    }

    /**
     * Update the this.value in accordance with the input of one of the
     * time fields (h, m, s).
     */
    updateTime(segment: string, value: number): void {
        switch (segment) {
            case 'hours':
                this.value.hour(value);
                break;
            case 'minutes':
                this.value.minute(value);
                break;
            case 'seconds':
                this.value.second(value);
                break;
            default:
        }

        this.updateTimeObject(this.value);
        this.updateCalendar(this.value);
    }

    /**
     * Handler for the incrementing the time values when up or down arrows are pressed.
     */
    timeKeyHandler(segment: string, e: KeyboardEvent) {
        // UP arrow key
        if (e.keyCode === 38) {
            e.preventDefault();
            this.incrementTime(segment);
        }
        // DOWN arrow key
        if (e.keyCode === 40) {
            e.preventDefault();
            this.decrementTime(segment);
        }
    }

    incrementTime(segment: string) {
        this.addToTime(segment, 1);
    }

    decrementTime(segment: string) {
        this.addToTime(segment, -1);
    }

    /**
     * Update the displayed value and close the modal.
     */
    confirm(modal: Modal) {
        this.displayValue = this.getTimeString(this.value, this._displayTime);
        this.change.emit(this.value.unix());
        modal.closeModal();
    }

    /**
     * Close the picker widget without updating the displayed value or emitting a change event.
     */
    cancel(modal: Modal) {
        modal.closeModal();
    }

    writeValue(value: number): void {
        if (value) {
            this.value = momentjs.unix(Number(this.timestamp));
            this.displayValue = this.getTimeString(this.value, this._displayTime);
            this.updateTimeObject(this.value);
            this.updateCalendar(this.value);
        }
    }

    registerOnChange(fn: Function): void {
        this.onChange = () => fn(this.value.unix());
    }
    registerOnTouched(fn: Function): void { this.onTouched = fn; }

    /**
     * Increment or decrement the value and update the time object.
     */
    private addToTime(segment: string, increment: number): void {
        this.value.add(increment, segment);
        this.updateTimeObject(this.value);
        this.updateCalendar(this.value);
    }

    /**
     * Update the time object based on the value of this.value.
     */
    private updateTimeObject(date: moment.Moment): void {
        this.time.h = date.hour();
        this.time.m = date.minute();
        this.time.s = date.second();
    }

    /**
     * Update the Rome calendar widget with the current value.
     */
    private updateCalendar(value: moment.Moment): void {
        this.cal.setValue(value);
    }

    /**
     * Returns a human-readable string to be displayed in the control input field.
     */
    private getTimeString(date: moment.Moment, displayTime: boolean): string {
        if (this.format) {
            return date.format(this.format);
        }
        let formatString: string = 'DD/MM/YYYY';
        formatString += displayTime ? ', HH:mm:ss' : '';
        return date.format(formatString);
    }
}

