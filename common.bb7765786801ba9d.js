"use strict";(self.webpackChunkfrontend_tesis=self.webpackChunkfrontend_tesis||[]).push([[592],{5476:(O,h,n)=>{n.d(h,{G:()=>e});class e{}},6657:(O,h,n)=>{n.d(h,{d:()=>i});var e=n(6306),t=n(8504),m=n(553),l=n(4769),d=n(9862),f=n(1535),g=n(357);let i=(()=>{class c{constructor(o,a,p){this.http=o,this.mensaje=a,this.jwtService=p}createCotizacionProducto(o,a){return this.http.post(m.N.api+"/cotizacion-producto/insert",a,this.jwtService.getHttpOptionsWithToken(o)).pipe((0,e.K)(p=>this.handleError(p,["Error","Fallas iniciando sesion, int\xe9ntelo nuevamente."])))}deleteCotizacionesProductoById(o,a,p){return this.http.delete(m.N.api+`/cotizacion-producto/delete/${a}/${p}`,this.jwtService.getHttpOptionsWithToken(o)).pipe((0,e.K)(T=>this.handleError(T,["Error","Fallas consultando, int\xe9ntelo nuevamente."])))}handleError(o,a){return this.mensaje.mostrarAlertaError(a[0],a[1]),(0,t._)(a)}static#t=this.\u0275fac=function(a){return new(a||c)(l.LFG(d.eN),l.LFG(f.k),l.LFG(g.T))};static#e=this.\u0275prov=l.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},4078:(O,h,n)=>{n.d(h,{J:()=>i});var e=n(553),t=n(6306),m=n(8504),l=n(4769),d=n(9862),f=n(1535),g=n(357);let i=(()=>{class c{constructor(o,a,p){this.http=o,this.mensaje=a,this.jwtService=p}getResumen(o,a){return this.http.get(e.N.api+`/resumen/find/${a}`,this.jwtService.getHttpOptionsWithToken(o)).pipe((0,t.K)(p=>this.handleError(p,["Error","Fallas consultando, int\xe9ntelo nuevamente."])))}deleteCotizacion(o,a){return this.http.delete(e.N.api+`/cotizacion/delete/${a}`,this.jwtService.getHttpOptionsWithToken(o)).pipe((0,t.K)(p=>this.handleError(p,["Error","Fallas consultando, int\xe9ntelo nuevamente."])))}createCotizacion(o,a){return this.http.post(e.N.api+"/cotizacion/update",a,this.jwtService.getHttpOptionsWithToken(o)).pipe((0,t.K)(p=>this.handleError(p,["Error","Fallas iniciando sesion, int\xe9ntelo nuevamente."])))}handleError(o,a){return this.mensaje.mostrarAlertaError(a[0],a[1]),(0,m._)(a)}static#t=this.\u0275fac=function(a){return new(a||c)(l.LFG(d.eN),l.LFG(f.k),l.LFG(g.T))};static#e=this.\u0275prov=l.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},5606:(O,h,n)=>{n.d(h,{L:()=>l});var e=n(4769),t=n(6814);function m(d,f){if(1&d&&(e.TgZ(0,"div",3),e._UZ(1,"img",4),e.qZA()),2&d){const g=f.$implicit;e.xp6(1),e.Q6J("src",g,e.LSH)}}let l=(()=>{class d{static#t=this.\u0275fac=function(i){return new(i||d)};static#e=this.\u0275cmp=e.Xpm({type:d,selectors:[["app-carrusel"]],inputs:{imagenes:"imagenes"},decls:3,vars:1,consts:[[1,"bgrid"],[1,"carrusel"],["class","elemento",4,"ngFor","ngForOf"],[1,"elemento"],["alt","imagen",3,"src"]],template:function(i,c){1&i&&(e.TgZ(0,"div",0)(1,"div",1),e.YNc(2,m,2,1,"div",2),e.qZA()()),2&i&&(e.xp6(2),e.Q6J("ngForOf",c.imagenes))},dependencies:[t.sg],styles:[".carrusel[_ngcontent-%COMP%]{overflow:auto;display:flex;scroll-snap-type:x mandatory}.elemento[_ngcontent-%COMP%]{flex-shrink:0;scroll-snap-align:start;width:100%;max-height:350px}.bgrid[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:350px;width:100%}"]})}return d})()},6034:(O,h,n)=>{n.d(h,{i:()=>g});var e=n(4769),t=n(6814),m=n(2953);function l(i,c){1&i&&(e.TgZ(0,"div",4),e._UZ(1,"img",5),e.qZA())}function d(i,c){if(1&i){const u=e.EpF();e.TgZ(0,"div")(1,"app-carta",6),e.NdJ("click",function(){const p=e.CHM(u).$implicit,T=e.oxw();return e.KtG(T.onInputCardChange(p))}),e.qZA()()}if(2&i){const u=c.$implicit;e.xp6(1),e.Q6J("producto",u)}}function f(i,c){if(1&i){const u=e.EpF();e.TgZ(0,"div")(1,"app-carta",7),e.NdJ("click",function(){const p=e.CHM(u).$implicit,T=e.oxw();return e.KtG(T.onInputCardChange(p))}),e.qZA()()}if(2&i){const u=c.$implicit;e.xp6(1),e.Q6J("producto",u)}}let g=(()=>{class i{constructor(){this.idChanged=new e.vpe,this.banner=!1}onInputCardChange(u){this.idChanged.emit(u.id)}static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-carta-grid"]],inputs:{banner:"banner",productosPares:"productosPares",productosImpares:"productosImpares"},outputs:{idChanged:"idChanged"},decls:6,vars:3,consts:[[1,"bgrid","mb-8"],[1,"columna"],["class","banner",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"banner"],["src","https://raw.githubusercontent.com/JefryPardo/tesis-img/master/banner-oscuro.jpeg"],[3,"producto","click"],["pp-carta","",3,"producto","click"]],template:function(o,a){1&o&&(e.TgZ(0,"div",0)(1,"div",1),e.YNc(2,l,2,0,"div",2),e.YNc(3,d,2,1,"div",3),e.qZA(),e.TgZ(4,"div",1),e.YNc(5,f,2,1,"div",3),e.qZA()()),2&o&&(e.xp6(2),e.Q6J("ngIf",a.banner),e.xp6(1),e.Q6J("ngForOf",a.productosPares),e.xp6(2),e.Q6J("ngForOf",a.productosImpares))},dependencies:[t.sg,t.O5,m.s],styles:[".bgrid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);margin:5px}.banner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:10px;width:100%;max-height:1000px}.banner[_ngcontent-%COMP%]{width:100%;padding:5px 5px 10px}"]})}return i})()},4532:(O,h,n)=>{n.d(h,{Z:()=>M,d:()=>D});var e=n(6814),t=n(4769),m=n(5219);function l(r,v){1&r&&t.GkF(0)}function d(r,v){if(1&r&&(t.TgZ(0,"div",8),t.Hsn(1,1),t.YNc(2,l,1,0,"ng-container",6),t.qZA()),2&r){const s=t.oxw();t.xp6(2),t.Q6J("ngTemplateOutlet",s.headerTemplate)}}function f(r,v){1&r&&t.GkF(0)}function g(r,v){if(1&r&&(t.TgZ(0,"div",9),t._uU(1),t.YNc(2,f,1,0,"ng-container",6),t.qZA()),2&r){const s=t.oxw();t.xp6(1),t.hij(" ",s.header," "),t.xp6(1),t.Q6J("ngTemplateOutlet",s.titleTemplate)}}function i(r,v){1&r&&t.GkF(0)}function c(r,v){if(1&r&&(t.TgZ(0,"div",10),t._uU(1),t.YNc(2,i,1,0,"ng-container",6),t.qZA()),2&r){const s=t.oxw();t.xp6(1),t.hij(" ",s.subheader," "),t.xp6(1),t.Q6J("ngTemplateOutlet",s.subtitleTemplate)}}function u(r,v){1&r&&t.GkF(0)}function o(r,v){1&r&&t.GkF(0)}function a(r,v){if(1&r&&(t.TgZ(0,"div",11),t.Hsn(1,2),t.YNc(2,o,1,0,"ng-container",6),t.qZA()),2&r){const s=t.oxw();t.xp6(2),t.Q6J("ngTemplateOutlet",s.footerTemplate)}}const p=["*",[["p-header"]],[["p-footer"]]],T=["*","p-header","p-footer"];let M=(()=>{class r{el;header;subheader;style;styleClass;headerFacet;footerFacet;templates;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;constructor(s){this.el=s}ngAfterContentInit(){this.templates.forEach(s=>{switch(s.getType()){case"header":this.headerTemplate=s.template;break;case"title":this.titleTemplate=s.template;break;case"subtitle":this.subtitleTemplate=s.template;break;case"content":default:this.contentTemplate=s.template;break;case"footer":this.footerTemplate=s.template}})}getBlockableElement(){return this.el.nativeElement.children[0]}static \u0275fac=function(C){return new(C||r)(t.Y36(t.SBq))};static \u0275cmp=t.Xpm({type:r,selectors:[["p-card"]],contentQueries:function(C,_,P){if(1&C&&(t.Suo(P,m.h4,5),t.Suo(P,m.$_,5),t.Suo(P,m.jx,4)),2&C){let E;t.iGM(E=t.CRH())&&(_.headerFacet=E.first),t.iGM(E=t.CRH())&&(_.footerFacet=E.first),t.iGM(E=t.CRH())&&(_.templates=E)}},hostAttrs:[1,"p-element"],inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},ngContentSelectors:T,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(C,_){1&C&&(t.F$t(p),t.TgZ(0,"div",0),t.YNc(1,d,3,1,"div",1),t.TgZ(2,"div",2),t.YNc(3,g,3,2,"div",3),t.YNc(4,c,3,2,"div",4),t.TgZ(5,"div",5),t.Hsn(6),t.YNc(7,u,1,0,"ng-container",6),t.qZA(),t.YNc(8,a,3,1,"div",7),t.qZA()()),2&C&&(t.Tol(_.styleClass),t.Q6J("ngClass","p-card p-component")("ngStyle",_.style),t.uIk("data-pc-name","card"),t.xp6(1),t.Q6J("ngIf",_.headerFacet||_.headerTemplate),t.xp6(2),t.Q6J("ngIf",_.header||_.titleTemplate),t.xp6(1),t.Q6J("ngIf",_.subheader||_.subtitleTemplate),t.xp6(3),t.Q6J("ngTemplateOutlet",_.contentTemplate),t.xp6(1),t.Q6J("ngIf",_.footerFacet||_.footerTemplate))},dependencies:[e.mk,e.O5,e.tP,e.PC],styles:["@layer primeng{.p-card-header img{width:100%}}\n"],encapsulation:2,changeDetection:0})}return r})(),D=(()=>{class r{static \u0275fac=function(C){return new(C||r)};static \u0275mod=t.oAB({type:r});static \u0275inj=t.cJS({imports:[e.ez,m.m8]})}return r})()}}]);