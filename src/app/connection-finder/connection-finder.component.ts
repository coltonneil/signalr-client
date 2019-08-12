import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection-finder',
  templateUrl: './connection-finder.component.html',
  styleUrls: ['./connection-finder.component.scss']
})
export class ConnectionFinderComponent implements OnInit {
  groupId: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(searchForm): void {
    if (searchForm.valid) {
      this.router.navigateByUrl(`${this.groupId}`);
    } else {
      searchForm.form.controls.code.markAsTouched();
      searchForm.form.controls.code.markAsDirty();
    }
  }
  onChange() {
    if (this.groupId) {
      this.groupId = this.groupId.toLocaleUpperCase();
    }
  }
}
