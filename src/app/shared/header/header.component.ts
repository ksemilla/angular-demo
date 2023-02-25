import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GOOGLE_LANGUAGES } from 'src/app/const';
import { TasksService } from 'src/app/tasks/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  loading: boolean = false
  languages: { name: string, code: string }[] = GOOGLE_LANGUAGES
  filteredOptions: Observable<{ name: string, code: string }[]>

  constructor(private authService: AuthService, private taskService: TasksService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): { name: string, code: string }[] {
    const filterValue = value.toLowerCase();

    return this.languages.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onLogout() {
    this.authService.logout()
  }

  myControl = new FormControl('');

  async onSubmit() {
    const language = this.languages.find(lang => lang.name.toLowerCase().includes(this.myControl.value?.toLowerCase() ?? ''))
    language && this.taskService.translateTaskItems(language?.code ?? "").subscribe(val => {
      this.taskService.serviceTasks.next(val)
    })
  }

}
