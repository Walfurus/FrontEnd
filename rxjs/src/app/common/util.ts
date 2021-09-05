import {Observable, Observer} from 'rxjs';

export function createHttpObservable(url:string) {
  const http$ = new Observable((observer: Observer<any>) => {
      fetch('/api/courses')
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((e) => {
        observer.error(e);
      });
    });

    return http$;
}

