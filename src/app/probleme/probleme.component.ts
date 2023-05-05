import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, MaxLengthValidator } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum.component';
import { TypeproblemeService } from './probleme.service';
import { ITypeProbleme } from './ITypeProbleme';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  setNotification(arg0: string) {
    throw new Error('Method not implemented.');
  }

  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: String;

  constructor(private fb: FormBuilder, private typeprobleme: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeProbleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [
          { value: '', disabled: true },
          Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+'),
        ],
        courrielConfirmation: [
          { value: '', disabled: true },
          Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+'),
        ],
      }),
      telephone: [{ value: '', disabled: true }],
      notification: ['pasnotification'],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: { value: Date(), disabled: true }
    });

    this.typeprobleme.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );

    this.problemeForm
      .get('notification')
      .valueChanges.subscribe((value) => this.appliquerNotifications(value));
  }
  appliquerNotifications(notification: String): void {
    const emailControl = this.problemeForm.get('courrielGroup.courriel');
    const emailConfirmationControl = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    emailControl.clearValidators();
    emailControl.reset();
    emailControl.disable();

    emailConfirmationControl.clearValidators();
    emailConfirmationControl.reset();
    emailConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (notification == 'notificationCourriel') {
      emailControl.enable();
      emailControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+'),
      ]);
      emailConfirmationControl.enable();
      emailConfirmationControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+')
      ]);
    } else if (notification == 'notificationTelephone') {
      telephoneControl.enable();
      telephoneControl.setValidators([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    }

    emailControl.updateValueAndValidity();
    emailConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }

  save(): void {
  }

}