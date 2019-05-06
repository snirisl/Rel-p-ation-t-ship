import { Component, OnInit } from '@angular/core';
import { AddPatientService } from 'src/app/add-patient/add-patient.service';
import { AddPatient } from 'src/app/add-patient/add-patient.model';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss']
})
export class ManageUsersPage implements OnInit {
  addedUsers: AddPatient[];
  constructor(private addPatientService: AddPatientService) {}

  ngOnInit() {
    this.addPatientService.getAddedUsers().subscribe(data => {
      this.addedUsers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as AddPatient;
      });
    });
  }

  create(addedUser: AddPatient) {
    this.addPatientService.add(addedUser);
  }

  update(addedUser: AddPatient) {
    this.addPatientService.updateAddedUser(addedUser);
  }

  delete(id: string) {
    this.addPatientService.deleteAddedUser(id);
  }
}
