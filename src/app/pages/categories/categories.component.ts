import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AddCategoryDialogComponent } from '../../components/add-category-dialog/add-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  searchText = '';
  allCategories = [];
  categories: any = [];
  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe((response) => {
      this.allCategories = response['category'];
      this.categories = response['category'];
    });
  }
  onSearch() {
    if (this.searchText.length > 0) {
      this.categoryService
        .search({ search: this.searchText })
        .subscribe((resp) => {
          this.categories = resp['category'];
        });
    } else {
      this.categories = this.allCategories;
    }
  }
  openCategoryDialog(data) {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categories.push(result);
      }
    });
  }
}
