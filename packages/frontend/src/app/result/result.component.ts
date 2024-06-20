import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  jobTitle = 'Pełnomocniczka ds. osób z niepełnosprawnościami';
  jobDescription = 'Działam na rzecz poprawy jakości życia osób z niepełnosprawnościami i na rzecz ich pełniejszego uczestnictwa w życiu społeczeństwa.';
  
  roles = ['Weterynaria', 'Medycyna', 'Kapłaństwo'];
  menuIndex = 0;

  setItem(index: number) {
    this.menuIndex = index;
  }
}
