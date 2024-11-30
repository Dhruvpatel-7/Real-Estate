import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Properties } from '../models/property.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = environment.apiUrl; // Your backend API URL

  constructor(private http: HttpClient) { }

  // Helper method to get the logged-in user's ID
  private getUserId(): number {
    // Replace this logic with how you actually store/retrieve the logged-in user's ID
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user ? user.id : null;  // Assume the user object contains the 'id' field
  }
  
  // Add property with images
  addProperty(property: Properties, images: File[]): Observable<any> {
    const formData = new FormData();
    
    // Append properties to formData
    formData.append('Name', property.Name);
    const userId = 2; // Assuming a static user ID for now
    formData.append('UserId', userId.toString());
    formData.append('Price', property.Price.toString());
    formData.append('Description', property.Description);
    formData.append('ContactNo', property.ContactNo);
    formData.append('PropertySize', property.PropertySize.toString());
    formData.append('PropertyConfiguration', property.PropertyConfiguration);
    formData.append('State', property.State);
    formData.append('District', property.District);
    formData.append('Address', property.Address);
    formData.append('Aminities', property.Aminities);
    formData.append('LocationURL', property.LocationURL);
  
    // Log form data
    console.log("Property Form Data (Add Property):");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    // Append the images to formData
    images.forEach(image => {
      formData.append('images', image, image.name);
    });
  
    // Log image data
    console.log("Images to be uploaded:");
    images.forEach(image => {
      console.log(`Image: ${image.name}`);
    });
  
    // Make the HTTP POST request to add the property
    return this.http.post(`${this.apiUrl}Properties`, formData);
  }

  // Fetch all properties
  getProperties(): Observable<Properties[]> {
    return this.http.get<Properties[]>(`${this.apiUrl}/Properties`);
  }

  // Fetch images for a specific property
  getPropertyImages(propertyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Properties/${propertyId}/images`);
  }

  // Update property with images
  updateProperty(property: Properties, images: File[], propertyId: number): Observable<any> {
    const formData = new FormData();
    formData.append('Name', property.Name);
    formData.append('Price', property.Price.toString());
    formData.append('Description', property.Description);
    formData.append('ContactNo', property.ContactNo);
    formData.append('PropertySize', property.PropertySize.toString());
    formData.append('PropertyConfiguration', property.PropertyConfiguration);
    formData.append('State', property.State);
    formData.append('District', property.District);
    formData.append('Address', property.Address);
    formData.append('Aminities', property.Aminities);
    formData.append('LocationURL', property.LocationURL);

    // Append the userId from the logged-in user
    const userId = this.getUserId();
    if (userId) {
      formData.append('UserId', userId.toString());
    }

    // Append the images to formData
    images.forEach(image => {
      formData.append('images', image, image.name);
    });

    // Make the HTTP PUT request to update the property
    return this.http.put(`${this.apiUrl}Properties/${propertyId}`, formData);
  }

  // Delete a property by ID
  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Properties/${id}`);
  }
}
