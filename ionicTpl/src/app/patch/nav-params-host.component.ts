import { Component, Input, OnInit, AfterViewInit, Injector, ElementRef, ViewChild, ViewContainerRef, Type, EnvironmentInjector } from '@angular/core';
import { NavParams } from './nav-params';

@Component({
  selector: 'navparams-host',
  template: `<ng-template #vc></ng-template>`,
  styles: [  `
      :host {
        display: block;
      }

      :host(.modal) {
        height: 100%;
      }

      :host(.popover) {
        height: auto;
        max-height: 80vh;
      }
    `]
})
export class NavParamsHostComponent implements OnInit, AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef, static: true }) vc!: ViewContainerRef;

  @Input() __wrapped!: Type<any>;
  @Input() __forwardProps: Record<string, any> = {};
  @Input() __navData: Record<string, any> = {};

  constructor(
	private el: ElementRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector,
  ) {}

  ngOnInit(): void {
    const overlayNavParams = new NavParams(undefined as any);
    overlayNavParams._prime(this.__navData || this.__forwardProps || {});

    const childInjector = Injector.create({
      providers: [
		{ provide: NavParams, useValue: overlayNavParams }
      ],
      parent: this.injector
    });

    const ref = this.vc.createComponent(this.__wrapped, {
      injector: childInjector,
      environmentInjector: this.envInjector
    });

    Object.assign(ref.instance as object, this.__forwardProps);
    ref.changeDetectorRef.detectChanges();
  }
  
  ngAfterViewInit() {
    const parent = this.el.nativeElement.closest('ion-modal, ion-popover');
    if (parent?.tagName === 'ION-MODAL') {
      this.el.nativeElement.classList.add('modal');
    } else if (parent?.tagName === 'ION-POPOVER') {
      this.el.nativeElement.classList.add('popover');
    }
  }
  
}
