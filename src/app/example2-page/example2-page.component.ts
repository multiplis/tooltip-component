import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example2-page',
  templateUrl: './example2-page.component.html',
  styleUrls: ['./example2-page.component.scss']
})
export class Example2PageComponent {
  tooltipText: string = "";
  constructor(){
    console.log('Example2PageComponent');
  }
}
