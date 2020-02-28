// Anguler Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, SharedModule, ContactsRoutingModule]
})
export class ContactsModule {}
