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

  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: String;

  constructor(private fb: FormBuilder, private typeprobleme: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({

      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeProbleme: ['', [Validators.required]]

    });

    this.typeprobleme.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error);

  }

  save(): void {
  }

}