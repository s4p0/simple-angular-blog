import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  form: FormGroup;

  options = ['One', 'Two', 'Three'];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      myControl: ''
    });
  }
}
