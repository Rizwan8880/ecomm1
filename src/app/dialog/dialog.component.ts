import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  freshneesList = ["Brand new", "second Hand", "refurbished"];
  productForm !: FormGroup
  actionBtn: string = 'Save'
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,

  ) { }
  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],

    });
    console.log("editdataaaaa", this.editData);
    if (this.editData) {
      this.actionBtn = 'Update'
      this.productForm.controls['productName'].setValue(this.editData.productName),
        this.productForm.controls['category'].setValue(this.editData.category),
        this.productForm.controls['freshness'].setValue(this.editData.freshness),
        this.productForm.controls['price'].setValue(this.editData.price),
        this.productForm.controls['date'].setValue(this.editData.date),
        this.productForm.controls['comment'].setValue(this.editData.comment)
    }

  }
  addProduct() {
    if (!this.editData) {

      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            console.log("update respons",res);            
            alert("product added successfuly")
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            console.log("error0",);

            alert("Error while adding the product")
          }
        })
      }
     
    } 
    else{
      this.updateProduct()
    }
   
  }
  updateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id).subscribe(
        {
          next:(res)=>{
            alert("product Update successfully")
            this.productForm.reset();
            this.dialogRef.close('Update')
          },
          error:()=>{
            alert("error while updating the recode!!")
          }
        }
      )
  }


}
