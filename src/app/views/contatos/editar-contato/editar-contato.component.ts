import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVW!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email:new FormControl(''),
      telefone: new FormControl (''),
      cargo: new FormControl (''),
      empresa: new FormControl (''),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe((res) => {

      this.form.patchValue(res);

    });

        
    
  }

  gravar(){
    this.contatoVW = this.form.value;

    this.contatoService.editar(this.idSelecionado!,this.contatoVW).subscribe(res=> {
      console.log(res);

      this.router.navigate(['/contatos/listar']);
    });
  }
}
