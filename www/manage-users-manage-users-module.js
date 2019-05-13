(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-users-manage-users-module"],{

/***/ "./src/app/manage-users/manage-users.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/manage-users/manage-users.module.ts ***!
  \*****************************************************/
/*! exports provided: ManageUsersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUsersPageModule", function() { return ManageUsersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _manage_users_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manage-users.page */ "./src/app/manage-users/manage-users.page.ts");







var routes = [
    {
        path: '',
        component: _manage_users_page__WEBPACK_IMPORTED_MODULE_6__["ManageUsersPage"]
    }
];
var ManageUsersPageModule = /** @class */ (function () {
    function ManageUsersPageModule() {
    }
    ManageUsersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_manage_users_page__WEBPACK_IMPORTED_MODULE_6__["ManageUsersPage"]]
        })
    ], ManageUsersPageModule);
    return ManageUsersPageModule;
}());



/***/ }),

/***/ "./src/app/manage-users/manage-users.page.html":
/*!*****************************************************!*\
  !*** ./src/app/manage-users/manage-users.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Manager Users</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf=\"usersList?.length > 0; else noUsers\">\n    <ion-list *ngFor=\"let user of usersList\">\n      <ion-item-sliding #slidingItem>\n        <ion-item text-wrap color=\"{{ user.type == 'p' ? 'light' : 'dark' }}\"\n          ><ion-avatar\n            ><ion-icon name=\"contact\" size=\"large\"></ion-icon\n          ></ion-avatar>\n          <ion-label>\n            <h5>{{ user.name }}:</h5>\n            <p *ngIf=\"user.type == 'p'\">\n              Room Number: {{ user.room }}\n            </p>\n            <p>\n              {{ user.type == 'p' ? 'Patient' : 'Nurse' }}\n            </p>\n            <div *ngIf=\"editState && userToEdit.id == user.id\">\n              <form #f=\"ngForm\" (ngSubmit)=\"update(user)\">\n                <ion-list>\n                  <ion-item>\n                    <ion-input\n                      type=\"string\"\n                      ngModel\n                      name=\"name\"\n                      required\n                      #uidCtrl=\"ngModel\"\n                      [(ngModel)]=\"user.name\"\n                    ></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-select\n                      placeholder=\"Select Type\"\n                      interface=\"popover\"\n                      ngModel\n                      name=\"type\"\n                      required\n                      #typeCtrl=\"ngModel\"\n                      [(ngModel)]=\"user.type\"\n                    >\n                      <ion-select-option value=\"p\">Patient</ion-select-option>\n                      <ion-select-option value=\"n\">Nurse</ion-select-option>\n                    </ion-select>\n                  </ion-item>\n                  <ion-item *ngIf=\"typeCtrl.value == 'p'\">\n                    <ion-select\n                      placeholder=\"Select Room Number\"\n                      interface=\"popover\"\n                      ngModel\n                      name=\"room\"\n                      required\n                      #roomCtrl=\"ngModel\"\n                      [(ngModel)]=\"user.room\"\n                    >\n                      <ion-select-option\n                        *ngFor=\"let room of roomsList\"\n                        value=\"{{ room.roomNum }}\"\n                        >{{ room.roomNum }}\n                      </ion-select-option>\n                    </ion-select>\n                  </ion-item>\n                  <ion-item>\n                    <ion-button\n                      type=\"submit\"\n                      color=\"warning\"\n                      expand=\"block\"\n                      [disabled]=\"!f.valid\"\n                      >Update User</ion-button\n                    >\n                    <ion-button (click)=\"clearState()\" color=\"dark\"\n                      >Cancel</ion-button\n                    >\n                  </ion-item>\n                </ion-list>\n              </form>\n            </div>\n          </ion-label>\n        </ion-item>\n        <ion-item-options side=\"end\" *ngIf=\"user.type == 'p'\">\n          <ion-item-option\n            color=\"secondary\"\n            (click)=\"editUser($event, user, slidingItem)\"\n            size=\"small\"\n          >\n            <ion-icon name=\"create\" slot=\"icon-only\"></ion-icon>\n          </ion-item-option>\n          <ion-item-option color=\"danger\" (click)=\"delete(user)\">\n            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\n          </ion-item-option>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n\n  <ng-template #noUsers>\n    <hr />\n    <h5>There are no users yet.</h5>\n  </ng-template>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/manage-users/manage-users.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/manage-users/manage-users.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list {\n  margin: 10px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Wb2x1bWVzL2hkZDIvVWRlbXkgSW9uaWNfQW5ndWxhci9pb25pYzRfY291cnNlL1JlbC1wLWF0aW9uLXQtc2hpcC9zcmMvYXBwL21hbmFnZS11c2Vycy9tYW5hZ2UtdXNlcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUJBQ0osRUFBQSIsImZpbGUiOiJzcmMvYXBwL21hbmFnZS11c2Vycy9tYW5hZ2UtdXNlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3Qge1xuICAgIG1hcmdpbjogMTBweCAhaW1wb3J0YW50XG59Il19 */"

/***/ }),

/***/ "./src/app/manage-users/manage-users.page.ts":
/*!***************************************************!*\
  !*** ./src/app/manage-users/manage-users.page.ts ***!
  \***************************************************/
/*! exports provided: ManageUsersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUsersPage", function() { return ManageUsersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users/users.service */ "./src/app/users/users.service.ts");



var ManageUsersPage = /** @class */ (function () {
    function ManageUsersPage(usersService) {
        this.usersService = usersService;
        this.editState = false;
    }
    ManageUsersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.usersService.getUsers().subscribe(function (users) {
            _this.usersList = users;
        });
        this.usersService.getRooms().subscribe(function (rooms) {
            _this.roomsList = rooms;
        });
    };
    ManageUsersPage.prototype.create = function (user) {
        this.usersService.add(user);
    };
    ManageUsersPage.prototype.update = function (user) {
        console.log('in update');
        this.usersService.updateAddedUser(user);
        this.clearState();
    };
    ManageUsersPage.prototype.delete = function (user) {
        this.clearState();
        this.usersService.deleteUser(user);
    };
    ManageUsersPage.prototype.editUser = function (event, user, itemSliding) {
        itemSliding.close();
        this.editState = true;
        this.userToEdit = user;
    };
    ManageUsersPage.prototype.clearState = function () {
        this.editState = false;
        this.userToEdit = null;
    };
    ManageUsersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-manage-users',
            template: __webpack_require__(/*! ./manage-users.page.html */ "./src/app/manage-users/manage-users.page.html"),
            styles: [__webpack_require__(/*! ./manage-users.page.scss */ "./src/app/manage-users/manage-users.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"]])
    ], ManageUsersPage);
    return ManageUsersPage;
}());



/***/ })

}]);
//# sourceMappingURL=manage-users-manage-users-module.js.map