(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"r+8m":function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=u("mrSG"),o=u("nfEB"),r=u("ZZ/e"),i=u("qXBG"),b=u("tct4"),s=function(){function l(l,n,u,t,e){this.requestsService=l,this.loadingCtrl=n,this.authService=u,this.firestore=t,this.toastCtrl=e,this.status="progress",this.isLoading=!0}return l.prototype.ngOnInit=function(){this.segment.value="progress",this.requests$=this.requestsService.getRequests()},l.prototype.onFilterUpdate=function(l){this.status=l.detail.value},l.prototype.setAsCompleted=function(l,n){var u=this;l.close(),this.loadingCtrl.create({message:"Setting Request as Completed..."}).then(function(l){l.present(),u.requestsService.updateRequest(n).then(function(){l.dismiss(),u.presentToast()})})},l.prototype.presentToast=function(){return e.__awaiter(this,void 0,void 0,function(){return e.__generator(this,function(l){switch(l.label){case 0:return[4,this.toastCtrl.create({message:"Request Completed Successfully.",duration:3e3,color:"secondary"})];case 1:return l.sent().present(),[2]}})})},l}(),c=function(){return function(){}}(),p=u("pMnS"),a=u("oBZk"),m=u("ZYCi"),f=u("Ip0R"),g=function(){function l(){}return l.prototype.transform=function(l,n,u){return l?(n=n.toLowerCase(),l.filter(function(l){return l.status.toLowerCase().includes(n)})):l},l}(),d=u("gIcY"),h=t.nb({encapsulation:0,styles:[[""]],data:{}});function k(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,4,"ion-button",[["color","primary"],["routerLink","/requests/tabs/add-requests"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.zb(l,2).onClick()&&e),"click"===n&&(e=!1!==t.zb(l,3).onClick(u)&&e),e},a.P,a.c)),t.ob(1,49152,null,0,r.j,[t.h,t.k],{color:[0,"color"]},null),t.ob(2,16384,null,0,m.n,[m.m,m.a,[8,null],t.D,t.k],{routerLink:[0,"routerLink"]},null),t.ob(3,737280,null,0,r.Kb,[f.i,r.Gb,t.k,m.m,[2,m.n]],null,null),(l()(),t.Fb(-1,0,["Add Request"]))],function(l,n){l(n,1,0,"primary"),l(n,2,0,"/requests/tabs/add-requests"),l(n,3,0)},null)}function v(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,4,"div",[["text-center",""]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,[" No Requests found! "])),(l()(),t.gb(16777216,null,null,1,null,k)),t.ob(4,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,4,0,"p"===n.component.authService.userType)},null)}function y(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"div",[["text-center",""]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,[" No Completed Requests yet... "]))],null,null)}function x(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.Fb(1,null,[" Requested on: "," "])),t.Bb(2,3)],null,function(l,n){var u=t.Gb(n,1,0,l(n,2,0,t.zb(n.parent.parent.parent.parent,1),n.parent.parent.context.$implicit.date.toDate(),"dd/MM/yyyy HH:mm","+3"));l(n,1,0,u)})}function I(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.Fb(1,null,[" Completed on: "," "])),t.Bb(2,3)],null,function(l,n){var u=t.Gb(n,1,0,l(n,2,0,t.zb(n.parent.parent.parent.parent,1),n.parent.parent.context.$implicit.completionDate.toDate(),"dd/MM/yyyy HH:mm","+3"));l(n,1,0,u)})}function C(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"ion-text",[["color","primary"]],null,null,null,a.wb,a.J)),t.ob(1,49152,null,0,r.vb,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.Fb(2,0,[" Submitted By "," "]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,2,0,n.parent.parent.context.$implicit.patientName)})}function q(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"ion-text",[["color","primary"]],null,null,null,a.wb,a.J)),t.ob(1,49152,null,0,r.vb,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.Fb(2,0,[" Fulfilled By "," "]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,2,0,n.parent.parent.context.$implicit.nurseName)})}function L(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Fb(1,null,[" Submitted By "," "]))],null,function(l,n){l(n,1,0,n.parent.parent.context.$implicit.patientName)})}function $(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"ion-label",[["color","secondary"],["slot","start"],["text-right",""]],null,null,null,a.ib,a.v)),t.ob(1,49152,null,0,r.M,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.Fb(-1,0,["In progress"]))],function(l,n){l(n,1,0,"secondary")},null)}function F(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"ion-label",[["color","success"],["slot","start"],["text-right",""]],null,null,null,a.ib,a.v)),t.ob(1,49152,null,0,r.M,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.Fb(-1,0,["Completed"]))],function(l,n){l(n,1,0,"success")},null)}function H(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,27,"ion-item",[],null,null,null,a.hb,a.r)),t.ob(1,49152,null,0,r.G,[t.h,t.k],null,null),(l()(),t.pb(2,0,null,0,3,"ion-thumbnail",[["slot","start"]],null,null,null,a.xb,a.K)),t.ob(3,49152,null,0,r.xb,[t.h,t.k],null,null),(l()(),t.pb(4,0,null,0,1,"ion-img",[],null,null,null,a.cb,a.p)),t.ob(5,49152,null,0,r.C,[t.h,t.k],{src:[0,"src"]},null),(l()(),t.pb(6,0,null,0,21,"ion-label",[],null,null,null,a.ib,a.v)),t.ob(7,49152,null,0,r.M,[t.h,t.k],null,null),(l()(),t.pb(8,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),t.Fb(9,null,["",""])),(l()(),t.pb(10,0,null,0,1,"h5",[],null,null,null,null,null)),(l()(),t.Fb(11,null,["",""])),(l()(),t.pb(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Fb(13,null,["Room Number: ",""])),(l()(),t.gb(16777216,null,0,1,null,x)),t.ob(15,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,I)),t.ob(17,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,C)),t.ob(19,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,q)),t.ob(21,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,L)),t.ob(23,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,$)),t.ob(25,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,F)),t.ob(27,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,5,0,n.parent.context.$implicit.imgUrl),l(n,15,0,""!==n.parent.context.$implicit.data&&"In progress"===n.parent.context.$implicit.status),l(n,17,0,"Completed"===n.parent.context.$implicit.status),l(n,19,0,"In progress"===n.parent.context.$implicit.status&&"progress"===u.segment.value),l(n,21,0,"Completed"===n.parent.context.$implicit.status&&"completed"===u.segment.value),l(n,23,0,"Completed"===n.parent.context.$implicit.status),l(n,25,0,"In progress"===n.parent.context.$implicit.status&&"progress"===u.segment.value),l(n,27,0,"Completed"===n.parent.context.$implicit.status&&"completed"===u.segment.value)},function(l,n){l(n,9,0,n.parent.context.$implicit.title),l(n,11,0,n.parent.context.$implicit.description),l(n,13,0,n.parent.context.$implicit.room)})}function z(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,3,"ion-item-option",[["color","secondary"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.setAsCompleted(t.zb(l.parent.parent.parent,1),l.parent.parent.parent.context.$implicit)&&e),e},a.eb,a.s)),t.ob(1,49152,null,0,r.J,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.pb(2,0,null,0,1,"ion-icon",[["name","done-all"],["slot","icon-only"]],null,null,null,a.bb,a.o)),t.ob(3,49152,null,0,r.B,[t.h,t.k],{name:[0,"name"]},null)],function(l,n){l(n,1,0,"secondary"),l(n,3,0,"done-all")},null)}function O(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,3,"ion-item-options",[["side","end"]],null,null,null,a.fb,a.t)),t.ob(1,49152,null,0,r.K,[t.h,t.k],{side:[0,"side"]},null),(l()(),t.gb(16777216,null,0,1,null,z)),t.ob(3,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,1,0,"end"),l(n,3,0,"Completed"!==n.parent.parent.context.$implicit.status)},null)}function B(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,O)),t.ob(2,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,"p"!==n.component.authService.userType)},null)}function S(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,5,"ion-item-sliding",[],null,null,null,a.gb,a.u)),t.ob(1,49152,[["slidingItem",4]],0,r.L,[t.h,t.k],null,null),(l()(),t.gb(16777216,null,0,1,null,H)),t.ob(3,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,0,1,null,B)),t.ob(5,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,3,0,"p"===u.authService.userType&&n.context.$implicit.patientName===u.authService.userName||"n"===u.authService.userType),l(n,5,0,"Completed"!==n.context.$implicit.status)},null)}function w(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,4,"ion-list",[],null,null,null,a.jb,a.w)),t.ob(1,49152,null,0,r.N,[t.h,t.k],null,null),(l()(),t.gb(16777216,null,0,2,null,S)),t.ob(3,278528,null,0,f.j,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),t.Bb(4,3)],function(l,n){var u=n.component,e=t.Gb(n,3,0,l(n,4,0,t.zb(n.parent,0),n.context.ngIf,u.status,"status"));l(n,3,0,e)},null)}function R(l){return t.Hb(0,[t.Ab(0,g,[]),t.Ab(0,f.e,[t.u]),t.Db(402653184,1,{segment:0}),(l()(),t.pb(3,0,null,null,10,"ion-header",[],null,null,null,a.ab,a.n)),t.ob(4,49152,null,0,r.A,[t.h,t.k],null,null),(l()(),t.pb(5,0,null,0,8,"ion-toolbar",[["color","primary"]],null,null,null,a.zb,a.M)),t.ob(6,49152,null,0,r.Ab,[t.h,t.k],{color:[0,"color"]},null),(l()(),t.pb(7,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,a.Q,a.d)),t.ob(8,49152,null,0,r.k,[t.h,t.k],null,null),(l()(),t.pb(9,0,null,0,1,"ion-menu-button",[["menu","m1"]],null,null,null,a.kb,a.y)),t.ob(10,49152,null,0,r.Q,[t.h,t.k],{menu:[0,"menu"]},null),(l()(),t.pb(11,0,null,0,2,"ion-title",[],null,null,null,a.yb,a.L)),t.ob(12,49152,null,0,r.yb,[t.h,t.k],null,null),(l()(),t.Fb(13,0,["",""])),(l()(),t.pb(14,0,null,null,32,"ion-content",[],null,null,null,a.X,a.k)),t.ob(15,49152,null,0,r.t,[t.h,t.k],null,null),(l()(),t.pb(16,0,null,0,13,"ion-segment",[["color","tertiary"],["mode","md"]],null,[[null,"ionChange"],[null,"ionBlur"]],function(l,n,u){var e=!0,o=l.component;return"ionBlur"===n&&(e=!1!==t.zb(l,19)._handleBlurEvent()&&e),"ionChange"===n&&(e=!1!==t.zb(l,19)._handleChangeEvent(u.target.value)&&e),"ionChange"===n&&(e=!1!==o.onFilterUpdate(u)&&e),e},a.pb,a.B)),t.Cb(5120,null,d.e,function(l){return[l]},[r.Lb]),t.ob(18,49152,[[1,4]],0,r.jb,[t.h,t.k],{color:[0,"color"],mode:[1,"mode"]},null),t.ob(19,16384,null,0,r.Lb,[t.k],null,null),(l()(),t.pb(20,0,null,0,4,"ion-segment-button",[["mode","md"],["value","progress"]],null,null,null,a.ob,a.C)),t.ob(21,49152,null,0,r.kb,[t.h,t.k],{mode:[0,"mode"],value:[1,"value"]},null),(l()(),t.pb(22,0,null,0,2,"ion-label",[],null,null,null,a.ib,a.v)),t.ob(23,49152,null,0,r.M,[t.h,t.k],null,null),(l()(),t.Fb(-1,0,["Pending Requests"])),(l()(),t.pb(25,0,null,0,4,"ion-segment-button",[["mode","md"],["value","completed"]],null,null,null,a.ob,a.C)),t.ob(26,49152,null,0,r.kb,[t.h,t.k],{mode:[0,"mode"],value:[1,"value"]},null),(l()(),t.pb(27,0,null,0,2,"ion-label",[],null,null,null,a.ib,a.v)),t.ob(28,49152,null,0,r.M,[t.h,t.k],null,null),(l()(),t.Fb(-1,0,["Completed Requests"])),(l()(),t.pb(30,0,null,0,16,"ion-grid",[],null,null,null,a.Z,a.m)),t.ob(31,49152,null,0,r.z,[t.h,t.k],null,null),(l()(),t.pb(32,0,null,0,14,"ion-row",[],null,null,null,a.nb,a.A)),t.ob(33,49152,null,0,r.hb,[t.h,t.k],null,null),(l()(),t.pb(34,0,null,0,12,"ion-col",[["offset-sm","2"],["size","12"],["size-sm","8"],["text-center",""]],null,null,null,a.W,a.j)),t.ob(35,49152,null,0,r.s,[t.h,t.k],{size:[0,"size"]},null),(l()(),t.gb(16777216,null,0,3,null,v)),t.ob(37,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),t.Ab(131072,f.b,[t.h]),t.Bb(39,3),(l()(),t.gb(16777216,null,0,3,null,y)),t.ob(41,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),t.Ab(131072,f.b,[t.h]),t.Bb(43,3),(l()(),t.gb(16777216,null,0,2,null,w)),t.ob(45,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null),t.Ab(131072,f.b,[t.h])],function(l,n){var u=n.component;l(n,6,0,"primary"),l(n,10,0,"m1"),l(n,18,0,"tertiary","md"),l(n,21,0,"md","progress"),l(n,26,0,"md","completed"),l(n,35,0,"12");var e,o=(null==(e=t.Gb(n,37,0,l(n,39,0,t.zb(n,0),t.Gb(n,37,0,t.zb(n,38).transform(u.requests$)),u.status,"status")))?null:e.length)<=0&&"progress"===u.status;l(n,37,0,o);var r,i=(null==(r=t.Gb(n,41,0,l(n,43,0,t.zb(n,0),t.Gb(n,41,0,t.zb(n,42).transform(u.requests$)),u.status,"status")))?null:r.length)<=0&&"completed"===u.status;l(n,41,0,i),l(n,45,0,t.Gb(n,45,0,t.zb(n,46).transform(u.requests$)))},function(l,n){l(n,13,0,"n"===n.component.authService.userType?"All Requests":"My Requests")})}function M(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,1,"app-my-requests",[],null,null,null,R,h)),t.ob(1,114688,null,0,s,[o.a,r.Eb,i.a,b.a,r.Nb],null,null)],function(l,n){l(n,1,0)},null)}var G=t.lb("app-my-requests",s,M,{},{},[]),A=function(){return function(){}}();u.d(n,"MyRequestsPageModuleNgFactory",function(){return N});var N=t.mb(c,[],function(l){return t.wb([t.xb(512,t.j,t.bb,[[8,[p.a,G]],[3,t.j],t.x]),t.xb(4608,f.m,f.l,[t.u,[2,f.t]]),t.xb(4608,d.n,d.n,[]),t.xb(4608,r.c,r.c,[t.z,t.g]),t.xb(4608,r.Fb,r.Fb,[r.c,t.j,t.q,f.d]),t.xb(4608,r.Jb,r.Jb,[r.c,t.j,t.q,f.d]),t.xb(1073742336,f.c,f.c,[]),t.xb(1073742336,d.l,d.l,[]),t.xb(1073742336,d.b,d.b,[]),t.xb(1073742336,r.Cb,r.Cb,[]),t.xb(1073742336,m.o,m.o,[[2,m.u],[2,m.m]]),t.xb(1073742336,A,A,[]),t.xb(1073742336,c,c,[]),t.xb(1024,m.k,function(){return[[{path:"",component:s}]]},[])])})}}]);