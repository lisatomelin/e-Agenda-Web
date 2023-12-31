import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissosViewModel } from '../models/forms-compromisso.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissosService } from '../services/compromissos.service';
import { ListarContatosViewModel } from '../../contatos/models/listar-contatos.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';

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
      private contatoService: ContatosService,
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
        contatoId: new FormControl (''),
      });

      this.compromissoVW = this.route.snapshot.data['compromisso'];    

      this.form.patchValue(this.compromissoVW);

      this.contatoService.selecionarTodos().subscribe(res => {
        this.contatos = res;
      })

      const id = this.route.snapshot.paramMap.get('id');

      if(!id) return;

      this.compromissosService.selecionarPorId(id).subscribe((res) => {
        this.form.get('data')?.setValue(res.data.toString().substring(0, 10))
      });


    
    }
  
    get assunto(){
      return this.form.get('assunto');
    }
  
     
    get data() {
      return this.form.get('data');
    }
  
    get horaInicio() {
      return this.form.get('horaInicio');
    }

    get horaTermino() {
      return this.form.get('horaTermino');
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

   
  

