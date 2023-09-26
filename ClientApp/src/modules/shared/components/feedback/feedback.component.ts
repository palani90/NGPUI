import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CustomOverlayRef } from '../../custom-overlay/custom-overlay/custom-overlay-ref';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UseCaseViewService } from '../../services/usecaseView.service';
import { CUSTOM_OVERLAY_DATA } from '../../custom-overlay/custom-overlay/custom-overlay';
import { VALIDATORS } from '../../config/app-constants';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  feedbackForm: UntypedFormGroup;
  showToastMessage: boolean = false;
  isloading = false;
  validators = VALIDATORS;
  activatePage = false;
  constructor(
    private overlayRef: CustomOverlayRef,
    public formBuilder: UntypedFormBuilder,
    public usecaseViewService: UseCaseViewService,
    @Inject(CUSTOM_OVERLAY_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      options: ['Report an Issue', Validators.required],
      comments: ['', [Validators.required, Validators.maxLength(5000), Validators.pattern(/[a-zA-Z0-9]/)]]
    });
    this.feedbackForm.valueChanges.subscribe((res) => console.log(res));
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.activatePage = true;
    },100)
  }
  submitForm() {
    this.isloading = true;
    const formValue = this.feedbackForm.getRawValue();
    this.usecaseViewService.sendFeedbackDetails(formValue.options, formValue.comments).subscribe((res) => {
      if (res && res.responseData) {
        this.isloading = false;
        this.closedialog(true);
      }
    });
  }

  closedialog(state = false) {
    this.overlayRef.close({ state });
  }
}
