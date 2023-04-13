import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})

export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup | undefined;
  
  constructor(private fb: FormBuilder) { } 

  ngOnInit() {
       this.problemeForm = this.fb.group ({
       prenom : ['',[Validators.minLength(3)]]
       });
  }

  save(): void {
  }


}
