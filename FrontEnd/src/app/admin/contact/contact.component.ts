import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink,LoaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private http:HttpClient, private router:Router, private activatedRoute:ActivatedRoute){}
  ContactUsData:any;
  ngOnInit(){
    this.http.get('http://127.0.0.1:8000/api/contactus').subscribe((res:any)=>{
      this.ContactUsData=res;
      // console.log(res)
    });
  }
  navigateToSingleContact(id:any){
    this.router.navigate([`admin/single-contact-us/${id}`])
  }
  deleteItem(id: any) {
    this.http.delete(`http://127.0.0.1:8000/api/contactus/${id}`).subscribe(
      () => {
        // console.log('Item deleted successfully');
        this.removeDeletedItemFromUI(id);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
  removeDeletedItemFromUI(deletedItemId: any) {
    this.ContactUsData = this.ContactUsData?.filter((data: { id: any; }) => data.id !== deletedItemId);
  }
  marAsRead(id:any){
    this.http.put(`http://127.0.0.1:8000/api/contactus/${id}/update`, {}).subscribe(
      () => {
        // console.log('Item has been read');
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}
