import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) { }

  successSnack(message: string) {
    this.openSnackBar(message, 'snack-success');
  }

  errorSnack(message: string) {
    this.openSnackBar(message, 'snack-error');
  }

  openSnackBar(message: string, typeClass: 'snack-error' | 'snack-success' | 'none') {
    this.ngZone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 8000,
        panelClass: [typeClass],
      });
    });
  }
}
