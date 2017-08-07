import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnChanges {

  @Input('menu')
  menu: String;

  appNavigation: any = {
      sales: [
        {
          label: 'Invoices', link: '/sales/invoices'
        },
        {
          label: 'Estimates', link: '/sales/estimates'
        }
      ],
      purchases: [
        {
          label: 'Expenses', link: '/purchases/expenses',
        },
        {
          label: 'Bills', link: '/purchases/bills'
        }
      ],
      contacts: [
        {
          label: 'All Contacts', link: '/contacts/all'
        },
        {
          label: 'Employees', link: '/contacts/employees'
        }
      ],
      settings: [
        {
          label: 'Profile', link: '/settings/profile'
        },
        {
          label: 'Account', link: '/settings/account'
        }
      ]
  }

  activeNav: any;

  constructor() { }

  setActiveNav() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const nav = changes.menu.currentValue;
    this.activeNav = this.appNavigation[nav];
  }
}
