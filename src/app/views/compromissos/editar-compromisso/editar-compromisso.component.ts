import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissosViewModel } from '../models/forms-compromisso.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissosService } from '../services/compromissos.service';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent {
  
    form!: FormGroup;
    compromissoVW!: FormsCompromissosViewModel;
    idSelecionado: string | null = null;
  
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
        local: new FormControl (''),
        data: new FormControl (new Date),
        horaInicio: new FormControl ('08:00'),
        horaTermino: new FormControl ('09:00'),
        contato: new FormControl (''),
      });


      this.idSelecionado = this.route.snapshot.paramMap.get('id');

      if(!this.idSelecionado) return;
  
      this.compromissosService.selecionarPorId(this.idSelecionado).subscribe((res) => {
  
        this.form.patchValue(res);
  
      });
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
  
    get ContatoId() {
      return this.form.get('contato');
    }
  
  
  
    gravar(){
      if(this.form.invalid){
        this.toastrService.warning('Verifique o preenchimento do formulário.', 'Aviso!');
        
        this.form.markAllAsTouched();
        return;
      }
  
      this.compromissoVW = this.form.value;
      
  
      this.compromissosService.editar(this.idSelecionado!,this.compromissoVW).subscribe(res=> {
        console.log(res);
        this.router.navigate(['/compromissos/listar']);
        this.toastrService.success(`O compromisso "${res.assunto}" foi inserido com sucesso!`)
        
  
        
      });
    }
  
}
