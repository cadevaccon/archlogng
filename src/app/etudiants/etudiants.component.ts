import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Etudiants{
  constructor(
    public num_Insc:number,
    public nom_Etu:string,
    public prenom_Etu:string,
  ) { }
}
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

 etudiant!: Etudiants[];
 closeResult!:string;
 deletenumInscription!:number;
 editForm!: Object;
  constructor(
   private httpClient:HttpClient,
   private modalService:NgbModal,
  ) { }
  onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/etudiant/add';
    
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
    openDetails(targetModal: any, etudiants:Etudiants): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', etudiants.nom_Etu);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', etudiants.prenom_Etu);
      
      
      }
      
      openEdit(targetModal: any, etudiants: Etudiants) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', etudiants.num_Insc.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', etudiants.nom_Etu);
        document.getElementById('nouvelleprenom')?.setAttribute('value', etudiants.prenom_Etu);
       
       
        this.editForm={
     
          num_Insc: etudiants.num_Insc,
        
        nom_Etu: etudiants.nom_Etu,
        
        prenom_Etu: etudiants.prenom_Etu,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            num_Insc :(<HTMLInputElement>document.getElementById("numid")).value,
            nom_Etu:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            prenom_Etu:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/etudiant/updateetudiant/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, etudiants: Etudiants) {

          this.deletenumInscription = etudiants.num_Insc;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/etudiant/deleteetudiant/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }

  ngOnInit(): void {
    this.getEtudiants();
    this.deletenumInscription;
this.editForm = {
  num_Insc: '',
nom_Etu: '',
prenom_Etu: '',
};
  }
  getEtudiants(){
    this.httpClient.get<any>('http://localhost:9592/etudiant/getalletudiants').subscribe(
      response=>{
        console.log(response);this.etudiant=response;
      }
    )
  }

}
