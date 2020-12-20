
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';





export class Universites{
  constructor(
    public code_UNV:number,
    public nom_UNV:string,
    public adresse_site:string,
  ) { }
}
@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit {

  universite!: Universites[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }

   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/universite/add';
    
    this.httpClient.post(url, f.value)
    
    .subscribe((result) => {
    
    this.ngOnInit(); // reload the table
    
    });
    
    this.modalService.dismissAll(); // dismiss the modal
    
    }
  open(content: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    
    this.closeResult = 'Closed with:${result}';
    
    },
    
    (reason: any) => {
    
    this.closeResult = 'Dismissed: ${this.getDismissReason(reason)}';
    
    });
    
    }
    
    private getDismissReason(reason: any): string {
    
    if (reason === ModalDismissReasons.ESC) {
    
    return 'by pressing ESC';
    
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    
    return 'by clicking on a backdrop';
    
    } else {
    
    return 'with:${reason}';
    
    }
    
    }
    openDetails(targetModal: any, universites:Universites): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', universites.nom_UNV);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', universites.adresse_site);
      
      
      }
      
      openEdit(targetModal: any, universites: Universites) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', universites.code_UNV.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', universites.nom_UNV);
        document.getElementById('nouvelleprenom')?.setAttribute('value', universites.adresse_site);
       
       
        this.editForm={
     
          code_UNV: universites.code_UNV,
        
        nom_UNV: universites.nom_UNV,
        
        adress_site: universites.adresse_site,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            code_UNV :(<HTMLInputElement>document.getElementById("numid")).value,
            nom_UNV:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            adress_site:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/universite/updateuniversite/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, universites: Universites) {

          this.deletenumInscription = universites.code_UNV;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/universite/deleteuniversite/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }

  
  getuniversites(){
    this.httpClient.get<any>('http://localhost:9592/universite/getalluniversites').subscribe(
      response=>{
        console.log(response);this.universite=response;
      }
    )
  }
  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/universite/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.universite=[response];
      }
    )
  }

  ngOnInit(): void {
    this.getuniversites();
    this.deletenumInscription;
this.editForm = {
  code_UNV: '',
nom_UNV: '',
adress_site: '',
};
  }

}
