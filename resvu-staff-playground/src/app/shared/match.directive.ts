import { AbstractControl, ControlContainer, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldRegex(field1: string, field2: string, exp: RegExp):
ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const origin = control.get(field1)?.value;
        const check = control.get(field2)?.value;

        if (!origin && !check) {
            return null;
        }

        if (!origin.match(exp) || origin !== check) {
            if (!origin.match(exp) && origin !== check) {
                control.get(field1)?.setErrors({pmatch: true});
                control.get(field2)?.setErrors({nmatch: true});
                return {bothMismatch: true};
            }
            if (origin !== check) {
                control.get(field1)?.setErrors({nmatch: true});
                control.get(field2)?.setErrors({nmatch: true});
                return {mismatch: true};
            } else {
                control.get(field2)?.setErrors(null);
            }
            control.get(field1)?.setErrors({pmatch: true});
            return {regMismatch: true};
        }
        control.get(field1)?.setErrors(null);
        control.get(field2)?.setErrors(null);

        return null;
    };
}
