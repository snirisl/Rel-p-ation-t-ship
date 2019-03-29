(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["requests-requests-module"],{

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _requests_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./requests.page */ "./src/app/requests/requests.page.ts");







var routes = [
    {
        path: '',
        component: _requests_page__WEBPACK_IMPORTED_MODULE_6__["RequestsPage"]
    }
];
var RequestsPageModule = /** @class */ (function () {
    function RequestsPageModule() {
    }
    RequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_requests_page__WEBPACK_IMPORTED_MODULE_6__["RequestsPage"]]
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

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Requests</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-tabs>\n    <ion-tab-bar slot=\"bottom\">\n      <ion-tab-button tab=\"add-requests\">\n        <ion-label>Add Requests</ion-label>\n        <ion-icon name=\"add-circle\"></ion-icon>\n      </ion-tab-button>\n      <ion-tab-button tab=\"my-requests\">\n        <ion-label>My Requests</ion-label>\n        <ion-icon name=\"checkbox\"></ion-icon>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n</ion-content>\n"

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


var RequestsPage = /** @class */ (function () {
    function RequestsPage() {
    }
    RequestsPage.prototype.ngOnInit = function () {
    };
    RequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-requests',
            template: __webpack_require__(/*! ./requests.page.html */ "./src/app/requests/requests.page.html"),
            styles: [__webpack_require__(/*! ./requests.page.scss */ "./src/app/requests/requests.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], RequestsPage);
    return RequestsPage;
}());



/***/ })

}]);
//# sourceMappingURL=requests-requests-module.js.map