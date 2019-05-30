import { Observable } from 'rxjs';

export class Interval {
    observable: Observable<any>;
    length: number;
    time: number;
    headline: string;
    showInput?: boolean = false;
    handleTimes?: boolean = false;
}