import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoriesCtrl = new FormControl('');
  filteredcategories: Observable<string[]>;
  @Input() existingCategory: string;
  categories: string[] = [];
  allCategories: string[] = ['Home', 'Shopping', 'Salary', 'Debt', 'Fun'];
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  @Output() categoryChange = new EventEmitter<string[]>();

  emitCategoryChange(categories: string[]) {
    this.categoryChange.emit(categories);
  }
  announcer = inject(LiveAnnouncer);
  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.existingCategory)) {
      this.categories.push(value);
    }
  }

  @Output() arrayEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  emitEvent() {
    this.arrayEmitter.emit(this.categories);
  }
  constructor() {
    this.filteredcategories = this.categoriesCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filter(category) : this.allCategories.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.categories.push(value);
    }

    event.chipInput!.clear();

    this.categoriesCtrl.setValue(null);
    this.arrayEmitter.emit(this.categories);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);

      this.announcer.announce(`Removed ${category}`);
    }
    this.arrayEmitter.emit(this.categories);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoriesCtrl.setValue(null);
    this.arrayEmitter.emit(this.categories);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
    this.arrayEmitter.emit(this.categories);
  }
}
