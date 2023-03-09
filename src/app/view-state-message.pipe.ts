import { Pipe, PipeTransform } from '@angular/core';
import { ViewState } from './enums/view-state';
import { ViewStatusService } from './services/view-status.service';

@Pipe({
  name: 'viewStateMessage',
})
export class ViewStateMessagePipe implements PipeTransform {

  constructor (private viewStatusMessageService: ViewStatusService){}

  transform(value: ViewState): string {
    return this.viewStatusMessageService.message(value);
  }
}
