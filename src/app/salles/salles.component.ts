
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Salles{
  constructor(
    public num_S:number,
    public nom_S:string,
    public capacity:string,
  ) { }
}
@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  salle!: Salles[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }
   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/salle/add';
    
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
    openDetails(targetModal: any, salles:Salles): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', salles.nom_S);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', salles.capacity);
      
      
      }
      
      openEdit(targetModal: any, salles: Salles) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', salles.num_S.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', salles.nom_S);
        document.getElementById('nouvelleprenom')?.setAttribute('value', salles.capacity);
       
       
        this.editForm={
     
          num_S: salles.num_S,
        
        nom_S: salles.nom_S,
        
        capacity: salles.capacity,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            num_S :(<HTMLInputElement>document.getElementById("numid")).value,
            nom_S:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            capacity:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/salle/updatesalle/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, salles: Salles) {

          this.deletenumInscription = salles.num_S;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/salle/deletesalle/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }

  
  getSalles(){
    this.httpClient.get<any>('http://localhost:9592/salle/getallsalles').subscribe(
      response=>{
        console.log(response);this.salle=response;
      }
    )
  }
  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/salle/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.salle=[response];
      }
    )
  }

  ngOnInit(): void {
    this.getSalles();
    this.deletenumInscription;
this.editForm = {
  num_S: '',
nom_S: '',
capacity: '',
};
  }
}
