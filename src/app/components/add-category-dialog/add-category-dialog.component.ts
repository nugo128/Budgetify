import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css',
})
export class AddCategoryDialogComponent {
  transactionType = 'Expenses';
  addCategory: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.addCategory = this.fb.group({
      title: [''],
      type: ['Expenses'],
    });
  }

  changeType(type: string) {
    this.transactionType = type;
    this.addCategory.value.type = type;
  }
  formData: any = {};
  onSubmit() {
    if (this.addCategory.valid) {
      this.formData = this.addCategory.value;
      this.categoryService.add(this.formData).subscribe((resp) => {
        this.dialogRef.close(resp['category']);
      });
    }
  }
}
