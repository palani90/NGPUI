import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CloseType } from '../../models/popup.model';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent  {
  @Input('showPopup') showPopup = false;
  @Output('popupAction') popupAction = new EventEmitter<CloseType>();
  @Input("title") title = "";
  @Input("description") description =""
  @Input('isHeader') isHeader =false;
  
 /**
   * Triggers on click of close, calvel and continue
   * @param status 
   */
  clickAction(status: CloseType): void {
    this.popupAction.emit(status);
  }
 

}