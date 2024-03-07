import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoryComponentComponent } from './obligatory-component.component';

describe('ObligatoryComponentComponent', () => {
  let component: ObligatoryComponentComponent;
  let fixture: ComponentFixture<ObligatoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObligatoryComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObligatoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
