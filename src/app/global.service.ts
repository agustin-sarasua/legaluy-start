import { Business } from './models/model';
import { Injectable, TemplateRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  business: Business = {} as Business;

  setBusiness(business: Business): void {
    this.business = business;
  }

  getBusiness(): Business {
    return this.business;
  }

  private overlayRef: OverlayRef | null = null;

  private loadingOverlayTemplate: TemplateRef<any> | undefined;

  constructor(private overlay: Overlay) {}

  init(loadingOverlayTemplate: TemplateRef<any>): void {
    this.loadingOverlayTemplate = loadingOverlayTemplate;
  }

  showLoading(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });
      this.overlayRef.attach(new ComponentPortal(MatSpinner));
    }
  }

  hideLoading(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
