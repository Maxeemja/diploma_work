import { Pipe, PipeTransform } from '@angular/core';
import { from, groupBy, tap, mergeMap, toArray, Observable } from 'rxjs';
import { Assignment } from '../interfaces/Assignment';

@Pipe({
  name: 'group',
  standalone: true,
})
export class GroupPipe implements PipeTransform {
  transform(
    arr: Assignment[] | any,
    key: string,
    nestedKey?: string
  ): Observable<Assignment[]> | any {
    return from(arr).pipe(
      groupBy((elem: any) => {
        if (nestedKey) return elem[key][nestedKey];
        return elem[key];
      }),
      mergeMap((group) => group.pipe(toArray())),
      toArray()
    );
  }
}
