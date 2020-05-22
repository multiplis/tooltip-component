import { Component, OnInit, Input, OnDestroy, ElementRef, HostListener, Renderer2, AfterViewInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
  // ...
} from '@angular/animations';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy, AfterViewInit {
  title: string;
  text: string;
  height: number = 200;
  width:number = 200;
  position: any;
  offsetTop: number;
  offsetLeft: number;
  arrowClass: string = '';
  isOnTop: boolean = true;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.setPosition(); 
  }
  ngAfterViewInit():void{
    this.renderer.addClass(this.elRef.nativeElement, 'visible');
  }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    this.setPosition()
  }
  setPosition():void{
    const top = this.position.top  + window.pageYOffset - this.height  - 5;

    if(top  < window.pageYOffset){
      console.log('ALARM')
      this.isOnTop = false;
      this.offsetTop = this.height + this.position.height + top + 10;
    }else{
      this.isOnTop = true;
      this.offsetTop = top;
    }
    console.log('this.position.height', this.position.height)
    console.log('this.height', this.height)

    this.offsetLeft = this.position.left;
    console.log('this.position', this.position);
    console.log('.offsetTop', this.offsetTop, window.pageYOffset);
    // console.log(window.)

    this.renderer.setStyle(this.elRef.nativeElement, 'top', `${this.offsetTop}px`);
    this.renderer.setStyle(this.elRef.nativeElement, 'left', `${this.offsetLeft}px`);
    this.renderer.setStyle(this.elRef.nativeElement, 'width', `${this.width}px`);
    this.renderer.setStyle(this.elRef.nativeElement, 'height', `${this.height}px`);//10 is a arrow height;
  }

  ngOnDestroy():void{
  }
}
