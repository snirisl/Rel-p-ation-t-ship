(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["requests-requests-module"],{

/***/ "./src/app/requests/requests-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/requests/requests-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: RequestsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestsRoutingModule", function() { return RequestsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _requests_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requests.page */ "./src/app/requests/requests.page.ts");




var routes = [
    {
        path: 'tabs',
        component: _requests_page__WEBPACK_IMPORTED_MODULE_3__["RequestsPage"],
        children: [
            {
                path: 'add-requests',
                children: [
                    {
                        path: '',
                        loadChildren: './add-requests/add-requests.module#AddRequestsPageModule'
                    }
                ]
            },
            {
                path: 'my-requests',
                children: [
                    {
                        path: '',
                        loadChildren: './my-requests/my-requests.module#MyRequestsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/requests/tabs/my-requests',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/requests/tabs/my-requests',
        pathMatch: 'full'
    }
];
var RequestsRoutingModule = /** @class */ (function () {
    function RequestsRoutingModule() {
    }
    RequestsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], RequestsRoutingModule);
    return RequestsRoutingModule;
}());



/***/ }),

/***/ "./src/app/requests/requests.module.ts":
/*!*********************************************!*\
  !*** ./src/app/requests/requests.module.ts ***!
  \*********************************************/
/*! exports provided: RequestsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestsPageModule", function() { return RequestsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _requests_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requests.page */ "./src/app/requests/requests.page.ts");
/* harmony import */ var _requests_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./requests-routing.module */ "./src/app/requests/requests-routing.module.ts");







var RequestsPageModule = /** @class */ (function () {
    function RequestsPageModule() {
    }
    RequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _requests_routing_module__WEBPACK_IMPORTED_MODULE_6__["RequestsRoutingModule"]
            ],
            declarations: [_requests_page__WEBPACK_IMPORTED_MODULE_5__["RequestsPage"]]
        })
    ], RequestsPageModule);
    return RequestsPageModule;
}());



/***/ }),

/***/ "./src/app/requests/requests.page.html":
/*!*********************************************!*\
  !*** ./src/app/requests/requests.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-tabs>\n  <ion-tab-bar slot=\"bottom\" color=\"primary\">\n    <ion-tab-button\n      tab=\"add-requests\"\n      *ngIf=\"this.authService.userType === 'p'\"\n    >\n      <ion-label>Add Requests</ion-label>\n      <ion-icon name=\"add-circle\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button tab=\"my-requests\">\n      <ion-label>{{\n        this.authService.userType === 'p' ? 'My Requests' : 'All Requests'\n      }}</ion-label>\n      <ion-icon name=\"checkbox\"></ion-icon>\n    </ion-tab-button>\n  </ion-tab-bar>\n</ion-tabs>\n"

/***/ }),

/***/ "./src/app/requests/requests.page.scss":
/*!*********************************************!*\
  !*** ./src/app/requests/requests.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcXVlc3RzL3JlcXVlc3RzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/requests/requests.page.ts":
/*!*******************************************!*\
  !*** ./src/app/requests/requests.page.ts ***!
  \*******************************************/
/*! exports provided: RequestsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestsPage", function() { return RequestsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");



var RequestsPage = /** @class */ (function () {
    function RequestsPage(authService) {
        this.authService = authService;
    }
    RequestsPage.prototype.ngOnInit = function () { };
    RequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-requests',
            template: __webpack_require__(/*! ./requests.page.html */ "./src/app/requests/requests.page.html"),
            styles: [__webpack_require__(/*! ./requests.page.scss */ "./src/app/requests/requests.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], RequestsPage);
    return RequestsPage;
}());



/***/ })

}]);
//# sourceMappingURL=requests-requests-module.js.map