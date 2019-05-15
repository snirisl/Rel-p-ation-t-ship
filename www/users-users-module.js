(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./node_modules/tesseract.js/package.json":
/*!************************************************!*\
  !*** ./node_modules/tesseract.js/package.json ***!
  \************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"tesseract.js","_id":"tesseract.js@1.0.19","_inBundle":false,"_integrity":"sha512-UXnCd2GkDOuVwPYv8MryzDwXEPLJ/BjEuT76PWzVC8XhZbsChRkpoiKDSGDbZ2BW2rwg1yBWJ0joSdCTw1umBA==","_location":"/tesseract.js","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"tesseract.js","name":"tesseract.js","escapedName":"tesseract.js","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/tesseract.js/-/tesseract.js-1.0.19.tgz","_shasum":"f66a9accef1aa933ec7e574d1bb3205f7d2aef65","_spec":"tesseract.js","_where":"/Volumes/hdd2/Udemy Ionic_Angular/ionic4_course/Rel-p-ation-t-ship","author":"","browser":{"./src/node/index.js":"./src/browser/index.js"},"bugs":{"url":"https://github.com/naptha/tesseract.js/issues"},"bundleDependencies":false,"dependencies":{"file-type":"^3.8.0","is-url":"1.2.2","isomorphic-fetch":"^2.2.1","jpeg-js":"^0.2.0","level-js":"^2.2.4","node-fetch":"^1.6.3","object-assign":"^4.1.0","png.js":"^0.2.1","tesseract.js-core":"^1.0.2"},"deprecated":false,"description":"Pure Javascript Multilingual OCR","devDependencies":{"babel-preset-es2015":"^6.16.0","babelify":"^7.3.0","browserify":"^13.1.0","concurrently":"^3.1.0","envify":"^3.4.1","http-server":"^0.9.0","pako":"^1.0.3","uglify-js":"^3.4.9","watchify":"^3.7.0"},"homepage":"https://github.com/naptha/tesseract.js","license":"Apache-2.0","main":"src/index.js","name":"tesseract.js","repository":{"type":"git","url":"git+https://github.com/naptha/tesseract.js.git"},"scripts":{"build":"browserify src/index.js -t [ babelify --presets [ es2015 ] ] -o dist/tesseract.js --standalone Tesseract && browserify src/browser/worker.js -t [ babelify --presets [ es2015 ] ] -o dist/worker.js && uglifyjs dist/tesseract.js --source-map -o dist/tesseract.min.js && uglifyjs dist/worker.js --source-map -o dist/worker.min.js","release":"npm run build && git commit -am 'new release' && git push && git tag `jq -r '.version' package.json` && git push origin --tags && npm publish","start":"concurrently --kill-others \"watchify src/index.js  -t [ envify --TESS_ENV development ] -t [ babelify --presets [ es2015 ] ] -o dist/tesseract.dev.js --standalone Tesseract\" \"watchify src/browser/worker.js  -t [ envify --TESS_ENV development ] -t [ babelify --presets [ es2015 ] ] -o dist/worker.dev.js\" \"http-server -p 7355\""},"version":"1.0.19"};

/***/ }),

/***/ "./node_modules/tesseract.js/src/browser/index.js":
/*!********************************************************!*\
  !*** ./node_modules/tesseract.js/src/browser/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defaultOptions = {
    // workerPath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js@0.2.0/dist/worker.js',
    corePath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js-core@0.1.0/index.js',    
    langPath: 'https://tessdata.projectnaptha.com/3.02/',
}

if (process.env.TESS_ENV === "development") {
    console.debug('Using Development Configuration')
    defaultOptions.workerPath = location.protocol + '//' + location.host + '/dist/worker.dev.js?nocache=' + Math.random().toString(36).slice(3)
}else{
    var version = __webpack_require__(/*! ../../package.json */ "./node_modules/tesseract.js/package.json").version;
    defaultOptions.workerPath = 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js@' + version + '/dist/worker.js'
}

exports.defaultOptions = defaultOptions;


exports.spawnWorker = function spawnWorker(instance, workerOptions){
    if(Blob && URL){
        var blob = new Blob(['importScripts("' + workerOptions.workerPath + '");'], {
            type: 'application/javascript'
        });
        var worker = new Worker(URL.createObjectURL(blob));
    }else{
        var worker = new Worker(workerOptions.workerPath)
    }

    worker.onmessage = function(e){
        var packet = e.data;
        instance._recv(packet)
    }
    return worker
}

exports.terminateWorker = function(instance){
    instance.worker.terminate()
}

exports.sendPacket = function sendPacket(instance, packet){
    loadImage(packet.payload.image, function(img){
        packet.payload.image = img
        instance.worker.postMessage(packet) 
    })
}


function loadImage(image, cb){
    if(typeof image === 'string'){
        if(/^\#/.test(image)){
            // element css selector
            return loadImage(document.querySelector(image), cb)
        }else if(/(blob|data)\:/.test(image)){
            // data url
            var im = new Image
            im.src = image;
            im.onload = e => loadImage(im, cb);
            im.onerror = e => { throw e; };
            return
        }else{
            var xhr = new XMLHttpRequest();
            xhr.open('GET', image, true)
            xhr.responseType = "blob";
            
            xhr.onload = e => {
                if (xhr.status >= 400){
                  throw new Error('Fail to get image as Blob');
                }else{
                    loadImage(xhr.response, cb);
                }
            };
            xhr.onerror = e => { throw e; }; 
            
            xhr.send(null)
            return
        }
    }else if(image instanceof File){
        // files
        var fr = new FileReader()
        fr.onload = e => loadImage(fr.result, cb);
        fr.onerror = e => { throw e; }; 
        fr.readAsDataURL(image)
        return
    }else if(image instanceof Blob){
        return loadImage(URL.createObjectURL(image), cb)
    }else if(image.getContext){
        // canvas element
        return loadImage(image.getContext('2d'), cb)
    }else if(image.tagName == "IMG" || image.tagName == "VIDEO"){
        // image element or video element
        var c = document.createElement('canvas');
        c.width  = image.naturalWidth  || image.videoWidth;
        c.height = image.naturalHeight || image.videoHeight;
        var ctx = c.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return loadImage(ctx, cb)
    }else if(image.getImageData){
        // canvas context
        var data = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
        return loadImage(data, cb)
    }else{
        return cb(image)
    }
    throw new Error('Missing return in loadImage cascade')

}


/***/ }),

/***/ "./node_modules/tesseract.js/src/common/circularize.js":
/*!*************************************************************!*\
  !*** ./node_modules/tesseract.js/src/common/circularize.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// The result of dump.js is a big JSON tree
// which can be easily serialized (for instance
// to be sent from a webworker to the main app
// or through Node's IPC), but we want
// a (circular) DOM-like interface for walking
// through the data. 

module.exports = function circularize(page){
    page.paragraphs = []
    page.lines = []
    page.words = []
    page.symbols = []

    page.blocks.forEach(function(block){
        block.page = page;

        block.lines = []
        block.words = []
        block.symbols = []

        block.paragraphs.forEach(function(para){
            para.block = block;
            para.page = page;

            para.words = []
            para.symbols = []
            
            para.lines.forEach(function(line){
                line.paragraph = para;
                line.block = block;
                line.page = page;

                line.symbols = []

                line.words.forEach(function(word){
                    word.line = line;
                    word.paragraph = para;
                    word.block = block;
                    word.page = page;
                    word.symbols.forEach(function(sym){
                        sym.word = word;
                        sym.line = line;
                        sym.paragraph = para;
                        sym.block = block;
                        sym.page = page;
                        
                        sym.line.symbols.push(sym)
                        sym.paragraph.symbols.push(sym)
                        sym.block.symbols.push(sym)
                        sym.page.symbols.push(sym)
                    })
                    word.paragraph.words.push(word)
                    word.block.words.push(word)
                    word.page.words.push(word)
                })
                line.block.lines.push(line)
                line.page.lines.push(line)
            })
            para.page.paragraphs.push(para)
        })
    })
    return page
}

/***/ }),

/***/ "./node_modules/tesseract.js/src/common/job.js":
/*!*****************************************************!*\
  !*** ./node_modules/tesseract.js/src/common/job.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const adapter = __webpack_require__(/*! ../node/index.js */ "./node_modules/tesseract.js/src/browser/index.js")

let jobCounter = 0;

module.exports = class TesseractJob {
    constructor(instance){
        this.id = 'Job-' + (++jobCounter) + '-' + Math.random().toString(16).slice(3, 8)

        this._instance = instance;
        this._resolve = []
        this._reject = []
        this._progress = []
        this._finally = []
    }

    then(resolve, reject){
        if(this._resolve.push){
            this._resolve.push(resolve) 
        }else{
            resolve(this._resolve)
        }

        if(reject) this.catch(reject);
        return this;
    }
    catch(reject){
        if(this._reject.push){
            this._reject.push(reject) 
        }else{
            reject(this._reject)
        }
        return this;
    }
    progress(fn){
        this._progress.push(fn)
        return this;
    }
    finally(fn) {
        this._finally.push(fn)
        return this;  
    }
    _send(action, payload){
        adapter.sendPacket(this._instance, {
            jobId: this.id,
            action: action,
            payload: payload
        })
    }

    _handle(packet){
        var data = packet.data;
        let runFinallyCbs = false;

        if(packet.status === 'resolve'){
            if(this._resolve.length === 0) console.log(data);
            this._resolve.forEach(fn => {
                var ret = fn(data);
                if(ret && typeof ret.then == 'function'){
                    console.warn('TesseractJob instances do not chain like ES6 Promises. To convert it into a real promise, use Promise.resolve.')
                }
            })
            this._resolve = data;
            this._instance._dequeue()
            runFinallyCbs = true;
        }else if(packet.status === 'reject'){
            if(this._reject.length === 0) console.error(data);
            this._reject.forEach(fn => fn(data))
            this._reject = data;
            this._instance._dequeue()
            runFinallyCbs = true;
        }else if(packet.status === 'progress'){
            this._progress.forEach(fn => fn(data))
        }else{
            console.warn('Message type unknown', packet.status)
        }

        if (runFinallyCbs) {
            this._finally.forEach(fn => fn(data));
        }
    }
}


/***/ }),

/***/ "./node_modules/tesseract.js/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/tesseract.js/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const adapter = __webpack_require__(/*! ./node/index.js */ "./node_modules/tesseract.js/src/browser/index.js")
const circularize = __webpack_require__(/*! ./common/circularize.js */ "./node_modules/tesseract.js/src/common/circularize.js")
const TesseractJob = __webpack_require__(/*! ./common/job */ "./node_modules/tesseract.js/src/common/job.js");
const version = __webpack_require__(/*! ../package.json */ "./node_modules/tesseract.js/package.json").version;

const create = function(workerOptions = {}){
	var worker = new TesseractWorker(Object.assign({}, adapter.defaultOptions, workerOptions));
	worker.create = create;
	worker.version = version;
	return worker;
}

class TesseractWorker {
	constructor(workerOptions){
		this.worker = null;
		this.workerOptions = workerOptions;
		this._currentJob = null;
		this._queue = [];
	}

	recognize(image, options = {}){
		return this._delay(job => {
			if (typeof options === 'string') options = {lang: options}
			options.lang = options.lang || 'eng';

			job._send('recognize', { image, options, workerOptions: this.workerOptions });
		})
	}
	detect(image, options = {}){
		return this._delay(job => {
			job._send('detect', { image, options, workerOptions: this.workerOptions });
		})
	}

	terminate(){
		if(this.worker) adapter.terminateWorker(this);
		this.worker = null;
		this._currentJob = null;
		this._queue = [];
	}

	_delay(fn){
		if(!this.worker) this.worker = adapter.spawnWorker(this, this.workerOptions);

		var job = new TesseractJob(this);
		this._queue.push(e => {
			this._queue.shift();
			this._currentJob = job;
			fn(job);
		});
		if(!this._currentJob) this._dequeue();
		return job;
	}

	_dequeue(){
		this._currentJob = null;
		if(this._queue.length){
			this._queue[0]();
		}
	}

	_recv(packet){
        if(packet.status === 'resolve' && packet.action === 'recognize'){
            packet.data = circularize(packet.data);
        }

		if(this._currentJob.id === packet.jobId){
			this._currentJob._handle(packet)
		} else {
			console.warn('Job ID ' + packet.jobId + ' not known.')
		}
	}
}

module.exports = create();


/***/ }),

/***/ "./src/app/users/image-picker/image-picker.component.html":
/*!****************************************************************!*\
  !*** ./src/app/users/image-picker/image-picker.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <ion-button color=\"secondary\" (click)=\"onPickImage()\" *ngIf=\"!selectedImage\" expand=\"block\">\n    <ion-icon name=\"camera\" slot=\"start\"></ion-icon>\n    <ion-label>Open Camera</ion-label>\n  </ion-button>\n</div>\n<input\n  type=\"file\"\n  *ngIf=\"usePicker\"\n  #filepicker\n  (change)=\"onFileChosen($event)\"\n/>\n<ion-button\n    (click)=\"recognizeImage()\"\n    expand=\"block\"\n    [disabled]=\"!selectedImage\"\n    color=\"tertiary\"\n    >Recognize Text</ion-button\n  >\n<ion-card *ngIf=\"imageText\">\n    <ion-card-header>Image Text</ion-card-header>\n    <ion-card-content>\n      ID: {{ this.id }}, Name: {{ this.name }}\n    </ion-card-content>\n  </ion-card>\n"

/***/ }),

/***/ "./src/app/users/image-picker/image-picker.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/users/image-picker/image-picker.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".picker {\n  width: 30rem;\n  max-width: 80%;\n  height: 20rem;\n  max-height: 30vh;\n  border: 1px solid var(--ion-color-primary);\n  margin: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.image {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover; }\n\ninput[type='file'] {\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Wb2x1bWVzL2hkZDIvVWRlbXkgSW9uaWNfQW5ndWxhci9pb25pYzRfY291cnNlL1JlbC1wLWF0aW9uLXQtc2hpcC9zcmMvYXBwL3VzZXJzL2ltYWdlLXBpY2tlci9pbWFnZS1waWNrZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsMENBQTBDO0VBQzFDLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osb0JBQWlCO0tBQWpCLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL2ltYWdlLXBpY2tlci9pbWFnZS1waWNrZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGlja2VyIHtcbiAgd2lkdGg6IDMwcmVtO1xuICBtYXgtd2lkdGg6IDgwJTtcbiAgaGVpZ2h0OiAyMHJlbTtcbiAgbWF4LWhlaWdodDogMzB2aDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBtYXJnaW46IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaW1hZ2Uge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuaW5wdXRbdHlwZT0nZmlsZSddIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/users/image-picker/image-picker.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/users/image-picker/image-picker.component.ts ***!
  \**************************************************************/
/*! exports provided: ImagePickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePickerComponent", function() { return ImagePickerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tesseract.js */ "./node_modules/tesseract.js/src/index.js");
/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tesseract_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../users.service */ "./src/app/users/users.service.ts");






var ImagePickerComponent = /** @class */ (function () {
    function ImagePickerComponent(platform, loadingCtrl, usersService) {
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.usersService = usersService;
        this.imagePick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.usePicker = false;
    }
    ImagePickerComponent.prototype.ngOnInit = function () {
        console.log('Mobile:', this.platform.is('mobile'));
        console.log('Hybrid:', this.platform.is('hybrid'));
        console.log('ios:', this.platform.is('ios'));
        console.log('Android:', this.platform.is('android'));
        console.log('Desktop:', this.platform.is('desktop'));
        if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
            this.platform.is('desktop')) {
            this.usePicker = true;
        }
    };
    ImagePickerComponent.prototype.onPickImage = function () {
        var _this = this;
        if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Capacitor"].isPluginAvailable('Camera') || this.usePicker) {
            this.filepickerRef.nativeElement.click();
            return;
        }
        console.log('get to step of getting an image');
        _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"].Camera.getPhoto({
            quality: 50,
            source: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Camera,
            correctOrientation: true,
            width: 200,
            resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraResultType"].Base64
        })
            .then(function (image) {
            _this.selectedImage = image.base64String;
            _this.imagePick.emit(image.base64String);
            console.log('success here');
        })
            .catch(function (error) {
            console.log('this is error');
            return false;
        });
    };
    ImagePickerComponent.prototype.onFileChosen = function (event) {
        var _this = this;
        var pickedFile = event.target.files[0];
        if (!pickedFile) {
            return;
        }
        var fr = new FileReader();
        fr.onload = function () {
            var dataUrl = fr.result.toString();
            _this.selectedImage = dataUrl;
            _this.imagePick.emit(pickedFile);
        };
        fr.readAsDataURL(pickedFile);
    };
    ImagePickerComponent.prototype.recognizeImage = function () {
        var _this = this;
        this.loadingCtrl
            .create({
            keyboardClose: true,
            message: 'Analysing Sticker...'
        })
            .then(function (loadingEl) {
            loadingEl.present();
            tesseract_js__WEBPACK_IMPORTED_MODULE_4__["recognize"](_this.selectedImage)
                .progress(function (message) {
                console.log(message);
            })
                .catch(function (error) {
                console.error(error);
                loadingEl.dismiss();
            })
                .then(function (result) {
                _this.imageText = result.text;
                console.log(_this.imageText);
            })
                .finally(function (resultOrError) {
                var splitString = _this.imageText.split(/\n/ig);
                console.log(splitString);
                _this.id = splitString[1];
                _this.name = splitString[0];
                _this.usersService.formIdFromOCR = splitString[1];
                _this.usersService.formNameFromOCR = splitString[0];
                loadingEl.dismiss();
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('filepicker'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ImagePickerComponent.prototype, "filepickerRef", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ImagePickerComponent.prototype, "imagePick", void 0);
    ImagePickerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-image-picker',
            template: __webpack_require__(/*! ./image-picker.component.html */ "./src/app/users/image-picker/image-picker.component.html"),
            styles: [__webpack_require__(/*! ./image-picker.component.scss */ "./src/app/users/image-picker/image-picker.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"]])
    ], ImagePickerComponent);
    return ImagePickerComponent;
}());



/***/ }),

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
/* harmony import */ var _image_picker_image_picker_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./image-picker/image-picker.component */ "./src/app/users/image-picker/image-picker.component.ts");








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
            declarations: [_users_page__WEBPACK_IMPORTED_MODULE_6__["UsersPage"], _image_picker_image_picker_component__WEBPACK_IMPORTED_MODULE_7__["ImagePickerComponent"]],
            exports: [_image_picker_image_picker_component__WEBPACK_IMPORTED_MODULE_7__["ImagePickerComponent"]],
            entryComponents: [_image_picker_image_picker_component__WEBPACK_IMPORTED_MODULE_7__["ImagePickerComponent"]]
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

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button menu=\"m1\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Add a New User</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-list>\n            <ion-item>\n              <ion-label position=\"floating\">ID (without opening 0)</ion-label>\n              <ion-input\n                type=\"string\"\n                ngModel\n                name=\"uid\"\n                required\n                #uidCtrl=\"ngModel\"\n                [value]=\"this.usersService.formIdFromOCR\"\n              ></ion-input>\n            </ion-item>\n            <ion-item *ngIf=\"!uidCtrl.valid && uidCtrl.touched\" lines=\"none\">\n              <ion-label>\n                Should be at least 8 characters long.\n              </ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"floating\">Name</ion-label>\n              <ion-input\n                type=\"text\"\n                ngModel\n                name=\"name\"\n                required\n                minlength=\"2\"\n                #nameCtrl=\"ngModel\"\n                [value]=\"this.usersService.formNameFromOCR\"\n              ></ion-input>\n            </ion-item>\n            <ion-item *ngIf=\"!nameCtrl.valid && nameCtrl.touched\" lines=\"none\">\n              <ion-label>\n                Should be at least 2 characters long.\n              </ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"floating\">Type</ion-label>\n              <ion-select\n                placeholder=\"Select Type\"\n                interface=\"popover\"\n                ngModel\n                name=\"type\"\n                required\n                #typeCtrl=\"ngModel\"\n              >\n                <ion-select-option value=\"p\">Patient</ion-select-option>\n                <ion-select-option value=\"n\">Nurse</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item *ngIf=\"!typeCtrl.valid && typeCtrl.touched\" lines=\"none\">\n              <ion-label>\n                You must choose a user type.\n              </ion-label>\n            </ion-item>\n            <ion-item *ngIf=\"typeCtrl.value == 'p'\">\n              <ion-label position=\"floating\">Room Number</ion-label>\n              <ion-select\n                placeholder=\"Select Room Number\"\n                interface=\"popover\"\n                ngModel\n                name=\"room\"\n                required\n                #roomCtrl=\"ngModel\"\n              >\n                <ion-select-option\n                  *ngFor=\"let room of roomsList\"\n                  value=\"{{ room.roomNum }}\"\n                  >{{ room.roomNum }}\n                </ion-select-option>\n              </ion-select>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <div text-center>\n            <ion-button\n              type=\"submit\"\n              color=\"primary\"\n              expand=\"block\"\n              [disabled]=\"!f.valid\"\n            >\n              Create\n            </ion-button>\n            <p text-center>OR</p>\n            <ion-button (click)=\"changeOcrFlag()\" color=\"primary\" expand=\"block\">\n              <ion-icon name=\"camera\"></ion-icon>\n              Take a Picture of the Patient Sticker\n            </ion-button>\n          </div>\n        </ion-col>\n        <ion-col size-sm=\"3\" offset-sm=\"3\">\n          <app-image-picker\n            (imagePick)=\"onImagePicked($event)\" *ngIf=\"this.useOcrFlag\"\n          ></app-image-picker>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n"

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
        this.useOcrFlag = false;
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
    UsersPage.prototype.onImagePicked = function (imageData) {
    };
    UsersPage.prototype.changeOcrFlag = function () {
        this.useOcrFlag = !this.useOcrFlag;
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