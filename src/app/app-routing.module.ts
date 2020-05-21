import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePageComponent } from './example-page/example-page.component';


const routes: Routes = [{
  path:'example', 
  component: ExamplePageComponent
},{
  path:'',
  redirectTo: '/example',
  pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
