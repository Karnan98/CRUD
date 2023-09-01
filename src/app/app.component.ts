import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms' 
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb:FormBuilder){}

  resumeForm!:FormGroup;

  tableData:any[]=[];

  ngOnInit(){
    this.resumeForm=this.fb.group({
      iD:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      qualification:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
    })
  }
editEnabled:boolean=false;
editIndex!:number;
  onSubmit(){
    if(this.resumeForm.invalid){
      alert("Please Fill the Form ");
      return;
    }
    if(this.editEnabled){
      this.tableData[this.editIndex]=this.resumeForm.value;
      this.resumeForm.reset();
      this.editEnabled=false;
    }
    else{
      var alreadyExit:any=this.tableData.filter(
        (value:any)=>{return value.firstName==this.resumeForm.value.firstName});
      if(alreadyExit.length!=0){
        alert("Name already Exit");
        return;
      }
    this.tableData.push(this.resumeForm.value);
    this.resumeForm.reset();
    }
  }

  delete(index:number){
    if(confirm("Are you Deleted..?")){
      this.tableData.splice(index,1);
    alert('Delete successfully');
    }
  }

  editForm(getDetaileForm:any,index:number){
    this.editIndex=index;
    this.editEnabled=true;
    this.resumeForm.patchValue({
      iD:getDetaileForm.iD,
      firstName:getDetaileForm.firstName,
      lastName:getDetaileForm.lastName,
      email:getDetaileForm.email,
      qualification:getDetaileForm.qualification,
      city:getDetaileForm.city,
      state:getDetaileForm.state,
    });
  }

  reset(){
    this.resumeForm.reset();
  }
}
