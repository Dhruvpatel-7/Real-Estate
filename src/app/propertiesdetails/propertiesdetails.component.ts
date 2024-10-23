import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propertiesdetails',
  templateUrl: './propertiesdetails.component.html',
  styleUrl: './propertiesdetails.component.css'
})
export class PropertiesdetailsComponent {
  inquiryEmail: string = '';
  inquiryPhone: string = '';
  inquiryMessage: string = '';

  submitInquiry() {
    // Show success message using SweetAlert2
    Swal.fire({
      title: 'Inquiry Submitted!',
      text: 'Your inquiry has been submitted successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Clear the form fields
    this.inquiryEmail = '';
    this.inquiryPhone = '';
    this.inquiryMessage = '';
  }
}
