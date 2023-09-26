import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.css'],
})
export class StatusMessageComponent {
  @Input() showMessage: any;
  @Input('status') status: string;
  @Input('statusMessage') statusMessage: string;
  @Output() closeMessage = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log(this.showMessage);
  }

  close() {
    this.closeMessage.emit(true);
  }
}
