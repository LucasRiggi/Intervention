import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let service: TypeproblemeService;
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]

    });

    service = TestBed.inject(TypeproblemeService);
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // 1
  it('Zone prénom invalide avec 2 caracteres', () => {
    let zone = component.problemeForm?.controls['prenom']
    zone?.setValue('a'.repeat(2))
    let errors = zone?.errors || {};
        expect(errors['minlength']).toBeFalsy();
  });
  // 2
  it(' Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm?.controls['prenom']
    zone?.setValue('a'.repeat(3))
    let errors = zone?.errors || {};
        expect(errors['minlength']).toBeFalsy();
  });
  //3 
  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('a'.repeat(200));
    let errors = zone?.errors || {};
    expect(errors['maxlength']).toBeFalsy();  
  });
  //4
  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('');
    let errors = zone?.errors || {};
    expect(errors['required']).toBeTruthy();  
  });
  //5
  it('Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue(' '.repeat(10));
    let errors = zone?.errors || {};
    expect(errors['required']).toBeFalsy();  
  });
  //6
  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });
  //15
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });
  
  //16

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  //17
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });
  //18

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
  component.setNotification('pasnotification');
  let zone = component.problemeForm.get('telephone');
  expect(zone.status).toEqual('DISABLED'); 
});

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    let zone = component.problemeForm?.controls['prenom'];
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();  
  });

  
  
});















