import { Component, OnInit, OnDestroy, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import {TooltipService } from './tooltip.service';


@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  title: string;
  text: string;
  isOnTop: boolean;
  constructor(private tooltipService: TooltipService, 
    private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.tooltipService.position$.pipe().subscribe((pos)=>{
      this.isOnTop = pos.isOnTop;
      this.renderer.setStyle(this.elRef.nativeElement, 'top', `${pos.offsetTop}px`);
      this.renderer.setStyle(this.elRef.nativeElement, 'left', `${pos.offsetLeft}px`);
      this.renderer.setStyle(this.elRef.nativeElement, 'width', `${pos.width}px`);
      this.renderer.setStyle(this.elRef.nativeElement, 'height', `${pos.height}px`);//10 is a arrow height;
      this.renderer.addClass(this.elRef.nativeElement, 'visible');
    });
  }
}
