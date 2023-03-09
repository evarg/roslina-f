import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewState } from '../enums/view-state';
import { ViewStatusService } from './view-status.service';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    private _snackBar: MatSnackBar,
    private viewStateMessageService: ViewStatusService
  ) {}

  public show(viewState: ViewState): void {
    this._snackBar.open(
      this.viewStateMessageService.message(viewState),
      'Zamknij',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
