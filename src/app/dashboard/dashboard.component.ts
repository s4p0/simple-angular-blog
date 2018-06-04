import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: Array<{ link: string; text: string; icon: string }>;

  constructor() {
    this.items = [];
    this.loadItems();
  }

  loadItems() {
    this.items.push({ link: '', text: 'edit posts', icon: 'home' });
  }

  ngOnInit() {}
}
