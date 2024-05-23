import { Component } from '@angular/core';
import { DestinationService } from '../services/destinationService/destination.service';
import { SafePipe } from '../pipes/safe.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [LoaderComponent,SafePipe, ReactiveFormsModule, NgClass],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DestinationsComponent {
  destinations: any;
  newDistForm: FormGroup;
  editDistForm: FormGroup;
  file!: File;
  deleteSuc: any = 0;
  editSuc: any = 0;
  submit:any=0;
  closeModDel:any=0;
  constructor(
    private destinationService: DestinationService,
    private cookie: CookieService,
    private router: Router,
    private http: HttpClient
  ) {
    this.newDistForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      info: new FormControl('', [Validators.required]),
      flag: new FormControl('', [Validators.required]),
      pic: new FormControl('', [Validators.required]),
      map: new FormControl('', [Validators.required])
    
    });
    this.editDistForm = new FormGroup({
      name: new FormControl(),
      info: new FormControl(),
      flag: new FormControl(""),
      pic: new FormControl(""),
      map: new FormControl(),
    });
  }
  token: any = this.cookie.get('token');
  ngOnInit() {
    this.closeModDel=0;
    this.destinationService.listDestinations(this.token).subscribe(
      (res: any) => (this.destinations = res),
      (error) => console.log(error)
    );
    // console.log(this.newDistForm.controls['name'].errors);
    this.submit=0;
  }
  onFileSelectedFlag(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    // console.log('flag' + file);
    this.newDistForm.patchValue({
      flag: file,
    });

  }
  onFileSelectedPic(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    // console.log(file);

    this.newDistForm.patchValue({
      pic: file,
    });
 
  }
  onFileSelectedFlagEdit(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    // console.log('flag' + file);
    this.editDistForm.patchValue({
      flag: file,
    });

  }
  onFileSelectedPicEdit(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    // console.log(file);

    this.editDistForm.patchValue({
      pic: file,
    });
 
  }
  sendDestination() {
    this.submit=1;
    if (this.newDistForm.controls['name'].invalid ||
    this.newDistForm.controls['info'].invalid ||
    this.newDistForm.controls['pic'].invalid ||
    this.newDistForm.controls['flag'].invalid ||
    this.newDistForm.controls['map'].invalid )
    return;
    const formData = new FormData();
    formData.append('pic', this.newDistForm.controls['pic'].value);
    formData.append('info', this.newDistForm.controls['info'].value);
    formData.append('flag', this.newDistForm.controls['flag'].value);
    formData.append('map', this.newDistForm.controls['map'].value);
    formData.append('name', this.newDistForm.controls['name'].value);
    // console.log(this.newDistForm.controls['name'].value);
    // console.log(this.newDistForm);
    this.destinationService.addDestinations(formData).subscribe(
      (res) => this.ngOnInit(),
      (error) => console.log(error)
    );
    // !
    // console.log(form);
  }
  showMap(id: any) {
    const map = this.destinations[id].map;
    const icon = document.getElementById('lord');
    // console.log(icon);

    icon!.style.display = 'none';
    const getFrame =
      document.getElementsByTagName('iframe')[
        document.getElementsByTagName('iframe').length - 1
      ];
    // console.log(getFrame)
    const getDivFrame = document.getElementById('iframeDiv');
    getDivFrame?.classList.remove('active');
    getDivFrame?.classList.remove('show');
    getFrame.src = map;
    setTimeout(function () {
      getDivFrame?.classList.add('active');
      getDivFrame?.classList.add('show');
    }, 500);

    // getFrame.classList.add('fade-in');
    // console.log(id);
    // console.log(this.destinations);
  }
  setInitValue()
  {
    this.deleteSuc = 0;
  }
  deleteDist(id: any) {
    this.deleteSuc = 0;
    this.destinationService.deleteDestination(id).subscribe(
      (res: any) => {
        this.deleteSuc = 1;
      },
      (error) => {
        // console.log(error);
        this.deleteSuc = -1;
      }
    );

  }
  setValueForm(id: any) {
    this.editDistForm = new FormGroup({
      name: new FormControl(this.destinations[id].name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      info: new FormControl(this.destinations[id].info, [Validators.required]),
      flag: new FormControl(""),
      pic: new FormControl(""),
      map: new FormControl(this.destinations[id].map, [Validators.required]),
      // name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // info: new FormControl('', [Validators.required]),
      // flag: new FormControl('', [Validators.required]),
      // pic: new FormControl('', [Validators.required]),
      // map: new FormControl('', [Validators.required]),
    });
  }
  editDist(id: any) {
    const formData = new FormData();
    formData.append('pic', this.editDistForm.controls['pic'].value);
    formData.append('info', this.editDistForm.controls['info'].value);
    formData.append('flag', this.editDistForm.controls['flag'].value);
    formData.append('map', this.editDistForm.controls['map'].value);
    formData.append('name', this.editDistForm.controls['name'].value);
    // formData.append('_method', "PUT");
    const test={
      "name": "here it is"
    }
    // console.log(formData.get("name"));
    // console.log(this.editDistForm);
    this.editSuc = 0;
    this.destinationService.editDestination(formData, id).subscribe(
      (res: any) => {
        // console.log(res);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.editSuc = -1;
      }
    );
  }
  setcloseModDel()
  {
      this.ngOnInit();

  }
}
