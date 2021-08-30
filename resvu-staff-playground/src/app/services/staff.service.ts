import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  public currentStaffId: string;
  constructor() { }

}
