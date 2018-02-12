import { NgModule, ModuleWithProviders  } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser"
import { CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ApiService } from './api-service'
import { FilterService } from './filter-service'
import { ActiveDirective } from "./active.directive";
import { Level2Service } from './level2-service'
import { AppComponent } from './app.component'
import { ObjFilter } from './obj.pipe'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {DataTableModule,DropdownModule , TreeNode, SharedModule, ContextMenuModule } from 'primeng/primeng';


@NgModule({
	imports: [BrowserModule, FormsModule,CommonModule, HttpModule, BrowserAnimationsModule, DropdownModule,ContextMenuModule, DataTableModule, SharedModule],
	declarations: [AppComponent, ObjFilter, ActiveDirective],
	providers:[ApiService, Level2Service, FilterService],
	bootstrap: [AppComponent]
})
export class AppModule {

}