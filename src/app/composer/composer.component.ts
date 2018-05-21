import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable, fromEvent, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  distinctUntilKeyChanged
} from 'rxjs/operators';
import { MarkdownService } from '../markdown.service';
import { PostsService } from '../posts.service';
import { DbService } from '../db.service';

const hljs = window['hljs'];

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  // delayedFormValue = new BehaviorSubject<any>(null);

  delayedFormValue: BehaviorSubject<any>;

  form: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  permalink: string;

  separatorKeysCodes = [ENTER, COMMA];

  filteredTerms: Observable<any[]>;
  allTerms: { term: string; count: number; creation: string }[] = [];

  @ViewChild(MatTabGroup) tabs;
  @ViewChild('tagInput') tagInput: ElementRef;
  @ViewChild('textArea') textArea: ElementRef;

  keyPress: Observable<KeyboardEvent>;

  constructor(
    private fb: FormBuilder,
    private mark: MarkdownService,
    private posts: PostsService,
    private dbCtrl: DbService
  ) {
    this.delayedFormValue = new BehaviorSubject<any>(dbCtrl.getPost());
    this.createForm();
    this.onChanges();
    this.setupTags();
    this.form.patchValue(this.delayedFormValue.getValue());
    dbCtrl.observe(this.delayedFormValue);
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  tabChanged() {
    console.log('changed');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value !== '' || value !== null) {
      console.log(value);
      // add value to array
      this.tags.push(this.fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number, tag: any): void {
    this.tags.removeAt(index);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(this.fb.control(event.option.viewValue.trim()));
    this.tagInput.nativeElement.value = '';
  }

  filter(name: string) {
    // console.log('filter', name);
    return this.allTerms.filter(
      fruit => fruit.term.toLocaleLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      permalink: [this.permalink],
      tags: this.fb.array([], Validators.required),
      source: ['', Validators.required],
      author: ['', this.fb.control(Date.now())]
    });
  }

  onChanges() {
    this.form
      .get('title')
      .valueChanges.subscribe(data => this.createPermalink(data));

    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(this.delayedFormValue);
  }

  setupTags() {
    // this.http.get('https://api.myjson.com/bins/16bt96').subscribe(items => {
    //   this.allTerms = items as {
    //     term: string;
    //     count: number;
    //     creation: string;
    //   }[];
    // });
    this.allTerms = [];
  }

  createPermalink(title: any) {
    // const title = data['title'] || '';
    if (!title) {
      this.permalink = 'not-specified-yet';
    } else {
      this.permalink = title
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-*|-*$/g, '')
        .toLowerCase();
    }
    this.form.get('permalink').setValue(this.permalink);
  }

  create() {
    this.posts.addPost(this.form.value).subscribe(res => {
      console.log('created');
      this.form.reset();
    });
  }

  reset() {
    this.form.reset();
  }

  ngOnInit() {
    this.filteredTerms = fromEvent(this.tagInput.nativeElement, 'keyup').pipe(
      map((evt: any) => evt.target.value),
      startWith(null),
      map(
        (fruit: string | null) =>
          fruit ? this.filter(fruit) : this.allTerms.slice()
      )
    );
  }
}
