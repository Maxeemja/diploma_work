import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersGroupComponent } from './filters-group.component';

describe('FiltersGroupComponent', () => {
  let component: FiltersGroupComponent;
  let fixture: ComponentFixture<FiltersGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
