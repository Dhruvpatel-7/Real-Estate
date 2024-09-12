import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-propform',
  templateUrl: './propform.component.html',
  styleUrl: './propform.component.css'
})
export class PropformComponent {
  
  propertyForm: FormGroup;
  images: File[] = [];

  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  states = ['New York', 'California', 'Illinois', 'Texas'];
  
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      propertyName: [''],
      city: [''],
      state: [''],
      address: [''],
      status: ['Available'],
      price: [''],
      size: [''],
      amenities: [''],
    });
  }

  onImageChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('propertyName', this.propertyForm.get('propertyName')?.value);
    formData.append('city', this.propertyForm.get('city')?.value);
    formData.append('state', this.propertyForm.get('state')?.value);
    formData.append('address', this.propertyForm.get('address')?.value);
    formData.append('status', this.propertyForm.get('status')?.value);
    formData.append('price', this.propertyForm.get('price')?.value);
    formData.append('size', this.propertyForm.get('size')?.value);
    formData.append('amenities', this.propertyForm.get('amenities')?.value);
    
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    console.log(formData);
  }
}
