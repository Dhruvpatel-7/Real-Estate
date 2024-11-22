import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store.service';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css'
})

export class AdminpanelComponent implements OnInit {

  public users: any = [];
  public fullName: string = "";
  public role: string = "";
  public user = {
    id : 0,
    name: '',
    email: '',
    phone: ''
  };

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userStore.getFullNameFromStore().subscribe(val => {
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  loadUsers(): void {
    this.api.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Updated deleteCard() method with SweetAlert2
  deleteCard(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    // }).then((result) => {
    //   //if (result.isConfirmed) {
    //     // Proceed with the deletion (Example: Call API to delete the user or remove from array)
    //     //this.api.deleteUser(userId).subscribe(
    //       (response) => {
    //         // Remove from local users array if needed
    //         this.users = this.users.filter((user: any) => user.id !== userId);
    //         Swal.fire(
    //           'Deleted!',
    //           'The user has been deleted.',
    //           'success'
    //         );
    //       },
    //       (error) => {
    //         Swal.fire(
    //           'Error!',
    //           'There was an issue deleting the user.',
    //           'error'
    //         );
    //       }
    //     );
    //   }
    });
  }

  editCard(): void {
    // Logic for editing a card
    console.log('Edit card clicked');
  }

  subscribe(): void {
    // Logic for subscription
    console.log('Subscribe clicked');
  }

  logout(): void {
    this.auth.signOut();
  }

  onSubmit(): void {
    console.log('Form submitted with data: ', this.user);
  }

  toggleEdit(): void {
    // Logic for toggling the edit state (e.g., showing edit fields)
  }
}
