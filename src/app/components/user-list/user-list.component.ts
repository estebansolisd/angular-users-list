import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = false;
  errorMessage = "";
  search = "";

  constructor(private userService: UsersService) {}

  loadUsers() : void{
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users as User[];
        this.filteredUsers = users as User[];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load users!', error);
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  filterSearch() : void {
    this.filteredUsers = this.users.filter((user) => {
      return user.name.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
