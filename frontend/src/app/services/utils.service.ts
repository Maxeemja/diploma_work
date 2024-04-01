import { Injectable } from '@angular/core';

enum PriorityIcons {
  Low = 'keyboard_double_arrow_down',
  Medium = 'code',
  High = 'keyboard_double_arrow_up',
}

@Injectable({ providedIn: 'root' })
export class UtilsService {
  getPriorityIconName(statusCode: number) {
    switch (statusCode) {
      case 0:
        return PriorityIcons.Low;
      case 1:
        return PriorityIcons.Medium;
      case 2:
        return PriorityIcons.High;
      default:
        return '';
    }
  }
}
