import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe((response) => {
      console.log(response);
      this.categories = response['category'];
    });
  }
}
