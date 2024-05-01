import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {

  teacherPendingData: any[] = [];
  addcomment:boolean=false;
 constructor(private authService:AuthService,private teacherService:TeacherService,private snackBar: MatSnackBar){}
 
 ngOnInit(): void {

  this.getAllPendingTeacher();
  this.addcomment=false;
 }

 getAllPendingTeacher():any
 {
  console.log(this.teacherService.getAllTeacherPending().subscribe({
    next:(response)=>
      { console.log(response)
        this.teacherPendingData=response
      },
      error:(err)=>
        {
          console.log(`error:${err.error}`)
        }
  }))
 }

 Approve(id:string)
 {
  this.teacherService.ApproveTeacherProfile(id).subscribe({
    next:(respon)=>{
      this.getAllPendingTeacher()
      console.log(respon);

    },
    error:(err)=>
      {
      this.getAllPendingTeacher()
        console.log(err);
      }
  })
 }

 sendInfo(id: string, info: string) {
  console.log(info)
  console.log(id)

  if (!info.trim()) {

    this.snackBar.open('يرجى إدخال معلومات قبل الإرسال', 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
    return; 
  }else
  {
    const aboutTeacher ={
      accountNote: info.toString(),
     //  accountNote: " "
   } 
    this.teacherService.saveTeacherAccountNote(id,aboutTeacher).subscribe(
      (response) => {
        console.log('Update successful:', response);
      },
      (error) => {
        this.addcomment=false;

          this.snackBar.open('تم ارسال المعلومات بنجاح', 'Close', {
          duration: 5000,
          verticalPosition: 'top',

        });
      }
    );
  }

 
}
 Reject(id:string)
 {
  this.addcomment=true;
  // this.teacherService.RejectTeacherProfile(id).subscribe({
  //   next:(respon)=>{
  //     this.getAllPendingTeacher()
  //     console.log(respon);
  //   },
  //   error:(err)=>
  //     {
  //       console.log(err);
  //       this.getAllPendingTeacher()
  //     }

  // })
 }


  toCreate:boolean=true;
  toGetAll:boolean=false;
  toUpdate:boolean=false;
  toDelete:boolean=false;

  create() {
    // Logic for creating a new item
    this.toCreate=true;
    this.toGetAll=false;
    this.toUpdate=false;
    this.toDelete=false;
  }

  getAll() {
    // Logic for reading items
    this.toGetAll=true;
    this.toCreate=false;
    this.toUpdate=false;
    this.toDelete=false;
  }

  update() {
    // Logic for updating an item
    this.toUpdate=true;
    this.toCreate=false;
    this.toGetAll=false;
    this.toDelete=false;
  }

  delete() {
    // Logic for deleting an item
    this.toDelete=true;
    this.toUpdate=false;
    this.toCreate=false;
    this.toGetAll=false;
  }
  
}
