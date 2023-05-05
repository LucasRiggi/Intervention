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

      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeProbleme: ['', Validators.required], 
      courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true},[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      courrielConfirmation: [{value: '', disabled: true}],
  }),
telephone: [{value: '', disabled: true}],
    });

    this.typeprobleme.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error);

  }

  appliquerNotifications(notification: string): void {
    const ControlCouriel = this.problemeForm.get('courrielGroup.courriel');
    const ControlCourielConfirmation  = this.problemeForm.get('courrielGroup.courrielConfirmation');   
         

    ControlCouriel.clearValidators();
    ControlCouriel.reset(); 
    ControlCouriel.disable();  

    ControlCourielConfirmation.clearValidators();
    ControlCourielConfirmation.reset();    
    ControlCourielConfirmation.disable();
  }



  save(): void {
  }

}