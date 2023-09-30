import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: 'quiz', component: QuizComponent},
  {path: 'start', component: StartComponent},
  {path: '**', redirectTo: 'start'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
