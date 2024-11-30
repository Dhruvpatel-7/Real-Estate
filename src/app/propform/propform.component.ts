import { Component, ChangeDetectorRef } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Properties } from '../models/property.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propform',
  templateUrl: './propform.component.html',
  styleUrls: ['./propform.component.css']
})
export class PropformComponent {
  property: Properties = {
    Id: 0,
    Name: '',
    Price: '',
    Description: '',
    ContactNo: '',
    PropertySize: '',
    PropertyConfiguration: '',
    State: '',
    District: '',
    Address: '',
    Aminities: '',
    LocationURL: '',
    UserId: 0  // Ensure UserId is part of the property object
  };
  images: File[] = [];
  successMessage = '';
  imagesPreview: string[] = [];
  imageError: string = '';

  constructor(private cdr: ChangeDetectorRef, private propertyService: PropertyService, private router: Router) {}

  // Handles file selection
  onFileChange(event: any): void {
    const files = event.target.files;
    this.imagesPreview = [];  // Clear previously selected images
    this.imageError = '';  // Clear previous image error message

    if (files.length > 0) {
      for (let file of files) {
        // Validate file size (max 200KB)
        if (file.size > 200 * 1024) {
          this.imageError = 'Each image must be less than 200KB.';
          break;
        }

        // Convert file to base64 string for preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreview.push(reader.result as string);
          this.cdr.detectChanges();  // Trigger change detection after adding to the array
        };
        reader.readAsDataURL(file);
      }
    }
  }

  private getUserId(): number {
    // Replace this logic with how you actually store/retrieve the logged-in user's ID
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user ? user.id : null;  // Assume the user object contains the 'id' field
  }

  // Remove image by index
  removeImage(index: number): void {
    this.imagesPreview.splice(index, 1);
  }

  // Handles form submission
  onSubmit() {
    const userId = 2;  // Retrieve the user ID

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'User not logged in',
        text: 'Please log in to add a property.',
        iconColor: 'black',
        background: 'yellow',
        color: 'black',
        timer: 3000,
        position: 'top-end',
        toast: true,
        showConfirmButton: false
      });
      return; // Prevent form submission if user is not logged in
    }

    // Add the user ID to the property object before submitting
    this.property.UserId = userId;
    
    // Call the property service to submit the form
    this.propertyService.addProperty(this.property, this.images).subscribe(
      (response) => {
        this.successMessage = 'Property added successfully!';
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: this.successMessage,
          timer: 3000,
          position: 'top-end',
          toast: true,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.router.navigate(['/']); // Redirect after success
        }, 2000);
      },
      (error) => {
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error while adding the property.',
          timer: 3000,
          position: 'top-end',
          toast: true,
          showConfirmButton: false
        });
      }
    );
  }
}
