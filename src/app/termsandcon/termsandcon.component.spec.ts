import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconComponent } from './termsandcon.component';

describe('TermsandconComponent', () => {
  let component: TermsandconComponent;
  let fixture: ComponentFixture<TermsandconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsandconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsandconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
