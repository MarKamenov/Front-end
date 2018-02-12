import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';
// import { ElementRef, Renderer } from '@angular/core';

@Directive({
	selector: '[active]'
})
export class ActiveDirective implements  OnInit {
	@HostListener('onClick') onClick() {
		this.backgroundColor = this.activeClass;
	};

	@HostBinding('style.backgroundColor') get setColor() {
		return this.defaultColor;
	};
	@Input() defaultColor = 'white';
	// tslint:disable-next-line:no-input-rename
	@Input('active') activeClass = 'green';

	// constructor(private elementRef: ElementRef, private renderer: Renderer) {}

	private backgroundColor: string;
	constructor() {
		// this.elementRef.nativeElement.style.backgroundColor = 'green';
		// this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', 'green');
	}
	ngOnInit() {
		this.backgroundColor = this.defaultColor;
	}
}
