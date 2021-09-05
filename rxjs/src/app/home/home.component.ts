import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // beginnerCourses: Course[];
    // advancedCourses: Course[];

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(private store:Store) {

    }

    ngOnInit() {

      const http$ : Observable<Course[]> = createHttpObservable('/api/courses');

      const courses$ = http$.pipe(
        map((res) => Object.values(res["payload"]))
      );

      this.beginnerCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category == "BEGINNER"))
      )

      this.advancedCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category == "ADVANCED"))
      )


      // courses$.subscribe(
      //   courses => {
      //     this.beginnerCourses = courses.filter();

      //     this.beginnerCourses = courses.filter(course => course.category == "ADVANCED");


      //   },
      //   // () => {},
      //   noop,
      //   () => console.log("finished"),
      // );




    }

}
