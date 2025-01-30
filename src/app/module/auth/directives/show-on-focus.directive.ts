import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowOnFocus]'
})
export class ShowOnFocusDirective {

  constructor(private _el: ElementRef, private _viewContainer: ViewContainerRef) { }

  @Input('appShowOnFocus') templateRef!: TemplateRef<any>;

  @HostListener('focusin', ['$event']) onFocus(event: FocusEvent) {
    this._viewContainer.createEmbeddedView(this.templateRef);
  }
  @HostListener('focusout', ['$event']) onFocusOut(event: FocusEvent) {
    this._viewContainer.clear();
  }

  private isPrimeNgPasswordInput(target: EventTarget | null): boolean {
    return target instanceof HTMLInputElement && this._el.nativeElement.querySelector('input') === target;
  }

}
