import {
  ComponentFactoryResolver, 
  Directive, 
  HostListener,
  ElementRef, 
  Input,
  ViewContainerRef,
  Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  tooltip: ElementRef;
  show:boolean = false;
  componentRef: any;//change type
  isOpen: boolean = false;
  position = new Subject();
  @Input() text: string;
  @Input() title: string;
  @Input() height?: number = 200; 
  @Input() width?: number = 200;


  constructor(private resolver: ComponentFactoryResolver,
    private elRef: ElementRef,
     private viewContainerRef: ViewContainerRef,
     @Inject(DOCUMENT) private _document: any) {
   }
  @HostListener('click', ['$event']) onMouseClick(event: MouseEvent) {   
    if(!this.isOpen){
      this.showTooltip(); 
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target)){
      return;
    }else{
      this.isOpen = false;
      this.viewContainerRef.clear();  
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if(this.isOpen){
      this.viewContainerRef.clear();  
      this.showTooltip();
    }
  }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    if(this.isOpen){
      this.viewContainerRef.clear();  
      this.showTooltip();
    }
  }
  showTooltip(){
    this.viewContainerRef.clear(); 
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.position = this.elRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.text = this.text;
    this.componentRef.instance.title = this.title;
    this.componentRef.height = this.height;
    this._document.querySelector('body').appendChild(this.componentRef.location.nativeElement); 
    this.isOpen = true;
  }
  hideTooltip(){
    this.viewContainerRef.clear();
  }

}
