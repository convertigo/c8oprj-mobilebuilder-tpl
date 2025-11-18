import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[throttleEvent]',
  standalone: true,
})
export class ThrottleEventDirective implements OnInit, OnDestroy {
  @Input() throttleTime = 400; // in milliseconds
  @Input() throttleType = 'click'; // or 'tap', 'submit', etc.

  @Output() throttleEvent = new EventEmitter<Event>();

  private locked = false;
  private removeListener?: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // On attache dynamiquement l'événement
    this.removeListener = this.renderer.listen(
      this.el.nativeElement,
      this.throttleType,
      (event: Event) => this.handleEvent(event)
    );
  }

  private handleEvent(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.locked) {
      return;
    }

    this.locked = true;
    this.throttleEvent.emit(event);

    setTimeout(() => (this.locked = false), this.throttleTime);
  }

  ngOnDestroy() {
    if (this.removeListener) {
      this.removeListener();
    }
  }
}
