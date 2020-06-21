import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

@Directive({
  selector: '[appAuthority]'
})
export class AuthorityDirective {
  private authorities: string[] = [];
  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private  authenticationService: AuthenticationService) { }
    @Input()
              set appAuthority(value: string | string[]) {
             this.authorities = typeof value === 'string' ? [value] : value;
             this.viewContainerRef.clear();
             if (this.authenticationService.hasAnAuthority(this.authorities)) {
               this.viewContainerRef.createEmbeddedView(this.templateRef);
             }
              }

}
