import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private http:HttpClient, private router:Router){}
  ContactUsData:any;
  ngOnInit(){
    this.http.get('http://127.0.0.1:8000/api/contactus').subscribe(res=>{
      console.log(res);
      this.ContactUsData=res;
    })
    console.log(this.ContactUsData);
  }
  navigateToSingleContact(id:any){
    this.router.navigate([`admin/single-contact-us/${id}`])
  }
  deleteItem(id: any) {
    this.http.delete(`http://127.0.0.1:8000/api/contactus/${id}`).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.removeDeletedItemFromUI(id);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
  removeDeletedItemFromUI(deletedItemId: any) {
    this.ContactUsData = this.ContactUsData.filter((data: { id: any; }) => data.id !== deletedItemId);
  }
}
