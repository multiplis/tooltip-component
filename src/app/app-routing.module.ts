import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePageComponent } from './example-page/example-page.component';
import { Example2PageComponent } from './example2-page/example2-page.component';



const routes: Routes = [{
  path:'example1', 
  component: ExamplePageComponent
},
{
  path:'example2', 
  component: Example2PageComponent
},{
  path:'',
  redirectTo: '/example1',
  pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
