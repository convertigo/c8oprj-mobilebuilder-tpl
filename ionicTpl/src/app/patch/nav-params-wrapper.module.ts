import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverController, ModalController } from '@ionic/angular';
import { NavParamsCompatModule } 		from './nav-params-compat.module';
import { NavParamsWrapperService } 	from './nav-params-wrapper.service';

export function applyOverlayPatch(patch: NavParamsWrapperService) {
  return () => patch.apply();
}

export function patchModalController(patch: NavParamsWrapperService) {
  return patch.getModalController();
}
export function patchPopoverController(patch: NavParamsWrapperService) {
  return patch.getPopoverController();
}

@NgModule({
  declarations: [],
  imports: [
	CommonModule,
	NavParamsCompatModule
],
  providers: [
	{
	  provide: APP_INITIALIZER,
	  useFactory: applyOverlayPatch,
	  deps: [NavParamsWrapperService],
	  multi: true
	},
	  {
	    provide: ModalController,
	    useFactory: patchModalController,
	  	deps: [NavParamsWrapperService]
	  },
	  {
	    provide: PopoverController,
	    useFactory: patchPopoverController,
	  	deps: [NavParamsWrapperService]
	  },
  ],
  exports: [],
})
export class NavParamsWrapperModule {}
