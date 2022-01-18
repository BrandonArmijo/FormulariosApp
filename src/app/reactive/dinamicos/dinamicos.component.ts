  import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: []
})
export class DinamicosComponent {

  constructor(private fb: FormBuilder) {
  }

  miFormularioDos: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miFormularioDos.get('favoritos') as FormArray;
  }

  agregarFavorito(): void{
    if (this.nuevoFavorito.invalid) {
      return;
    }

    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required) );

    this.nuevoFavorito.reset();
  }

  campoEsValido(campo: string) {
    return this.miFormularioDos.controls[campo].errors && this.miFormularioDos.controls[campo].touched;
  }

  eliminar(i: number){
    this.favoritosArr.removeAt(i);
  }
  
  guardar() {
    if (this.miFormularioDos.invalid) {
      this.miFormularioDos.markAllAsTouched();
      return;
    }
    console.log(this.miFormularioDos.value);
  }

}
