import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    StartComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
