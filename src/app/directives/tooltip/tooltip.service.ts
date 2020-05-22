import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Position } from './tooltip.directive';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TooltipService {
  private initialState: Position =  {width: 0, height: 0, offsetLeft: 0, offsetTop: 0, isOnTop: false}
  private readonly _position = new BehaviorSubject<Position>(this.initialState);
  readonly position$ = this._position.asObservable().pipe(debounce(() => interval(100)));

  constructor() { }

  set position(val: Position){
    this._position.next(val);
  }
  get position (){
    return this._position.getValue();
  }
}
