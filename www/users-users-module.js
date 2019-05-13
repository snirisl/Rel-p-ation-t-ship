(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/users/users.module.ts":
/*!***************************************!*\
  !*** ./src/app/users/users.module.ts ***!
  \***************************************/
/*! exports provided: UsersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersPageModule", function() { return UsersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _users_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users.page */ "./src/app/users/users.page.ts");







var routes = [
    {
        path: '',
        component: _users_page__WEBPACK_IMPORTED_MODULE_6__["UsersPage"]
    }
];
var UsersPageModule = /** @class */ (function () {
    function UsersPageModule() {
    }
    UsersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_users_page__WEBPACK_IMPORTED_MODULE_6__["UsersPage"]]
        })
    ], UsersPageModule);
    return UsersPageModule;
}());



/***/ }),

/***/ "./src/app/users/users.page.html":
/*!***************************************!*\
  !*** ./src/app/users/users.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Add a New User</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-list>\n            <ion-item>\n              <ion-label position=\"floating\">ID (without opening 0)</ion-label>\n              <ion-input\n                type=\"string\"\n                ngModel\n                name=\"uid\"\n                required\n                #uidCtrl=\"ngModel\"\n              ></ion-input>\n            </ion-item>\n            <ion-item *ngIf=\"!uidCtrl.valid && uidCtrl.touched\" lines=\"none\">\n              <ion-label>\n                Should be at least 8 characters long.\n              </ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"floating\">Name</ion-label>\n              <ion-input\n                type=\"text\"\n                ngModel\n                name=\"name\"\n                required\n                minlength=\"2\"\n                #nameCtrl=\"ngModel\"\n              ></ion-input>\n            </ion-item>\n            <ion-item *ngIf=\"!nameCtrl.valid && nameCtrl.touched\" lines=\"none\">\n              <ion-label>\n                Should be at least 2 characters long.\n              </ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"floating\">Type</ion-label>\n              <ion-select\n                placeholder=\"Select Type\"\n                interface=\"popover\"\n                ngModel\n                name=\"type\"\n                required\n                #typeCtrl=\"ngModel\"\n              >\n                <ion-select-option value=\"p\">Patient</ion-select-option>\n                <ion-select-option value=\"n\">Nurse</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item *ngIf=\"!typeCtrl.valid && typeCtrl.touched\" lines=\"none\">\n              <ion-label>\n                You must choose a user type.\n              </ion-label>\n            </ion-item>\n            <ion-item *ngIf=\"typeCtrl.value == 'p'\">\n              <ion-label position=\"floating\">Room Number</ion-label>\n              <ion-select\n                placeholder=\"Select Room Number\"\n                interface=\"popover\"\n                ngModel\n                name=\"room\"\n                required\n                #roomCtrl=\"ngModel\"\n              >\n              <ion-select-option\n              *ngFor=\"let room of roomsList\"\n              value=\"{{ room.roomNum }}\"\n              >{{ room.roomNum }}\n            </ion-select-option>\n              </ion-select>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <div text-center>\n            <ion-button\n              type=\"submit\"\n              color=\"primary\"\n              expand=\"block\"\n              [disabled]=\"!f.valid\"\n            >\n              Create\n            </ion-button>\n            <p text-center>OR</p>\n            <ion-button type=\"submit\" color=\"primary\" expand=\"block\">\n              <ion-icon name=\"camera\"></ion-icon>\n              Take a Picture of the Patient Sticker\n            </ion-button>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/users/users.page.scss":
/*!***************************************!*\
  !*** ./src/app/users/users.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXJzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/users/users.page.ts":
/*!*************************************!*\
  !*** ./src/app/users/users.page.ts ***!
  \*************************************/
/*! exports provided: UsersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersPage", function() { return UsersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _users_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users.model */ "./src/app/users/users.model.ts");







var UsersPage = /** @class */ (function () {
    function UsersPage(authService, router, loadingCtrl, alertCtrl, usersService) {
        this.authService = authService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.usersService = usersService;
        this.isLoading = false;
    }
    UsersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.usersSub = this.usersService.getUsers().subscribe(function (users) {
            _this.usersList = users;
        });
        this.usersService.getRooms().subscribe(function (rooms) {
            _this.roomsList = rooms;
        });
    };
    UsersPage.prototype.ngOnDestroy = function () {
        if (this.usersSub) {
            this.usersSub.unsubscribe();
        }
    };
    UsersPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.isLoading = true;
        this.usersService.fetchUsers().subscribe(function () {
            _this.isLoading = false;
        });
    };
    UsersPage.prototype.onSubmit = function (form) {
        if (!form.valid) {
            return;
        }
        var uid = form.value.uid + '@test.com';
        var password = form.value.uid;
        var name = form.value.name;
        var type = form.value.type;
        var room = form.value.room ? form.value.room : '0';
        this.createUser(uid, password, name, type, room);
        form.reset();
    };
    UsersPage.prototype.createUser = function (uid, password, name, type, room) {
        var _this = this;
        var localId;
        this.isLoading = true;
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Creating User...' })
            .then(function (loadingEl) {
            loadingEl.present();
            var authObs;
            authObs = _this.authService.signup(uid, password);
            authObs.subscribe(function (resData) {
                localId = resData.localId;
                _this.isLoading = false;
                loadingEl.dismiss();
                var newAddedUser = new _users_model__WEBPACK_IMPORTED_MODULE_6__["Users"](uid, name, type, room, localId);
                _this.usersService.add(newAddedUser);
                _this.router.navigateByUrl('/requests/tabs/my-requests');
            }, function (errRes) {
                loadingEl.dismiss();
                var code = errRes.error.error.message;
                var message = 'Could not add user, please try again.';
                if (code === 'EMAIL_EXISTS') {
                    message = 'This Id exists already!';
                }
                _this.showAlert(message);
            });
        });
    };
    UsersPage.prototype.showAlert = function (message) {
        this.alertCtrl
            .create({
            header: 'User creation failed',
            message: message,
            buttons: ['Okay']
        })
            .then(function (alertEl) { return alertEl.present(); });
    };
    UsersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.page.html */ "./src/app/users/users.page.html"),
            styles: [__webpack_require__(/*! ./users.page.scss */ "./src/app/users/users.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            _users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"]])
    ], UsersPage);
    return UsersPage;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map