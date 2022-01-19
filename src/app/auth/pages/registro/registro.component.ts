import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required, Validators.minLength(6) ]]
  }, {
    validators: [this.validatorService.camposIguales('password','password2')]
  })


  get emailErrorMsj(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
    return 'Email es obligatorio';
  }
  else if(errors?.pattern){
    return 'El formato es incorrecto';
  }
  else if(errors?.emailTomado){
    return 'El email ya fue tomado'
  }
  return '';
  }
  constructor(private fb: FormBuilder,
              private validatorService: ValidatorsService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando_her85@',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid 
    && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

 


}
