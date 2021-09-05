import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { create } from 'domain';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject,
    Observer
} from 'rxjs';
import {delayWhen, filter, map, subscribeOn, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

    //   document.addEventListener('click', evt=> {
    //     console.log(evt);
    //   })

    //   let counter = 0;

    //   setInterval(() => {
    //   console.log(counter);
    //   counter++;
    // }, 1000);

    // setTimeout(() => {
    //   console.log("Done")
    // }, 3000);

    // const interval$ = interval(1000);

    // interval$.subscribe(val => console.log("stream 0 " + val));
    // interval$.subscribe(val => console.log("stream 1 " + val));


    // const interval$ = timer(3000,1000);

    // const sub = interval$.subscribe(val => console.log("stream 0 " + val));

    // setTimeout(() => sub.unsubscribe(), 5000);

    // const docClick$ = fromEvent(document, 'click');

    // docClick$.subscribe(
    //   (val) => console.log(val),
    //   (err) => console.log(err),
    //   () => console.log("finished")
    // );






  }
}




