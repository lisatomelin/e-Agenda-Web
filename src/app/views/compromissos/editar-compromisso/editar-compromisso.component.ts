import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissosViewModel } from '../models/forms-compromisso.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissosService } from '../services/compromissos.service';
import { ListarContatosViewModel } from '../../contatos/models/listar-contatos.view-model';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent {
  
    form!: FormGroup;
    compromissoVW!: FormsCompromissosViewModel;
    contatos: ListarContatosViewModel [] = [];
  
    constructor(private formBuilder: FormBuilder, 
      private compromissosService: CompromissosService,
      private toastrService: ToastrService,
      private router: Router,
      private route: ActivatedRoute
      ) {}
    
    
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        assunto: new FormControl('', [Validators.required]),
        tipoLocal: new FormControl(''),
        link: new FormControl (''),
        local: new FormControl ('', [Validators.required]),
        data: new FormControl (new Date, [Validators.required]),
        horaInicio: new FormControl ('08:00', [Validators.required]),
        horaTermino: new FormControl ('09:00', [Validators.required]),
        contato: new FormControl (''),
      });

      this.compromissoVW = this.route.snapshot.data['compromisso'];    

      this.form.patchValue(this.compromissoVW);


    
    }
  
    get assunto(){
      return this.form.get('assunto');
    }
  
    get tipoLocal() {
      return this.form.get('tipoLocal');
    }
  
    get local() {
      return this.form.get('local');
    }
  
    get data() {
      return this.form.get('data');
    }
  
    get horaInicio() {
      return this.form.get('horaInicio');
    }
  
    get Contato() {
      return this.form.get('contato');
    }
  
  
    gravar(){
      if(this.form.invalid){
        for(let erro of this.form.validate()){
          this.toastrService.warning(erro);
        }
  
        return;
        
      }
      this.compromissoVW = this.form.value;
  
      const id = this.route.snapshot.paramMap.get('id');
  
      if (!id) return;
  
      this.compromissosService.editar(id,this.compromissoVW).subscribe({  
        next: (compromisso) => this.processarSucesso(compromisso),
        error: (erro) => this.processarFalha(erro),   
  
        
      });
    }
  
    processarSucesso(compromisso: FormsCompromissosViewModel){
  
      this.toastrService.success(
       `O compromisso "${compromisso.assunto}" foi editado com sucesso!`,
      'Sucesso')
  
      this.router.navigate(['/compromissos/listar']);
  
  
    }
  
    processarFalha(error: Error){
      this.toastrService.error(
      error.message, 'Error');
           
        
    }
}

   
  

