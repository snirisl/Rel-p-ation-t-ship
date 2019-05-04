(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-requests-add-requests-module"],{

/***/ "./src/app/requests/add-requests/add-requests.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/requests/add-requests/add-requests.module.ts ***!
  \**************************************************************/
/*! exports provided: AddRequestsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRequestsPageModule", function() { return AddRequestsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_requests_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-requests.page */ "./src/app/requests/add-requests/add-requests.page.ts");







var routes = [
    {
        path: '',
        component: _add_requests_page__WEBPACK_IMPORTED_MODULE_6__["AddRequestsPage"]
    }
];
var AddRequestsPageModule = /** @class */ (function () {
    function AddRequestsPageModule() {
    }
    AddRequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_add_requests_page__WEBPACK_IMPORTED_MODULE_6__["AddRequestsPage"]]
        })
    ], AddRequestsPageModule);
    return AddRequestsPageModule;
}());



/***/ }),

/***/ "./src/app/requests/add-requests/add-requests.page.html":
/*!**************************************************************!*\
  !*** ./src/app/requests/add-requests/add-requests.page.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>New Request</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col *ngFor=\"let request of loadedRequests\" size=\"6\" no-padding>\n        <ion-card style=\"min-height: 250px\" (click)=\"addRequest(request)\">\n          <ion-card-header>\n            <ion-card-subtitle>{{ request.title }}</ion-card-subtitle>\n          </ion-card-header>\n          <ion-img [src]=\"request.imgUrl\"></ion-img>\n          <ion-card-content>\n            <p>{{ request.description }}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-text color=\"primary\" text-center padding>\n    <h5>\n      <ion-icon name=\"help-circle-outline\" color=\"secondary\"></ion-icon> Tap on one of the\n      requests, to send it to the medical stuff.\n    </h5>\n  </ion-text>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/requests/add-requests/add-requests.page.scss":
/*!**************************************************************!*\
  !*** ./src/app/requests/add-requests/add-requests.page.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcXVlc3RzL2FkZC1yZXF1ZXN0cy9hZGQtcmVxdWVzdHMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/requests/add-requests/add-requests.page.ts":
/*!************************************************************!*\
  !*** ./src/app/requests/add-requests/add-requests.page.ts ***!
  \************************************************************/
/*! exports provided: AddRequestsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRequestsPage", function() { return AddRequestsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _requests_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../requests.service */ "./src/app/requests/requests.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _department_requests_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../department-requests.service */ "./src/app/requests/department-requests.service.ts");






var AddRequestsPage = /** @class */ (function () {
    function AddRequestsPage(requestsService, departmentRequestsService, actionSheetCtrl, alertController, router) {
        this.requestsService = requestsService;
        this.departmentRequestsService = departmentRequestsService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertController = alertController;
        this.router = router;
    }
    AddRequestsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.requestsSub = this.departmentRequestsService.departmentRequests.subscribe(function (requests) {
            _this.loadedRequests = requests;
        });
    };
    AddRequestsPage.prototype.ngOnDestroy = function () {
        if (this.requestsSub) {
            this.requestsSub.unsubscribe();
        }
    };
    AddRequestsPage.prototype.addRequest = function (request) {
        var _this = this;
        this.actionSheetCtrl
            .create({
            header: 'Send this Request?',
            buttons: [
                {
                    text: 'Send',
                    handler: function () {
                        _this.presentAlert(request);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        })
            .then(function (actionSheetEl) {
            actionSheetEl.present();
        });
    };
    AddRequestsPage.prototype.presentAlert = function (request) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Request Sent',
                            message: 'Your request has been submitted to the medical stuff.<br><br>Thank you.',
                            buttons: [
                                {
                                    text: 'Close',
                                    handler: function () {
                                        _this.requestsService.add(request).subscribe(function () {
                                            _this.router.navigateByUrl('/requests/tabs/my-requests');
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddRequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-requests',
            template: __webpack_require__(/*! ./add-requests.page.html */ "./src/app/requests/add-requests/add-requests.page.html"),
            styles: [__webpack_require__(/*! ./add-requests.page.scss */ "./src/app/requests/add-requests/add-requests.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_requests_service__WEBPACK_IMPORTED_MODULE_2__["RequestsService"],
            _department_requests_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentRequestsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AddRequestsPage);
    return AddRequestsPage;
}());



/***/ }),

/***/ "./src/app/requests/department-requests.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/requests/department-requests.service.ts ***!
  \*********************************************************/
/*! exports provided: DepartmentRequestsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentRequestsService", function() { return DepartmentRequestsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _static_requests_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./static-requests.model */ "./src/app/requests/static-requests.model.ts");




var DepartmentRequestsService = /** @class */ (function () {
    function DepartmentRequestsService() {
        this._departmentRequests = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([
            new _static_requests_model__WEBPACK_IMPORTED_MODULE_3__["StaticRequest"]('Towel', 'Need new towel', 'https://www.enchantehome.com/wp-content/uploads/2018/06/types-of-towels-1024x684.jpeg'),
            new _static_requests_model__WEBPACK_IMPORTED_MODULE_3__["StaticRequest"]('Get up', 'Need help getting out of bed', 'https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/2015/11/shutterstock_228939076-2.jpg'),
            new _static_requests_model__WEBPACK_IMPORTED_MODULE_3__["StaticRequest"]('Shower', 'I want to take a shower', 'https://img-aws.ehowcdn.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/ba3c626a08e64d8e88284ab26f8f1f6e.jpg'),
            new _static_requests_model__WEBPACK_IMPORTED_MODULE_3__["StaticRequest"]('Ouch!', 'I am in pain', 'https://www.virtua.org/-/media/Images/Virtua%20Enterprise/Virtua%20Corporate/Virtua%20Site/Teaser/pain-management-teaser.ashx?bc=ffffff&as=1&h=299&la=en&w=629&hash=FF3F56E787C52D09C58C0A57E9AF6ABF32DE2D45')
        ]);
    }
    Object.defineProperty(DepartmentRequestsService.prototype, "departmentRequests", {
        get: function () {
            return this._departmentRequests.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DepartmentRequestsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DepartmentRequestsService);
    return DepartmentRequestsService;
}());



/***/ }),

/***/ "./src/app/requests/static-requests.model.ts":
/*!***************************************************!*\
  !*** ./src/app/requests/static-requests.model.ts ***!
  \***************************************************/
/*! exports provided: StaticRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRequest", function() { return StaticRequest; });
var StaticRequest = /** @class */ (function () {
    function StaticRequest(title, description, imgUrl) {
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
    return StaticRequest;
}());



/***/ })

}]);
//# sourceMappingURL=add-requests-add-requests-module.js.map