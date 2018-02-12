import {
	trigger,state,style,animate,transition,group,keyframes,query,stagger
} from '@angular/animations';

export let scaleItem = trigger('flyInOut', [
	state('small', style({ opacity: .6, transform: 'scale(1)', backgroundColor: '#faf' })),
	state('large', style({
		opacity: 1, transform: 'scale(1.2)', backgroundColor: '#eee',
	})),
	transition('small <=> large', animate('300ms ease-in', style({
		transform: 'translateY(50px)'
	})))
]);
export let listAnim = trigger('listAnimation', [
	transition('*=>*', [
		query(':enter', style({
			opacity: 0
		}), { optional: true }),
		query(':enter', stagger('200ms', [
			animate('1s ease-in', keyframes([
				style({ opacity: 0, transform: 'translateY(-77px)', offset: 0 }),
				style({ opacity: .5, transform: 'translateY(37px)', offset: .3 }),
				style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
			]))
		]), { optional: true }),
		query(':leave', stagger('200ms', [
			animate('1s ease-in', keyframes([
				style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
				style({ opacity: .5, transform: 'translateY(37px)', offset: .3 }),
				style({ opacity: 0, transform: 'translateY(-77px)', offset: 1 }),
			]))
		]), { optional: true }),
	])
]);
export let leftToRight = trigger('explainerAnim', [
	transition('*=>*', [
		query('.well', style({ opacity: 0, transform: 'translateX(-40px)' })),
		query('.well', stagger('500ms', [
			animate('800ms 1.2ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
		]))
	])
])
export let fallFromTop = trigger('movePanel', [
	transition('void => *', [
		animate(600, keyframes([
			style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
			style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
			style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
		]))
	])

])
