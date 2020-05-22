import {
  ComponentFactoryResolver, 
  Directive, 
  HostListener,
  ElementRef, 
  Input,
  ViewContainerRef,
  Inject, 
  ComponentRef,
  OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';

export interface Position{
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  isOnTop: boolean;
}

@Directive({
  selector: '[appTooltip]'
})

export class TooltipDirective implements OnDestroy {

  componentRef: ComponentRef<TooltipComponent>;
  isOpen: boolean = false;
  @Input() text: string;
  @Input() title: string;
  @Input() height?: number = 200; 
  @Input() width?: number = 200;

  constructor(private tooltipService: TooltipService,
    private resolver: ComponentFactoryResolver,
    private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private _document: any) {}

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

  @HostListener('document:keydown.escape', ['$event']) onKeydown(event: KeyboardEvent) {
    if(this.isOpen){
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
  scrollHandler() {
    if(this.isOpen){
      this.viewContainerRef.clear();  
      this.showTooltip();
    }
  }

  getPosition():Position{
    let offsetLeft:number, offsetTop:number, isOnTop:boolean;
    const elView = this.elRef.nativeElement.getBoundingClientRect();
    const top = elView.top  + window.pageYOffset - this.height - 10;
    if(top  < window.pageYOffset){
      isOnTop = false;
      offsetTop = this.height*1 + elView.height + top;
    }else{
      isOnTop = true;
      offsetTop = top - 10;
    }
    offsetLeft = elView.left;
    return {offsetTop: offsetTop, offsetLeft:offsetLeft, isOnTop: isOnTop, width: this.width, height: this.height}
  }
  showTooltip(){

    this.viewContainerRef.clear(); 

    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);

    this.componentRef.instance.text = this.text;
    this.componentRef.instance.title = this.title;

    this.tooltipService.position = this.getPosition();
    this._document.querySelector('body').appendChild(this.componentRef.location.nativeElement); 
    this.isOpen = true;
  }

  hideTooltip(){
    this.viewContainerRef.clear();
  }
  ngOnDestroy(){
    this.viewContainerRef.clear();
  }

}
