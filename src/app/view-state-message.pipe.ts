import { Pipe, PipeTransform } from '@angular/core';
import { ViewState } from './enums/view-state';

@Pipe({
  name: 'viewStateMessage',
})
export class ViewStateMessagePipe implements PipeTransform {
  transform(value: ViewState): string {
    var message = 'Nieznany status';

    switch (value) {
      case ViewState.LOADING: {
        message = 'Ładowanie';
        break;
      }
      case ViewState.SUCCESS: {
        message = 'Załadowano';
        break;
      }
      case ViewState.ERROR: {
        message = 'Błąd ogólny';
        break;
      }
      case ViewState.CLOSE: {
        message = 'Zamykanie widoku';
        break;
      }
      case ViewState.LOAD_ATTEMPT: {
        message = 'Próba odczytu';
        break;
      }
      case ViewState.LOAD_SUCCESS: {
        message = 'Odczytano';
        break;
      }
      case ViewState.LOAD_ERROR: {
        message = 'Błąd odczytu';
        break;
      }
      case ViewState.SAVE_ATTEMPT: {
        message = 'Próba zapisu';
        break;
      }
      case ViewState.SAVE_SUCCESS: {
        message = 'Zapisano';
        break;
      }
      case ViewState.SAVE_ERROR: {
        message = 'Błąd zapisu';
        break;
      }
      default: {
        message = 'Nieznany status';
        break;
      }
    }
    return message;
  }
}
