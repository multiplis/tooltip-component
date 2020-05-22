import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipComponent } from './directives/tooltip/tooltip.component';
import { ExamplePageComponent } from './example-page/example-page.component';
import { Example2PageComponent } from './example2-page/example2-page.component';

import { TooltipDirective } from './directives/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    ExamplePageComponent,
    Example2PageComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
