import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  @Input() category = '';
  @Input() type = 'Expenses';
  @Input() id = 1;

  edittingMode = false;
  width: string;
  constructor(public categoryService: CategoryService) {}
  toggleEditting() {
    this.edittingMode = !this.edittingMode;
  }
  ngOnInit(): void {
    this.width = this.category.length * 10 + 'px';
    console.log(this.width);
  }
  onSubmit() {
    this.categoryService
      .edit({ id: this.id, title: this.category })
      .subscribe((resp) => {
        this.edittingMode = false;
        this.category = resp['title'];
      });
  }
}
