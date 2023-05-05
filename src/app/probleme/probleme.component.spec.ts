import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { MinLengthValidator, ReactiveFormsModule } from '@angular/forms';
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
    component.appliquerNotifications('pasnotification');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('')
    expect(zone.status).toEqual('DISABLED');
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('pasnotification');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('pasnotification');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('notificationCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('test');
    expect(zone.valid).toBeFalsy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('notificationCourriel');
    let errors = {};
    let courrielGroup = component.problemeForm.get('courrielGroup');
    let zone = courrielGroup.get('courriel');
    let zoneConfirmation = courrielGroup.get('courrielConfirmation');
    zoneConfirmation.setValue('test@test.com');
    errors = courrielGroup.errors || {};

  
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('notificationCourriel');
    let errors = {};
    let courrielGroup = component.problemeForm.get('courrielGroup');
    let zone = courrielGroup.get('courriel');
    zone.setValue('test@test.com');
    errors = courrielGroup.errors || {};


  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let errors = {};
    let courrielGroup = component.problemeForm.get('courrielGroup');
    let zone = courrielGroup.get('courriel');
    let zoneConfirmation = courrielGroup.get('courrielConfirmation');
    zone.setValue('teste1');
    zoneConfirmation.setValue('test2@test.com');

    errors = courrielGroup.errors || {};

  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('notificationCourriel');
    let errors = {};
    let courrielGroup = component.problemeForm.get('courrielGroup');
    let zone = courrielGroup.get('courriel');
    let zoneConfirmation = courrielGroup.get('courrielConfirmation');
    zone.setValue('test@test.com');
    zoneConfirmation.setValue('test@test.com');
    errors = courrielGroup.errors || {};

  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');

  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');

  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('')
    expect(zone.valid).toBeFalsy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('s438')
    expect(zone.valid).toBeFalsy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('438379867')
    expect(zone.valid).toBeFalsy();

  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('43837986791')
    expect(zone.valid).toBeFalsy();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    // TODO 
    component.appliquerNotifications('notificationTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('4383798679')
    expect(zone.valid).toBeTruthy();
  });
});















