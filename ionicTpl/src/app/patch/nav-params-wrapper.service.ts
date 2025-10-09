import { Injectable } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular/standalone';
import { NavParamsHostComponent } from './nav-params-host.component';

type AnyOpts = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class NavParamsWrapperService {
  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  apply(): void {
    const wrapOpts = (opts: AnyOpts): AnyOpts => {
      if (!opts || !opts.component || opts.component === NavParamsHostComponent) {
        return opts;
      }
      const originalComponent = opts.component;
      const props = opts.componentProps || {};

      return {
        ...opts,
        component: NavParamsHostComponent,
        componentProps: {
          __wrapped: originalComponent,
          __forwardProps: props,
          __navData: props
        }
      };
    };

    // Patch ModalController
    const origModalCreate = this.modalCtrl.create.bind(this.modalCtrl);
    (this.modalCtrl as any).create = (opts: AnyOpts) => origModalCreate(wrapOpts(opts));

    // Patch PopoverController
    const origPopoverCreate = this.popoverCtrl.create.bind(this.popoverCtrl);
    (this.popoverCtrl as any).create = (opts: AnyOpts) => origPopoverCreate(wrapOpts(opts));
  }
  

  public getModalController() : ModalController {
  return this.modalCtrl;
  }

  public getPopoverController() : PopoverController {
  	return this.popoverCtrl;
  }
  
}
