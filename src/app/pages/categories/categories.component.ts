import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AddCategoryDialogComponent } from '../../components/add-category-dialog/add-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allCategories = this.route.snapshot.data['category'].category;
    this.categories = this.route.snapshot.data['category'].category;
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
