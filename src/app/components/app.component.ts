import { AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { dismissModal, ModalService } from '@siemens/ix-angular';
import { ResolutionNotSupportedDialogComponent } from './resolution-not-supported-dialog/resolution-not-supported-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  resolutionSupported = true;
  private _modalRef: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private readonly modalService: ModalService) {
    this._modalRef = null;
  }

  ngAfterViewInit(): void {
    this.checkResolutionSupport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkResolutionSupport();
  }

  private checkResolutionSupport() {
    this.resolutionSupported = this.minPortraitDimensionsSupported() ||
      this.minLandscapeDimensionsSupported();
    // the below line is required to avoid ExpressionChangedAfterItHasBeenCheckedError
    // more information here: https://angular.io/errors/NG0100
    this.changeDetectorRef.detectChanges();

    if (!this.resolutionSupported) {
      this.openResolutionNotSupportedModalDialog();
    } else if (this.resolutionSupported) {
      this.closeResolutionNotSupportedModalDialog();
    }
  }

  private async openResolutionNotSupportedModalDialog() {
    this._modalRef = await this.modalService.open({
      content: ResolutionNotSupportedDialogComponent,
      title: 'ATO TS Diagnostics',
      keyboard: false,
    });
  }

  private closeResolutionNotSupportedModalDialog() {
    if (this._modalRef) {
      dismissModal(this._modalRef.htmlElement);
      this._modalRef = null;
    }
  }

  private minPortraitDimensionsSupported(): boolean {
    return (
      window.innerWidth <= window.innerHeight &&
      window.innerWidth >= environment.minPortraitWidth &&
      window.innerHeight >= environment.minPortraitHeight
    );
  }

  private minLandscapeDimensionsSupported(): boolean {
    return (
      window.innerWidth > innerHeight &&
      window.innerWidth >= environment.minLandscapeWidth &&
      window.innerHeight >= environment.minLandscapeHeight
    );
  }
}
