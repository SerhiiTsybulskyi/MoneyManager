import {Component} from 'angular2/core';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component/dashboard.component.html',
    styleUrls: ['app/dashboard.component/dashboard.component.css'],
})
export class DashboardComponent {
    name: string = 'Team';
    names: Array<string> = [];

    onKeyUp(value: string): void {
        if(value.length === 0)
            this.name = 'Team';
        else
            this.name = value;
    }

    onKyUpEnter(value: string): void {
        if(value.length !== 0)
            this.names.push(value);
    }
}