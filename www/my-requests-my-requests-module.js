(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["my-requests-my-requests-module"],{

/***/ "./src/app/application-pipes/application-pipes.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/application-pipes/application-pipes.module.ts ***!
  \***************************************************************/
/*! exports provided: ApplicationPipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationPipesModule", function() { return ApplicationPipesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _filter_pipes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../filter.pipes */ "./src/app/filter.pipes.ts");
/* harmony import */ var _arraySort_pipes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../arraySort.pipes */ "./src/app/arraySort.pipes.ts");





var ApplicationPipesModule = /** @class */ (function () {
    function ApplicationPipesModule() {
    }
    ApplicationPipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_filter_pipes__WEBPACK_IMPORTED_MODULE_3__["FilterPipe"], _arraySort_pipes__WEBPACK_IMPORTED_MODULE_4__["ArraySortPipe"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_filter_pipes__WEBPACK_IMPORTED_MODULE_3__["FilterPipe"], _arraySort_pipes__WEBPACK_IMPORTED_MODULE_4__["ArraySortPipe"]]
        })
    ], ApplicationPipesModule);
    return ApplicationPipesModule;
}());



/***/ }),

/***/ "./src/app/arraySort.pipes.ts":
/*!************************************!*\
  !*** ./src/app/arraySort.pipes.ts ***!
  \************************************/
/*! exports provided: ArraySortPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArraySortPipe", function() { return ArraySortPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ArraySortPipe = /** @class */ (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array) {
        array.sort(function (a, b) {
            if (a.status > b.status) {
                return -1;
            }
            else if (a.status < b.status) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    ArraySortPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'sortArray'
        })
    ], ArraySortPipe);
    return ArraySortPipe;
}());



/***/ }),

/***/ "./src/app/filter.pipes.ts":
/*!*********************************!*\
  !*** ./src/app/filter.pipes.ts ***!
  \*********************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (arrangement, text, column) {
        // if (text === '') {
        //   return arrangement;
        // }
        if (!arrangement) {
            return arrangement;
        }
        text = text.toLowerCase();
        return arrangement.filter(function (item) {
            return item.status.toLowerCase().includes(text);
        });
    };
    FilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'filter'
        })
    ], FilterPipe);
    return FilterPipe;
}());



/***/ }),

/***/ "./src/app/requests/my-requests/my-requests.module.ts":
/*!************************************************************!*\
  !*** ./src/app/requests/my-requests/my-requests.module.ts ***!
  \************************************************************/
/*! exports provided: MyRequestsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyRequestsPageModule", function() { return MyRequestsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _my_requests_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./my-requests.page */ "./src/app/requests/my-requests/my-requests.page.ts");
/* harmony import */ var src_app_application_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/application-pipes/application-pipes.module */ "./src/app/application-pipes/application-pipes.module.ts");








var routes = [
    {
        path: '',
        component: _my_requests_page__WEBPACK_IMPORTED_MODULE_6__["MyRequestsPage"]
    }
];
var MyRequestsPageModule = /** @class */ (function () {
    function MyRequestsPageModule() {
    }
    MyRequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                src_app_application_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"]
            ],
            declarations: [_my_requests_page__WEBPACK_IMPORTED_MODULE_6__["MyRequestsPage"]]
        })
    ], MyRequestsPageModule);
    return MyRequestsPageModule;
}());



/***/ }),

/***/ "./src/app/requests/my-requests/my-requests.page.html":
/*!************************************************************!*\
  !*** ./src/app/requests/my-requests/my-requests.page.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>My Requests</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-segment mode=\"md\" (ionChange)=\"onFilterUpdate($event)\" color=\"tertiary\">\n    <ion-segment-button value=\"progress\" mode=\"md\"\n      ><ion-label>Pending Requests</ion-label></ion-segment-button\n    >\n    <ion-segment-button value=\"completed\" mode=\"md\"\n      ><ion-label>Completed Requests</ion-label></ion-segment-button\n    >\n  </ion-segment>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\" size-sm=\"8\" offset-sm=\"2\" text-center>\n        <div *ngIf=\"isLoading\" text-center>\n          <ion-spinner color=\"primary\"></ion-spinner>\n        </div>\n        <div\n          text-center\n          *ngIf=\"\n            (requestsList | filter: status:'status')?.length <= 0 &&\n            status === 'progress'\n          \"\n        >\n          <p>\n            No Requests found! Please create one first!\n          </p>\n          <ion-button color=\"primary\" routerLink=\"/requests/tabs/add-requests\"\n            >Add Request</ion-button\n          >\n        </div>\n        <div\n          text-center\n          *ngIf=\"\n            (requestsList | filter: status:'status')?.length <= 0 &&\n            status === 'completed'\n          \"\n        >\n          <p>\n            No Completed Requests yet...\n          </p>\n        </div>\n        <ion-list *ngIf=\"!isLoading || requestsList?.length > 0\">\n          <ion-item-sliding\n            *ngFor=\"let request of requestsList | filter: status:'status'\"\n            #slidingItem\n          >\n            <ion-item\n              *ngIf=\"\n                (this.authService.userType === 'p' &&\n                  request.patientName === this.authService.userName) ||\n                this.authService.userType === 'n'\n              \"\n            >\n              <ion-thumbnail slot=\"start\">\n                <ion-img [src]=\"request.imgUrl\"></ion-img>\n              </ion-thumbnail>\n              <ion-label>\n                <h2>{{ request.title }}</h2>\n                <h5>{{ request.description }}</h5>\n                <p *ngIf=\"request.data !== ''\">\n                  {{ request.date.toDate() | date: 'dd/MM/yyyy HH:mm':'+3' }}\n                </p>\n                <ion-text\n                  *ngIf=\"\n                    request.status === 'In progress' &&\n                    this.segment.value === 'progress'\n                  \"\n                  color=\"primary\"\n                >\n                  {{ request.patientName }}\n                </ion-text>\n                <ion-text\n                  *ngIf=\"\n                    request.status === 'Completed' &&\n                    this.segment.value === 'completed'\n                  \"\n                  color=\"primary\"\n                >\n                  {{ request.nurseName }}\n                </ion-text>\n                <ion-label\n                  slot=\"start\"\n                  text-right\n                  *ngIf=\"\n                    request.status === 'In progress' &&\n                    this.segment.value === 'progress'\n                  \"\n                  color=\"secondary\"\n                  >In progress</ion-label\n                >\n                <ion-label\n                  *ngIf=\"\n                    request.status === 'Completed' &&\n                    this.segment.value === 'completed'\n                  \"\n                  color=\"success\"\n                  slot=\"start\"\n                  text-right\n                  >Completed</ion-label\n                >\n              </ion-label>\n            </ion-item>\n            <div *ngIf=\"request.status !== 'Completed'\">\n              <ion-item-options\n                side=\"end\"\n                *ngIf=\"this.authService.userType !== 'p'\"\n              >\n                <ion-item-option\n                  color=\"secondary\"\n                  (click)=\"setAsCompleted(slidingItem, request)\"\n                  *ngIf=\"request.status !== 'Completed'\"\n                >\n                  <ion-icon name=\"done-all\" slot=\"icon-only\"></ion-icon>\n                </ion-item-option>\n              </ion-item-options>\n            </div>\n          </ion-item-sliding>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/requests/my-requests/my-requests.page.scss":
/*!************************************************************!*\
  !*** ./src/app/requests/my-requests/my-requests.page.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcXVlc3RzL215LXJlcXVlc3RzL215LXJlcXVlc3RzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/requests/my-requests/my-requests.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/requests/my-requests/my-requests.page.ts ***!
  \**********************************************************/
/*! exports provided: MyRequestsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyRequestsPage", function() { return MyRequestsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _requests_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../requests.service */ "./src/app/requests/requests.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var src_app_auth_user_state_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/auth/user-state.service */ "./src/app/auth/user-state.service.ts");








var MyRequestsPage = /** @class */ (function () {
    function MyRequestsPage(requestsService, router, loadingCtrl, authService, firestore, userStateService) {
        this.requestsService = requestsService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.firestore = firestore;
        this.userStateService = userStateService;
        this.status = 'progress';
        this.isLoading = false;
    }
    MyRequestsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.segment.value = 'progress';
        this.requestSubscription = this.requestsService
            .getRequests()
            .subscribe(function (requests) {
            _this.requestsList = requests;
        });
    };
    MyRequestsPage.prototype.ngOnDestroy = function () {
        if (this.requestSubscription) {
            this.requestSubscription.unsubscribe();
        }
    };
    MyRequestsPage.prototype.onFilterUpdate = function (event) {
        var filteredOption = event.detail.value;
        this.status = filteredOption;
    };
    MyRequestsPage.prototype.setAsCompleted = function (slidingItem, request) {
        var _this = this;
        slidingItem.close();
        this.loadingCtrl
            .create({
            message: 'Setting Request as Completed...'
        })
            .then(function (loadingEl) {
            loadingEl.present();
            _this.requestsService.updateRequest(request).then(function () {
                loadingEl.dismiss();
            });
        });
    };
    MyRequestsPage.prototype.deleteRequest = function (slidingItem, request) {
        var _this = this;
        console.log('in delete');
        slidingItem.close();
        this.loadingCtrl
            .create({
            message: 'Deleting Request...'
        })
            .then(function (loadingEl) {
            loadingEl.present();
            console.log('in delete 2');
            _this.requestsService.deleteRequest(request).then(function () {
                loadingEl.dismiss();
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonSegment"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonSegment"])
    ], MyRequestsPage.prototype, "segment", void 0);
    MyRequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-my-requests',
            template: __webpack_require__(/*! ./my-requests.page.html */ "./src/app/requests/my-requests/my-requests.page.html"),
            styles: [__webpack_require__(/*! ./my-requests.page.scss */ "./src/app/requests/my-requests/my-requests.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_requests_service__WEBPACK_IMPORTED_MODULE_2__["RequestsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"],
            src_app_auth_user_state_service__WEBPACK_IMPORTED_MODULE_7__["UserStateService"]])
    ], MyRequestsPage);
    return MyRequestsPage;
}());



/***/ })

}]);
//# sourceMappingURL=my-requests-my-requests-module.js.map