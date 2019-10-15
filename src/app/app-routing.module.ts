import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', component: GreetingComponent, pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
