"use strict";
(self["webpackChunkqdisp"] = self["webpackChunkqdisp"] || []).push([["main"],{

/***/ 8789:
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APIService: () => (/* binding */ APIService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/properties */ 8101);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../env.properties */ 2430);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);







class APIService {
  getUserID() {
    return _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.iUserID;
  }
  getUserType() {
    return _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.sUserType;
  }
  constructor(http) {
    this.http = http;
  }
  mergeJSON(target, add) {
    if (add === null || add === undefined) return target;
    function isObject(obj) {
      if (typeof obj == "object") {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            return true; // search for first object prop
          }
        }
      }

      return false;
    }
    for (var key in add) {
      if (add.hasOwnProperty(key)) {
        if (target[key] && isObject(target[key]) && isObject(add[key])) {
          this.mergeJSON(target[key], add[key]);
        } else {
          target[key] = add[key];
        }
      }
    }
    return target;
  }
  // mergeJSON(target: any, add: any) {
  //   function isObject(obj) {
  //     if (typeof obj == "object") {
  //       for (var key in obj) {
  //         if (obj.hasOwnProperty(key)) {
  //           return true; // search for first object prop
  //         }
  //       }
  //     }
  //     return false;
  //   }
  //   for (var key in add) {
  //     if (add.hasOwnProperty(key)) {
  //       if (target[key] && isObject(target[key]) && isObject(add[key])) {
  //         this.mergeJSON(target[key], add[key]);
  //       } else {
  //         target[key] = add[key];
  //       }
  //     }
  //   }
  //   return target;
  // }
  performLogin(data) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    //    console.log(sEndPoint)
    return this.http.post(_env_properties__WEBPACK_IMPORTED_MODULE_1__.sEndPoint + 'qauth', data).toPromise();
    //      .map(res => res.json()).toPromise();
  }

  getHeaders() {
    // var oHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // if (Global_Variables.token !== undefined) {
    //   console.log(Global_Variables.token.access_token);
    //   oHeaders.set('ks-x-authorization', 'Bearer: ' + Global_Variables.token.access_token);
    // }
    var oHeaders;
    if (_app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.token) {
      console.log(_app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.token['access_token']);
      oHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.token['access_token']
      });
    } else oHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(oHeaders);
    return {
      headers: oHeaders
    };
  }
  // async showNetworkError() {
  //   this.alertCtrl.create({
  //     message: 'No Network',
  //     subHeader: 'Pls check internet connection',
  //     buttons: ['Dismiss']
  //   }).then(alert => alert.present() );
  // }
  send2Server(sURL, bPost = false, oItem = null) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    if (bPost) {
      return this.http.post(sURL, oItem, this.getHeaders()).toPromise();
      //   .map(res => res.json()).toPromise();
      // return this.http.post(sURL, oItem, this.getHeaders())
      //   .map(res => res.json()).toPromise();
    }

    return this.http.get(sURL, this.getHeaders()).toPromise();
    // return this.http.get(sURL, this.getHeaders())
    //   .map(res => res.json()).toPromise();
  }

  getURL() {
    return _app_properties__WEBPACK_IMPORTED_MODULE_0__.sURL + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.iUserID + "/";
  }
  send2ServerC(sPartialURL, bPost = false, oItem = null) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    if (bPost) {
      return this.http.post(_app_properties__WEBPACK_IMPORTED_MODULE_0__.sURL + sPartialURL, oItem, this.getHeaders()).toPromise();
      // return this.http.post(sURL + sPartialURL, oItem, this.getHeaders())
      //   .map(res => res.json()).toPromise();
    }

    return this.http.get(_app_properties__WEBPACK_IMPORTED_MODULE_0__.sURL + sPartialURL, this.getHeaders()).toPromise();
    // return this.http.get(sURL + sPartialURL, this.getHeaders())
    //   .map(res => res.json()).toPromise();
  }

  send2ServerP(sPartialURL, bPost = false, oItem = null) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders()).toPromise();
      // return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders())
      //   .map(res => res.json()).toPromise();
    }

    return this.http.get(this.getURL() + sPartialURL, this.getHeaders()).toPromise();
    // return this.http.get(this.getURL() + sPartialURL, this.getHeaders())
    //   .map(res => res.json()).toPromise();
  }

  send2ServerPlainText(sPartialURL, bPost = false, oItem = null) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders()).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL, this.getHeaders()).toPromise();
  }
  fileUpload(sUrl, formData) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(formData);
    //    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      // for(var i = 0; i < files.length; i++) {
      //     formData.append("uploads[]", files[i], files[i].name);
      // }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            //            console.log(xhr.response);
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      //path = 'upload/' ;
      xhr.open("POST", sUrl, true);
      xhr.send(formData);
    });
  }
  buildImageURL(oItem, i = -1) {
    let img = oItem.IMAGE_URL;
    if (img === undefined || img === null) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (i != -1) return _app_properties__WEBPACK_IMPORTED_MODULE_0__.sIMAGE_URL + i + "/" + img;
    return _app_properties__WEBPACK_IMPORTED_MODULE_0__.sIMAGE_URL + oItem.ID + "/" + img;
  }
  sort(oData, oFields) {
    // this.oAPIService.sort ( this.oItems, [{field: 'PICKUPON', direction: 'desc' }, {field: 'PICKUPSTART', direction: 'desc' }, {field: 'BOOKINGREF', direction: 'desc'}]) ;
    oData.sort(function (a, b) {
      for (var i = 0; i < oFields.length; i++) {
        var retval = a[oFields[i].field] < b[oFields[i].field] ? -1 : a[oFields[i].field] > b[oFields[i].field] ? 1 : 0;
        if (oFields[i].direction == "desc") {
          retval = retval * -1;
        }
        if (retval !== 0) {
          return retval;
        }
      }
      return 0;
    });
  }
  stringToDate(_date, _format, _delimiter) {
    // stringToDate("17/9/2014","dd/MM/yyyy","/");
    // stringToDate("9/17/2014","mm/dd/yyyy","/")
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
    return formatedDate;
  }
  setTime(oDate, sTime) {
    //       tests = ['01.25 PM', '01:25pm', '1:25 PM', '11.35 PM', '12.45 PM', '01.25 AM', '11.35 AM', '12.45 AM'],
    var timeReg = /(\d+)[\.|:](\d+)\s?(\w+)/;
    var parts = sTime.match(timeReg);
    var hours = /am/i.test(parts[3]) ? function (am) {
      return am < 12 ? am : 0;
    }(parseInt(parts[1], 10)) : function (pm) {
      return pm < 12 ? pm + 12 : 12;
    }(parseInt(parts[1], 10));
    var minutes = parseInt(parts[2], 10);
    var minutes = parseInt(parts[2], 10);
    oDate.setHours(hours);
    oDate.setMinutes(minutes);
    oDate.setSeconds(0);
    return oDate;
  }
  setTime24Hrs(oDate, sTime) {
    var s = sTime.split(':');
    var hours = parseInt(s[0]);
    var minutes = parseInt(s[1]);
    oDate.setHours(hours);
    oDate.setMinutes(minutes);
    return oDate;
  }
  static #_ = this.ɵfac = function APIService_Factory(t) {
    return new (t || APIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: APIService,
    factory: APIService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var _qdisplay_qdisplay_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qdisplay/qdisplay.component */ 1617);
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-guard.service */ 7937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);






const routes = [{
  path: '',
  component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}, {
  path: 'login',
  component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}, {
  path: 'qdisplay',
  component: _qdisplay_qdisplay_component__WEBPACK_IMPORTED_MODULE_1__.QdisplayComponent,
  canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__.AuthGuardService]
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _title_bar_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title-bar.service */ 9018);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/service-worker */ 1509);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/toolbar */ 9177);






class AppComponent {
  constructor(oTBS, primengConfig, router, swUpdate) {
    this.oTBS = oTBS;
    this.primengConfig = primengConfig;
    this.router = router;
    this.swUpdate = swUpdate;
    this.sTitle = 'Q# Display';
    this.sMqttStatus = '';
    this.router.navigate(['login']);
  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        console.log("New Version Available.");
        if (confirm("New version available. Load it ?")) {
          window.location.reload();
        }
      });
    }
    // this.oTBS.oCurrentTitle.subscribe(obj => {
    //   setTimeout(() => {
    //     this.sTitle = obj.title;
    //     this.sMqttStatus = obj.status;
    //     console.log(this.sMqttStatus)
    //   }, 1);
    // });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_0__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_2__.PrimeNGConfig), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_4__.SwUpdate));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 8,
    vars: 2,
    consts: [[1, "p-toolbar-accent"], [1, "p-toolbar-group-left"], [1, "p-toolbar-group-right"], [1, "connection-status"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p-toolbar", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "router-outlet");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.sTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.sMqttStatus);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, primeng_toolbar__WEBPACK_IMPORTED_MODULE_5__.Toolbar],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-pipes */ 4901);
/* harmony import */ var _qdisplay_qdisplay_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./qdisplay/qdisplay.component */ 1617);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/service-worker */ 1509);
/* harmony import */ var _environments_environment_localk8__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment.localk8 */ 3422);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/panel */ 6110);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toolbar */ 9177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';











 // Import other PrimeNG modules as needed







// import { TwilioService } from './twilio.service';
// import { VideoComponent } from './video/video.component';
class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [primeng_panel__WEBPACK_IMPORTED_MODULE_6__.PanelModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.NoopAnimationsModule, ngx_pipes__WEBPACK_IMPORTED_MODULE_12__.NgPipesModule, primeng_api__WEBPACK_IMPORTED_MODULE_13__.SharedModule, primeng_card__WEBPACK_IMPORTED_MODULE_14__.CardModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.ToolbarModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_18__.ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: _environments_environment_localk8__WEBPACK_IMPORTED_MODULE_4__.environment.production
    })]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent, _qdisplay_qdisplay_component__WEBPACK_IMPORTED_MODULE_3__.QdisplayComponent],
    imports: [primeng_panel__WEBPACK_IMPORTED_MODULE_6__.PanelModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.NoopAnimationsModule, ngx_pipes__WEBPACK_IMPORTED_MODULE_12__.NgPipesModule, primeng_api__WEBPACK_IMPORTED_MODULE_13__.SharedModule, primeng_card__WEBPACK_IMPORTED_MODULE_14__.CardModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.ToolbarModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_18__.ServiceWorkerModule]
  });
})();

/***/ }),

/***/ 7937:
/*!***************************************!*\
  !*** ./src/app/auth-guard.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuardService: () => (/* binding */ AuthGuardService)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 6466);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);




class AuthGuardService {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!(yield _this.authService.checkAuthenticated())) {
        yield _this.router.navigate(['login']);
        return false;
      }
      return true;
    })();
  }
  static #_ = this.ɵfac = function AuthGuardService_Factory(t) {
    return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AuthGuardService,
    factory: AuthGuardService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6466:
/*!*********************************!*\
  !*** ./src/app/auth.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ 8789);
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-webstorage-service */ 4878);
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/properties */ 8101);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ 951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);








const STORAGE_KEY = 'token';
const bDebug = true;
class AuthService {
  constructor(oAPI, oStorage, router) {
    this.oAPI = oAPI;
    this.oStorage = oStorage;
    this.router = router;
    this.oAPIService = null;
    this.isAuthenticated = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(false);
    this.oAPIService = oAPI;
  }
  checkAuthenticated() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (bDebug) console.info("checkAuthenticated");
      const authenticated = yield _this.exists();
      _this.isAuthenticated.next(authenticated);
      console.info(authenticated);
      return authenticated;
    })();
  }
  login(data) {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log(data);
        const id = yield _this2.oAPIService?.performLogin(data);
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.token = id;
        if (id) {
          let o = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_3__.jwtDecode)(id.access_token);
          console.log(o);
          let jwt_user_fields = JSON.parse(o['user_fields']);
          console.log(jwt_user_fields);
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sEntityID = jwt_user_fields["ENTITYID"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.iUserID = jwt_user_fields["UID"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sUserType = jwt_user_fields["TYPE"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.token = id;
          _this2.oStorage.set(STORAGE_KEY, id);
          _this2.isAuthenticated.next(true);
          yield _this2.router.navigate(['qdisplay']);
          return;
        }
      } catch (err) {
        console.log(err);
        // Global_Variables.token = "SkipValidation"
        // this.isAuthenticated.next(true);
        // await this.router.navigate(['qdisplay']);
        // return ;
        throw Error(JSON.stringify(err.error));
      }
      // console.log("Not Authenticated") ;
      // throw Error('Not Authenticated ');
    })();
  }

  logout(redirect) {
    var _this3 = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this3.oStorage.remove(STORAGE_KEY);
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.token = undefined;
        _this3.isAuthenticated.next(false);
        _this3.router.navigate([redirect]);
      } catch (err) {
        console.error(err);
      }
    })();
  }
  exists() {
    var id = this.oStorage.get(STORAGE_KEY);
    if (id) {
      try {
        // let o = this.jwtHelper.decodeToken(id.id_token);
        // if (bDebug)
        //   console.info(o);
        let o = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_3__.jwtDecode)(id.access_token);
        let jwt_user_fields = JSON.parse(o['user_fields']);
        console.log(jwt_user_fields);
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sEntityID = jwt_user_fields["ENTITYID"];
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.iUserID = jwt_user_fields["UID"];
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sUserType = jwt_user_fields["TYPE"];
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  }
  static #_ = this.ɵfac = function AuthService_Factory(t) {
    return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_1__.APIService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_6__.LOCAL_STORAGE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: AuthService,
    factory: AuthService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3422:
/*!*****************************************************!*\
  !*** ./src/app/environments/environment.localk8.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 2014:
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ 6466);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ 8789);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/panel */ 6110);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 2947);










class LoginComponent {
  ngOnInit() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this.oAuthService.checkAuthenticated()) {
        yield _this.oRouter.navigate([_this.returnUrl]);
      }
    })();
  }
  onSubmit() {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qdisp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.submitted = true;
      // alert(JSON.stringify(this.loginForm.value));
      try {
        yield _this2.oAuthService.login(_this2.loginForm?.value);
      } catch (err) {
        _this2.oErrorMessage = err;
      }
    })();
  }
  // private _jsonURL = 'assets/Login.json';
  constructor(oRouter, oAuthService, oAPI) {
    this.oRouter = oRouter;
    this.oAuthService = oAuthService;
    this.oAPI = oAPI;
    this.returnUrl = '';
    this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
      'email': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      'ACCESS': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('d', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required)
    });
    this.submitted = false;
    this.oErrorMessage = "";
  }
  // oMasterFormData: any;
  // async ngOnInit() {
  //   this.oAuthService.logout('');
  //   this.oAPI.send2Server(this._jsonURL).then((content: string) => {
  //     var formObject:any = content; //JSON.parse(content) ;
  //     console.log(content)
  //     this.oFormSchema = formObject['schema'];
  //     this.oFormLayout = formObject['layout'];
  //     this.oFormData = formObject['data'];
  //     this.oMasterFormData = JSON.parse(JSON.stringify(this.oFormData));
  //   }).catch((error: any) => console.log(error));
  //   //    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'qdisplay';
  //   this.returnUrl = 'qdisplay';
  //   if (await this.oAuthService.checkAuthenticated()) {
  //     await this.oRouter.navigate([this.returnUrl]);
  //   }
  // }
  // // oErrorMessage = "";
  // // oFormSchema = {};
  // // oFormLayout:any[] = [];
  // // oFormData = {};
  // async onFormSubmit(formData: any) {
  //   this.oErrorMessage = "";
  //   try {
  //     await this.oAuthService.login(this.oAPI.mergeJSON(this.oMasterFormData, formData));
  //   }
  //   catch (err:any) {
  //     this.oErrorMessage = err;
  //   }
  // }
  isFormValid(form) {
    // console.log(form) ;
    // let st = form['auto:start'] ;
    // console.log(st) ;
    // if (st !== undefined && !cron.isValidCron(st)) {
    //   return false ;
    // }
    return true;
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_2__.APIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 20,
    vars: 1,
    consts: [[3, "formGroup", "ngSubmit"], [1, "ui-grid", "ui-grid-responsive", "ui-grid-pad", "ui-fluid", 2, "margin", "10px 0px"], [1, "ui-grid-row"], [1, "ui-grid-col-2"], [1, "ui-grid-col-6"], ["pInputText", "", "type", "text", "formControlName", "email", "name", "email", 1, "form-control"], ["pInputText", "", "type", "password", "formControlName", "password", "name", "password", 1, "form-control"], ["pButton", "", "type", "submit", "label", "Submit"], [1, "ui-grid-col-4"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_0_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p-panel")(2, "div", 1)(3, "div", 2)(4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 2)(9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Password: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.loginForm);
      }
    },
    dependencies: [primeng_panel__WEBPACK_IMPORTED_MODULE_6__.Panel, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputText, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective],
    styles: [".card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\n.card-item[_ngcontent-%COMP%] {\n  flex: 1 1 300px; \n\n  margin: 10px;\n  box-sizing: border-box; \n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0FBUEo7O0FBVUU7RUFDRSxlQUFBLEVBQUEsZ0NBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUEsRUFBQSwwRUFBQTtBQVBKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcCB7XG4vLyAgICAgbWFyZ2luLWxlZnQ6IDEwcHggO1xuLy8gfVxuLy8gLmZvcm0tY29udGFpbmVyIHtcbi8vICAgICBtYXJnaW4tbGVmdDogMTAlO1xuLy8gICAgIG1hcmdpbi1yaWdodDogMTAlIDtcbi8vIH1cblxuLmNhcmQtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgfVxuICBcbiAgLmNhcmQtaXRlbSB7XG4gICAgZmxleDogMSAxIDMwMHB4OyAvKiBBZGp1c3QgdGhlIHZhbHVlcyBhcyBuZWVkZWQgKi9cbiAgICBtYXJnaW46IDEwcHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogRW5zdXJlcyBwYWRkaW5nIGFuZCBib3JkZXIgYXJlIGluY2x1ZGVkIGluIHRoZSB0b3RhbCB3aWR0aCBhbmQgaGVpZ2h0ICovXG4gIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8101:
/*!*******************************!*\
  !*** ./src/app/properties.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Global_Variables: () => (/* binding */ Global_Variables),
/* harmony export */   sIMAGE_URL: () => (/* binding */ sIMAGE_URL),
/* harmony export */   sURL: () => (/* binding */ sURL)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ 4289);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env.properties */ 2430);


const sURL = _env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + "api/";
const sIMAGE_URL = _env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + "image/";
var Global_Variables = {
  iUserID: 0,
  sUserType: 'N',
  isConnected: true,
  token: undefined,
  DeviceID: "None",
  oEID: -1,
  sEntityID: 0,
  //  oRItem: null,
  //  oMenuItems: [],
  sCurrentPage: 'Entities',
  UUID: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])()
};

/***/ }),

/***/ 1617:
/*!************************************************!*\
  !*** ./src/app/qdisplay/qdisplay.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QdisplayComponent: () => (/* binding */ QdisplayComponent)
/* harmony export */ });
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/properties */ 8101);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../env.properties */ 2430);
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abstract-mqtt */ 1820);
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(abstract_mqtt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ 4289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _title_bar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../title-bar.service */ 9018);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ 8789);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-pipes */ 4901);












const _c0 = function (a0) {
  return {
    "blinking": a0
  };
};
function QdisplayComponent_p_card_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p-card", 4)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 5)(4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "lpad");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](o_r1.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](9, _c0, o_r1.bBlink));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](6, 5, o_r1.QINFO == null ? null : o_r1.QINFO.PREFIX, 2, " "), "", o_r1.QINFO == null ? null : o_r1.QINFO.CURRENTQN_T, " => ", o_r1.QINFO == null ? null : o_r1.QINFO.COUNTERN, "");
  }
}
//local MqttService  = asdf ;
class QdisplayComponent extends abstract_mqtt__WEBPACK_IMPORTED_MODULE_2__.MqttService {
  constructor(oTBS, oAPIService) {
    super(_env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_HOST, _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_PORT, _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables, false);
    this.oTBS = oTBS;
    this.oAPIService = oAPIService;
    this.oItems = [];
    this.oServices = [];
    this.oEntity = {};
    this.oOptions = {
      useSSL: _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_USESSL,
      userName: "test",
      password: "test12"
    };
    this.sMqttHost = _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_HOST;
    //    console.log(MQTT_HOST, MQTT_PORT, Global_Variables.token.access_token);
    //    this.sMqttHost = 'm-ezq.ignorelist.com';
    super.setMqttOptions(this.oOptions);
    super.setConnect(true);
    this.oAPIService.send2ServerP("entities/" + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.sEntityID, true).then(data => {
      this.oEntity = data.result[0];
    });
  }
  getMqttHost() {
    return this.sMqttHost;
  }
  getClientID() {
    //  super.sClientID = "qs-" + this.Global_Variables.UUID;
    return (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])();
  }
  onConnectionStatusChange(sMqttStatus) {
    this.oTBS.titleChange({
      title: "CallQueue #",
      status: sMqttStatus
    });
  }
  ngOnInit() {
    this.oAPIService.send2ServerP("services/" + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.sEntityID + "/prefix", true).then(data => {
      this.oServices = data.result;
      super.subscribe("CQ/" + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.sEntityID + "/#");
    });
    this.oTBS.oCurrentTitle.subscribe(obj => {
      console.log("Update title", obj);
      setTimeout(() => {
        // this.sTitle = obj.title;
        // this.sMqttStatus = obj.status;
        // console.log(this.sMqttStatus)
        console.log("Update title");
      }, 1);
    });
    // }
    // ionViewDidEnter() {
    //    this.subscribe("niq/" + this.sEntityID  + "/#");
    // this.oAPIService.send2ServerP("mq", true).then((data: any) => {
    //   this.oItems = data.result;
    //   console.log("************ ", JSON.stringify(this.oItems));
    //   //      this.bLoaded = true;
    //   if (this.oItems.length > 0) {
    //     /*
    //       Topics:
    //         Current Queue ( for all services )
    //           CQ/<EntityID>/#
    //     */
    //     //      this.subscribe("CQ/" + this.oItems[0].ENTITYID + "/#");
    //   }
    // });
  }

  ngOnDestroy() {
    //  ionViewWillUnload() {
    //  ionViewDidLeave() {
    //this.disconnectMQTT();
    //Update the servicetime
    //    this.oAPIService.send2ServerP("sqnlogout/" + this.oEntity.ID + "/" + this.oService.ID + "/" + this.oItem.CURRENTQN, true).then((data: any) => {
    //    });
    try {
      super.setConnect(false);
    } catch (err) {}
  }
  getUserName() {
    //TODO get a new JWT token that expires in few minutes.
    return _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.token?.['access_token'] || '';
  }
  padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }
  // getFontSize() {
  //   return this.oItem.FontSize + "px";
  //   //    return "font-size: " + this.oItem.FontSize + "px" ;
  // }
  processMessage(message) {
    var t = super.getTopicPathInArray(message);
    if (t[0] == 'ServerUp' || t[0] == 'IP') return;
    var m = super.getMessageInArray(message);
    console.log(message.destinationName + " " + message.payloadString);
    var o = {
      SID: t[2],
      CURRENTQN: m[0],
      COUNTERN: m[2],
      PREFIX: '',
      bBlink: true,
      CURRENTQN_T: ''
    };
    this.oServices.forEach(oItem => {
      if (o.SID == oItem.ID) {
        o.PREFIX = oItem.PREFIX;
        o.CURRENTQN_T = this.padLeft(o.CURRENTQN, 'O', 3).replace(/0/g, 'O');
        oItem.QINFO = o;
        //        console.log(JSON.stringify("QINFO=>", oItem));
      }
    });
    // var oItem2Remove = null;
    // this.oServices.forEach((oItem) => {
    //   if (oItem2Remove == null && oItem.SID == t[2]) {
    //     oItem2Remove = oItem;
    //   }
    // });
    // var i = 0;
    // for (i = 0; i < this.oServices.length; i++) {
    //   if (this.oServices[i].SID == t[2] && (this.oServices[i].COUNTERN == m[2] || Number(this.oItems[i].COUNTERN) < 0)) {
    //     this.oServices.splice(i, 1);
    //     console.log(JSON.stringify(this.oServices));
    //     break;
    //   }
    // }
    // this.oItems.splice(0, 0, o);
  }
  static #_ = this.ɵfac = function QdisplayComponent_Factory(t) {
    return new (t || QdisplayComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_3__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_4__.APIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: QdisplayComponent,
    selectors: [["app-qdisplay"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
    decls: 8,
    vars: 3,
    consts: [[1, "entity-title"], [1, "card-container"], ["class", "card-item", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", "label", "Logout", "routerLink", "/login", 1, "p-button-accent"], [1, "card-item"], [3, "ngClass"]],
    template: function QdisplayComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, QdisplayComponent_p_card_5_Template, 7, 11, "p-card", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.oEntity == null ? null : ctx.oEntity.ENAME, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.oEntity == null ? null : ctx.oEntity.ADDRESS, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.oServices);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, primeng_card__WEBPACK_IMPORTED_MODULE_9__.Card, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonDirective, ngx_pipes__WEBPACK_IMPORTED_MODULE_11__.LeftPadPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9018:
/*!**************************************!*\
  !*** ./src/app/title-bar.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleBarService: () => (/* binding */ TitleBarService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);


class TitleBarService {
  constructor() {
    this.oTitleObject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject({
      title: 'Q# Display',
      status: ''
    });
    this.oCurrentTitle = this.oTitleObject.asObservable();
  }
  titleChange(obj) {
    this.oTitleObject.next(obj);
  }
  static #_ = this.ɵfac = function TitleBarService_Factory(t) {
    return new (t || TitleBarService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TitleBarService,
    factory: TitleBarService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 2430:
/*!*******************************!*\
  !*** ./src/env.properties.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MQTT_HOST: () => (/* binding */ MQTT_HOST),
/* harmony export */   MQTT_PORT: () => (/* binding */ MQTT_PORT),
/* harmony export */   MQTT_USESSL: () => (/* binding */ MQTT_USESSL),
/* harmony export */   sEndPoint: () => (/* binding */ sEndPoint)
/* harmony export */ });
const sEndPoint = "https://api.bullish.sg/";
const MQTT_HOST = 'msg.bullish.sg';
const MQTT_PORT = 443;
const MQTT_USESSL = true;

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map