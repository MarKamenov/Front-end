import { QueryEncoder } from '@angular/http';
import { FilterService } from './filter-service';
import { Component, Pipe, ElementRef, Renderer2, EventEmitter, PipeTransform, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DataTableModule, TreeNode, SharedModule, ContextMenuModule, MenuItem, ContextMenu } from 'primeng/primeng';
import { ApiService } from './api-service'
import { Level2Service } from './level2-service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import { DataTable } from 'primeng/components/datatable/datatable';
import {scaleItem, listAnim, leftToRight, fallFromTop} from './animations'

@Component({
	moduleId: module.id,
	selector: 'app-ap',
	templateUrl: 'acc-demo.html',
	styleUrls: ['app.component.css'],
	animations: [
		scaleItem, listAnim, leftToRight, fallFromTop	
	]
})

export class AppComponent implements AfterViewInit, OnInit {

	//@ViewChild(DataTable) dataTableComponent: DataTable;
	@ViewChild('dt') dataTable: DataTable
	level1Data: TreeNode[] = []
	level2Data: TreeNode[] = []
	selectedBreaches: any[] = null;
	breachesFilters: { level?: number, contractId?: string, siteId?: string, breachType?: number } = {}
	cols: any[]
	loading: boolean;
	toggleText: boolean = false;
	contractName: string = null
	siteName: string | number = null
	breachType1: string = null
	breachType2: string = null
	breachType3: string = null
	items: any[]
	colors: any[]
	active: boolean = true
	private nativeElement: any;
	activeCells: any[]
	state: string = 'small'


	constructor(private level2Service: Level2Service, private apiService: ApiService, private filterService: FilterService, private renderer: Renderer2, private element: ElementRef
	) { this.nativeElement = element.nativeElement; }

	ngAfterViewInit() {
		this.loadLevel1Data()
	}
	ngOnInit() {
		this.cols = [
			{ field: 'path', header: 'Target' },
			{ field: 'rule', header: 'Rule' },
			{ field: 'startDate', header: 'Start Date' },
			{ field: 'endDate', header: 'End Date' },
			{ field: 'durationSeconds', header: 'Duration' }
		];
		this.items = [
			{ label: 'View breach', icon: ' fa-list', command: (event) => this.viewBreach() },
			{ label: 'Create ticket', icon: 'fa-ticket', command: (event) => this.createTicket() }
		];
		this.colors = [
			{ label: 'White', value: 'White' },
			{ label: 'Green', value: 'Green' },
			{ label: 'Silver', value: 'Silver' },
			{ label: 'Black', value: 'Black' },
			{ label: 'Red', value: 'Red' },
			{ label: 'Maroon', value: 'Maroon' },
			{ label: 'Brown', value: 'Brown' },
			{ label: 'Orange', value: 'Orange' },
			{ label: 'Blue', value: 'Blue' }
		]
	}

	addItem(){
		this.colors.push({ label: 'Blue', value: 'Aliceblue' })
	}

	removeItem(){
		this.colors.pop()
	}

	animate() {
		this.state = (this.state = 'small' ? 'large' : 'small')
	}
//some comment adde for testing adding some test is necessary
	viewBreach() {
		alert('View breach event fired')
	}
	createTicket() {
		alert('Create ticket event fired')
	}

	loadLevel1Data(): void {
		this.apiService.request('contracts.json').subscribe(data => {
			this.level1Data = data
		})
	}

	loadLevel2Data(event): void {
		//this.collapseRow()
		this.loading = true;
		this.level2Service.getLevel2Data(event.data.contractId).subscribe(childNodes => {
			this.level2Data = childNodes
			this.loading = false;
		})
	}

	collapseRow() {
		this.level2Data = null
		this.clearSelected()
	}

	cellClick(ev: any) {
		let event = ev.target ? ev.target : ev.originalEvent.target
		let targetClass = event.className
		let cellIndex = event.cellIndex
		//this.nativeElement = event
		//this.nativeElement.classList.add('active')
		//this.isActive = true
		//this.renderer.addClass(event,'active')
		//event.classList.add('active')
		this.loading = true;
		if (targetClass.includes('level2')) {
			this.breachesFilters.level = 2
			this.toggleText = true
			switch (cellIndex) {

				case 1://sites selected
					this.breachesFilters.siteId = ev.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML

					this.breachesFilters.contractId = ev.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML

					this.breachesFilters.breachType = null

					this.contractName = ev.target.previousElementSibling.innerHTML
					this.siteName = ev.target.innerHTML
					this.breachType1 = null
					this.breachType2 = null
					this.breachType3 = null
					break;
				case 2://asset
					this.breachesFilters.breachType = 1
					if (this.breachesFilters.breachType === 1) {

						this.breachesFilters.siteId = ev.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML

						this.breachesFilters.contractId = ev.target.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML

						this.contractName = ev.target.previousElementSibling.previousElementSibling.innerHTML
						this.siteName = ev.target.previousElementSibling.innerHTML
						this.breachType1 = ev.target.innerHTML
						this.breachType2 = null
						this.breachType3 = null
					}
					break;
				case 3: //energy
					this.breachesFilters.breachType = 2
					if (this.breachesFilters.breachType === 2) {

						this.breachesFilters.siteId = ev.target.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML

						this.breachesFilters.contractId = ev.target.nextElementSibling.nextElementSibling.innerHTML

						this.contractName = ev.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
						this.siteName = ev.target.previousElementSibling.previousElementSibling.innerHTML
						this.breachType1 = null
						this.breachType2 = ev.target.innerHTML
						this.breachType3 = null
					}
					break;
				case 4://HPW
					this.breachesFilters.breachType = 3
					if (this.breachesFilters.breachType === 3) {

						this.breachesFilters.siteId = ev.target.nextElementSibling.nextElementSibling.innerHTML

						this.breachesFilters.contractId = ev.target.nextElementSibling.innerHTML

						this.contractName = ev.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
						this.siteName = ev.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
						this.breachType1 = null
						this.breachType2 = null
						this.breachType3 = ev.target.innerHTML
					}
					break;
			}
		}
		else if (ev.data.level === 1) {
			this.breachesFilters.level = ev.data.level
			this.toggleText = false
			switch (cellIndex) {
				case 1: //sites
					this.breachesFilters.contractId = ev.data.contractId
					this.contractName = ev.data.contractName
					this.siteName = ev.originalEvent.target.innerText
					this.breachType1 = null
					this.breachType2 = null
					this.breachType3 = null
					this.breachesFilters.breachType = null
					break;
				case 2: //asset
					this.breachesFilters.breachType = 1
					if (this.breachesFilters.breachType === 1) {
						this.contractName = ev.data.contractName
						this.siteName = ev.originalEvent.target.previousElementSibling.innerText
						this.breachType1 = ev.data.assetRuleBreaches
						this.breachType2 = null
						this.breachType3 = null
						this.breachesFilters.contractId = ev.data.contractId
					}
					break;
				case 3: //energy
					this.breachesFilters.breachType = 2
					if (this.breachesFilters.breachType === 2) {
						this.contractName = ev.data.contractName
						this.siteName = ev.originalEvent.target.previousElementSibling.previousElementSibling.innerText
						this.breachType1 = null
						this.breachType2 = ev.data.energyRuleBreaches
						this.breachType3 = null
						this.breachesFilters.contractId = ev.data.contractId
					}
					break;
				case 4: //hpw
					this.breachesFilters.breachType = 3
					if (this.breachesFilters.breachType === 3) {
						this.contractName = ev.data.contractName
						this.siteName = ev.originalEvent.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText
						this.breachType1 = null
						this.breachType2 = null
						this.breachType3 = ev.data.hpwBreaches
						this.breachesFilters.contractId = ev.data.contractId
					}
					break;
			}
		}

		this.filterService.getFilteredData(this.breachesFilters).subscribe(breaches => {
			this.selectedBreaches = breaches
			this.loading = false;
		})
	}

	clearSelected() {
		this.selectedBreaches = null
		//this.isActive = false
		let selectedCells = this.nativeElement.offsetParent.querySelectorAll('td.active') || ''
		let len = selectedCells.length
		for (let i = 0; i < len; i += 1) {
			let cell = selectedCells[i]
			if (cell !== undefined) {
				cell.classList.remove('active')
			}
		}
		//this.nativeElement.classList.remove("active");
	}

	select(item) {
		this.activeCells = item;
	};

	isActive(item) {
		return this.activeCells === item;
	};

	reset() {
		this.dataTable.reset()
	}

}

