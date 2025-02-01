import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRouting } from './routes/admin.routing';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { reducers as adminReducer } from './store/reducer';
import { AdminEffect } from './store/effect';
import { EffectsModule } from '@ngrx/effects';

import { DisplayProfessionalToActivateListPageComponent } from './pages/display-professional-to-activate-list-page/display-professional-to-activate-list-page.component';
import { ProfessonalToActivateResumeComponent } from './components/professonal-to-activate-resume/professonal-to-activate-resume.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { LocalTimePipe } from './pipes/local-time.pipe';
import { ProfessionalToActivateDetailPageComponent } from './pages/professional-to-activate-detail-page/professional-to-activate-detail-page.component';



@NgModule({
  declarations: [
    DisplayProfessionalToActivateListPageComponent,
    ProfessonalToActivateResumeComponent,
    LocalDatePipe,
    LocalTimePipe,
    ProfessionalToActivateDetailPageComponent
  ],
  imports: [
    RouterModule.forChild(adminRouting),
    StoreModule.forFeature('adminState', adminReducer),
    EffectsModule.forFeature([
      AdminEffect
    ]),
    CommonModule
  ]
})
export class AdminModule { }
