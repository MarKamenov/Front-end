import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ 
	// tslint:disable-next-line:pipe-naming
	name: 'objNgFor', 
	pure: false 
	})
export class ObjFilter implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value)
	}
}