(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["assign-rooms-assign-rooms-module"],{

/***/ "./src/app/assign-rooms/assign-rooms.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/assign-rooms/assign-rooms.module.ts ***!
  \*****************************************************/
/*! exports provided: AssignRoomsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignRoomsPageModule", function() { return AssignRoomsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _assign_rooms_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assign-rooms.page */ "./src/app/assign-rooms/assign-rooms.page.ts");







var routes = [
    {
        path: '',
        component: _assign_rooms_page__WEBPACK_IMPORTED_MODULE_6__["AssignRoomsPage"]
    }
];
var AssignRoomsPageModule = /** @class */ (function () {
    function AssignRoomsPageModule() {
    }
    AssignRoomsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_assign_rooms_page__WEBPACK_IMPORTED_MODULE_6__["AssignRoomsPage"]]
        })
    ], AssignRoomsPageModule);
    return AssignRoomsPageModule;
}());



/***/ }),

/***/ "./src/app/assign-rooms/assign-rooms.page.html":
/*!*****************************************************!*\
  !*** ./src/app/assign-rooms/assign-rooms.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Assign Rooms</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher> -->\n  <ion-grid>\n    <ion-row>\n      <ion-col size-sm=\"6\" offset-sm=\"3\">\n        <ion-card *ngIf=\"roomList$ | async as roomList\">\n          <ion-card-title text-center>Your assigned rooms</ion-card-title>\n          <ion-card-header *ngIf=\"(roomList$ | async)?.length <= 0\"\n            >No rooms assigned yet</ion-card-header\n          >\n          <ion-card-content>\n            <ion-list *ngFor=\"let assignedRoom of roomList\">\n              <ion-item>\n                {{ assignedRoom.roomNum }}\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <form #f=\"ngForm\" (ngSubmit)=\"assignRooms()\">\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-list>\n            <ion-label position=\"floating\">Choose rooms to assign:</ion-label>\n            <ion-select\n              placeholder=\"Select Rooms\"\n              [(ngModel)]=\"assignRoomsVar\"\n              name=\"rooms\"\n              required\n              multiple=\"true\"\n            >\n              <ion-select-option\n                *ngFor=\"let room of allRooms$ | async\"\n                [value]=\"room.roomNum\"\n              >\n                {{ room.roomNum }}\n              </ion-select-option>\n            </ion-select>\n          </ion-list>\n          <ion-button\n            type=\"submit\"\n            color=\"primary\"\n            expand=\"block\"\n            [disabled]=\"!f.valid\"\n            >Assign</ion-button\n          >\n        </ion-col>\n      </ion-row>\n    </form>\n    <form #f2=\"ngForm\" (ngSubmit)=\"unassignRooms()\">\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-list>\n            <ion-label position=\"floating\">Choose rooms to unassign:</ion-label>\n            <ion-select\n              placeholder=\"Select Rooms\"\n              [(ngModel)]=\"unassignRoomsVar\"\n              name=\"rooms\"\n              required\n              multiple=\"true\"\n            >\n              <ion-select-option\n                *ngFor=\"let room of roomList$ | async\"\n                [value]=\"room.roomNum\"\n              >\n                {{ room.roomNum }}\n              </ion-select-option>\n            </ion-select>\n          </ion-list>\n          <ion-button\n            type=\"submit\"\n            color=\"primary\"\n            expand=\"block\"\n            [disabled]=\"!f2.valid\"\n            >UnAssign</ion-button\n          >\n        </ion-col>\n      </ion-row>\n    </form>\n  </ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/assign-rooms/assign-rooms.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/assign-rooms/assign-rooms.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Fzc2lnbi1yb29tcy9hc3NpZ24tcm9vbXMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/assign-rooms/assign-rooms.page.ts":
/*!***************************************************!*\
  !*** ./src/app/assign-rooms/assign-rooms.page.ts ***!
  \***************************************************/
/*! exports provided: AssignRoomsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignRoomsPage", function() { return AssignRoomsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users/users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");





var AssignRoomsPage = /** @class */ (function () {
    function AssignRoomsPage(userService, authService, firestore) {
        this.userService = userService;
        this.authService = authService;
        this.firestore = firestore;
    }
    AssignRoomsPage.prototype.ngOnInit = function () {
        this.allRooms$ = this.userService.getRooms();
        this.roomList$ = this.userService.getRoomsAssigned();
        this.nurseId$ = this.authService.userId;
    };
    AssignRoomsPage.prototype.ionViewWillEnter = function () {
        this.allRooms$ = this.userService.getRooms();
        this.roomList$ = this.userService.getRoomsAssigned();
        this.nurseId$ = this.authService.userId;
    };
    AssignRoomsPage.prototype.assignRooms = function () {
        var _this = this;
        var nurseId;
        this.nurseId$.subscribe(function (x) {
            nurseId = x;
        });
        this.assignRoomsVar.forEach(function (element) {
            _this.roomDoc = _this.firestore.doc('rooms/' + element);
            _this.roomDoc.update({ assignedNurse: nurseId });
        });
        this.assignRoomsVar = [];
    };
    AssignRoomsPage.prototype.unassignRooms = function () {
        var _this = this;
        var nurseId;
        this.nurseId$.subscribe(function (x) {
            nurseId = x;
        });
        console.log(this.unassignRoomsVar);
        this.unassignRoomsVar.forEach(function (element) {
            _this.roomDoc = _this.firestore.doc('rooms/' + element);
            _this.roomDoc.update({ assignedNurse: '' });
        });
        this.unassignRoomsVar = [];
    };
    AssignRoomsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-assign-rooms',
            template: __webpack_require__(/*! ./assign-rooms.page.html */ "./src/app/assign-rooms/assign-rooms.page.html"),
            styles: [__webpack_require__(/*! ./assign-rooms.page.scss */ "./src/app/assign-rooms/assign-rooms.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], AssignRoomsPage);
    return AssignRoomsPage;
}());



/***/ })

}]);
//# sourceMappingURL=assign-rooms-assign-rooms-module.js.map