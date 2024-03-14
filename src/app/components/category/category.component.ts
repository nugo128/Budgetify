import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  @Input() category = '';
  @Input() type = 'Expenses';
  width;
  ngOnInit(): void {
    this.width = this.category.length * 10 + 'px';
    console.log(this.width);
  }
}
