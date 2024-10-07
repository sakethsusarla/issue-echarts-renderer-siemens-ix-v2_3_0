import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionNotSupportedDialogComponent } from './resolution-not-supported-dialog.component';

describe('ResolutionNotSupportedDialogComponent', () => {
  let component: ResolutionNotSupportedDialogComponent;
  let fixture: ComponentFixture<ResolutionNotSupportedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolutionNotSupportedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolutionNotSupportedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
