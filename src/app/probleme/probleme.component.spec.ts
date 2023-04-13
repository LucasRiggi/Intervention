import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
  })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone prénom invalide avec 2 caracteres', () => {
    let zone = component.problemeForm?.controls['prenom']
    zone?.setValue('a'.repeat(2))
    let errors = zone?.errors || {};
        expect(errors['minlength']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm?.controls['prenom']
    zone?.setValue('a'.repeat(3))
    let errors = zone?.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

});
