import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<any> {
  constructor(private categoryService: CategoryService) {}

  resolve(): Observable<any> {
    return this.categoryService.get();
  }
}
