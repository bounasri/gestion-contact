import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../shared/model/contact';
import {Users} from '../../shared/model/users';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: Users = new Users();
  confirmPwd: string;
  visible = true;
  roles: any[];
  selectedRole: any = {role: ''} ;
  constructor(private  userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.roles = [{role: 'Admin'}, {role: 'User'}];
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userService.findById(id).subscribe( res => {
        this.user = res;
        this.selectedRole = this.user.role === 'Admin' ? this.roles[0] : this.roles[1];
        this.visible = false;
      }, ex => {
        console.log(ex);
      });
    }
  }

  ajouter() {
    this.user.role = this.selectedRole.role;
    this.userService.save(this.user)
      .subscribe(res => {
       if (res.success) {
        this.messageService.add({severity: 'success',
          summary: 'Succès', detail: res.message});
        this.router.navigate(['/list-user']);
       } else {
         this.messageService.add({severity: 'warn',
           summary: 'Attention', detail: res.message});
       }
      }, err => {
        this.messageService.add({severity: 'error',
          summary: 'Erreur', detail: 'Opération non effectuée'});
        console.log(err);
      });
  }
  modifier() {
    this.user.role = this.selectedRole.role;
    this.userService.update(this.user)
      .subscribe(res => {
        if (res.success) {
          this.messageService.add({severity: 'success',
            summary: 'Succès', detail: res.message});
          this.router.navigate(['/list-user']);
        } else {
          this.messageService.add({severity: 'warn',
            summary: 'Attention', detail: res.message});
        }
      }, err => {
        this.messageService.add({severity: 'error',
          summary: 'Erreur', detail: 'Opération non effectuée'});
        console.log(err);
      });
  }
}
