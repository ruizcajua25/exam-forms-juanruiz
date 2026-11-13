import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Letras (con tildes, ü y ñ) separadas por un solo espacio, sin espacios al principio ni al final
export const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
// 9 dígitos que empiezan por 6, 7, 8 o 9, con +34 delante opcional (con o sin espacio)
export const TELEFONO = /^(\+34 ?)?[6-9]\d{8}$/;
// Como SOLO_LETRAS, pero las palabras pueden ir separadas por espacio o guion
export const NOMBRE_MASCOTA = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+([ -][a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
// Exactamente 15 dígitos
export const MICROCHIP = /^\d{15}$/;
// Al menos una minúscula, una mayúscula y un número, sin espacios (la longitud la controlan minLength/maxLength)
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form {
  mascotaForm = new FormGroup({
    //   Nombre (text)
    // Validaciones: required, mínimo 2, máximo 30, pattern: solo letras (con tildes y ñ) y espacios.
    // Errores: «El nombre es obligatorio», «Mínimo 2 caracteres», «Máximo 30 caracteres», «Solo se permiten letras».
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(SOLO_LETRAS)]), 
    // Apellidos (text)
    // Validaciones: required, mínimo 2, máximo 50, mismo pattern que Nombre.
    // Errores: análogos a Nombre.
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(SOLO_LETRAS)]), 
    // Teléfono de contacto (tel)
    // Validaciones: required, pattern: 9 dígitos que empiecen por 6, 7, 8 o 9, con prefijo +34 opcional.
    // Errores: «El teléfono es obligatorio», «Introduce un teléfono español válido».
    telefono: new FormControl('', [Validators.required, Validators.pattern(TELEFONO)]),
    // Email (email)
    // Validaciones: required, email.
    // Errores: «El email es obligatorio», «Formato de email no válido».
    email: new FormControl('', [Validators.required, Validators.email]),
    // Nombre de la mascota (text)
    // Validaciones: required, mínimo 2, máximo 20, pattern: solo letras, espacios y guiones.
    // Errores: «El nombre de la mascota es obligatorio», «Entre 2 y 20 caracteres», «Solo letras, espacios y guiones».
    nombreMascota: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(NOMBRE_MASCOTA)]),
    // Especie (select: Perro, Gato, Ave, Otro)
    // Validaciones: required.
    // Errores: «Selecciona una especie».
    especie: new FormControl('', [Validators.required]),
    // Sexo (radio: Macho / Hembra)
    // Validaciones: required.
    // Errores: «Indica el sexo de la mascota».
    sexo: new FormControl('', [Validators.required]),
    // Raza (text, opcional)
    // Validaciones: máximo 40.
    // Errores: «Máximo 40 caracteres».
    raza: new FormControl('', [Validators.maxLength(40)]),
    // Edad en años (number)
    // Validaciones: required, mínimo 0, máximo 30.
    // Errores: «La edad es obligatoria», «La edad debe estar entre 0 y 30 años».
    edadYears: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(30)]),
    // Peso en kg (number, admite decimales)
    // Validaciones: required, mínimo 0.1, máximo 90.
    // Errores: «El peso es obligatorio», «El peso debe estar entre 0,1 y 90 kg».
    pesoKg: new FormControl<number | null>(null, [Validators.required, Validators.min(0.1), Validators.max(90)]),
    // Número de microchip (text)
    // Validaciones: required, pattern: en España sigue la norma internacional ISO 11784/11785 (estándar FDX-B), exactamente 15 dígitos numéricos.
    // Errores: «El microchip es obligatorio», «El microchip debe tener exactamente 15 dígitos numéricos».
    numeroChip: new FormControl('', [Validators.required, Validators.pattern(MICROCHIP)]),
    // Contraseña (password)
    // Validaciones: required, mínimo 10 y máximo 24, pattern: al menos una mayúscula, una minúscula y un número, sin espacios.
    // Errores: un mensaje por cada requisito incumplido.
    password: new FormControl('', [Validators.required, Validators.min(10), Validators.max(24), Validators.pattern(PASSWORD)]),
    // Motivo de la primera visita (textarea)
    // Validaciones: required, mínimo 10, máximo 300.
    // Errores: «Describe el motivo de la visita», «Entre 10 y 300 caracteres».
    motivoVista: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    // Acepto la política de privacidad (checkbox)
    // Validaciones: requiredTrue.
    // Errores: «Debes aceptar la política de privacidad».
    politicaPrivacidad: new FormControl<boolean>(false, [Validators.requiredTrue]),
    // Quiero recibir recordatorios de vacunas por email (checkbox, opcional)
    // Sin validación.
    recordatorios: new FormControl<boolean>(false)
  })  
}
