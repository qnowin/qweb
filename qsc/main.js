"use strict";
(self["webpackChunkqsc"] = self["webpackChunkqsc"] || []).push([["main"],{

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
  performLogin(sService, data) {
    // if (Global_Variables.isConnected == false) {
    //   this.showNetworkError();
    //   return Promise.reject("No Network");
    // }
    //    console.log(sEndPoint)
    return this.http.post(_env_properties__WEBPACK_IMPORTED_MODULE_1__.sEndPoint + sService, data).toPromise();
    //      .map(res => res.json()).toPromise();
  }

  getHeaders() {
    // var oHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // if (Global_Variables.token !== undefined) {
    //   console.log(Global_Variables.token.id_token);
    //   oHeaders.set('ks-x-authorization', 'Bearer: ' + Global_Variables.token.id_token);
    // }
    var oHeaders;
    if (_app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables.token !== undefined) {
      console.log(_app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables?.token?.["access_token"]);
      oHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        'Content-Type': 'application/json',
        // 'ks-x-authorization': 'Bearer: ' + Global_Variables?.token?.["id_token"]
        'authorization': 'Bearer ' + _app_properties__WEBPACK_IMPORTED_MODULE_0__.Global_Variables?.token?.["access_token"]
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var _next_in_q_next_in_q_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./next-in-q/next-in-q.component */ 4989);
/* harmony import */ var _available_service_available_service_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./available-service/available-service.component */ 8578);
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-guard.service */ 7937);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);







const routes = [{
  path: '',
  component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}, {
  path: 'login',
  component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}, {
  path: 'nextinq',
  component: _next_in_q_next_in_q_component__WEBPACK_IMPORTED_MODULE_1__.NextInQComponent,
  canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__.AuthGuardService]
}, {
  path: 'availableservice',
  component: _available_service_available_service_component__WEBPACK_IMPORTED_MODULE_2__.AvailableServiceComponent,
  canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__.AuthGuardService]
}, {
  path: '**',
  redirectTo: '/login'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/service-worker */ 1509);




class AppComponent {
  constructor(oTBS, router, swUpdate) {
    this.oTBS = oTBS;
    this.router = router;
    this.swUpdate = swUpdate;
    this.sTitle = 'Service Counter';
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
    this.oTBS.oCurrentTitle.subscribe(obj => {
      setTimeout(() => {
        this.sTitle = obj.title;
        this.sMqttStatus = obj.status;
      }, 1);
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_0__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_3__.SwUpdate));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
    styles: [".menu-spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.nav-caption[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding-left: 5px;\n}\n\n.connection-status[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtBQUNGOztBQWNBO0VBQ0UsZUFBQTtBQVhGIiwic291cmNlc0NvbnRlbnQiOlsiLm1lbnUtc3BhY2VyIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5uYXYtY2FwdGlvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XG59XG5cbi8vIC5ncmVlbiB7XG4vLyAgIGNvbG9yOiBsaWdodGdyZWVuO1xuLy8gfVxuXG4vLyAuYW1iZXIge1xuLy8gICBjb2xvcjogb3JhbmdlO1xuLy8gfVxuXG4vLyAucmVkIHtcbi8vICAgY29sb3I6IHJlZDtcbi8vIH1cblxuLmNvbm5lY3Rpb24tc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-webstorage-service */ 4878);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var _next_in_q_next_in_q_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./next-in-q/next-in-q.component */ 4989);
/* harmony import */ var _available_service_available_service_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./available-service/available-service.component */ 8578);
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-pipes */ 4901);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/service-worker */ 1509);
/* harmony import */ var _app_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app/environments/environment */ 1594);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/api */ 8026);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/panel */ 6110);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/toolbar */ 9177);
/* harmony import */ var primeng_password__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/password */ 3219);






//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material.module';


// import { Bootstrap4FrameworkModule } from '@ajsf/bootstrap4';
// import { MaterialDesignFrameworkModule } from '@ajsf/material';
// import { MaterialDesignFrameworkModule, Bootstrap4FrameworkModule } from 'ajs';






// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatCardModule } from '@angular/material/card';
// import { TwilioService } from './twilio.service';
// import { VideoComponent } from './video/video.component';

 // Import other PrimeNG modules as needed



// import { CommonModule } from '@angular/common';




class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
    // MaterialModule,
    _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_10__.StorageServiceModule,
    // MaterialDesignFrameworkModule,
    // Bootstrap4FrameworkModule,
    ngx_pipes__WEBPACK_IMPORTED_MODULE_11__.NgPipesModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.NoopAnimationsModule,
    // MatGridListModule,
    // MatCardModule,
    primeng_api__WEBPACK_IMPORTED_MODULE_13__.SharedModule, primeng_card__WEBPACK_IMPORTED_MODULE_14__.CardModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.ToolbarModule, primeng_password__WEBPACK_IMPORTED_MODULE_18__.PasswordModule, primeng_panel__WEBPACK_IMPORTED_MODULE_19__.PanelModule,
    // CommonModule,
    //    BrowserAnimationsModule,
    _angular_service_worker__WEBPACK_IMPORTED_MODULE_20__.ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: _app_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.production
    }), _angular_service_worker__WEBPACK_IMPORTED_MODULE_20__.ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.isDevMode)(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent, _next_in_q_next_in_q_component__WEBPACK_IMPORTED_MODULE_3__.NextInQComponent, _available_service_available_service_component__WEBPACK_IMPORTED_MODULE_4__.AvailableServiceComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
    // MaterialModule,
    _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_10__.StorageServiceModule,
    // MaterialDesignFrameworkModule,
    // Bootstrap4FrameworkModule,
    ngx_pipes__WEBPACK_IMPORTED_MODULE_11__.NgPipesModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.NoopAnimationsModule,
    // MatGridListModule,
    // MatCardModule,
    primeng_api__WEBPACK_IMPORTED_MODULE_13__.SharedModule, primeng_card__WEBPACK_IMPORTED_MODULE_14__.CardModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_button__WEBPACK_IMPORTED_MODULE_16__.ButtonModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_17__.ToolbarModule, primeng_password__WEBPACK_IMPORTED_MODULE_18__.PasswordModule, primeng_panel__WEBPACK_IMPORTED_MODULE_19__.PanelModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_20__.ServiceWorkerModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_20__.ServiceWorkerModule]
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
/* harmony import */ var _Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
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
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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
/* harmony import */ var _Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ 8789);
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-webstorage-service */ 4878);
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/properties */ 8101);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ 951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7947);



// import { JwtHelperService } from "@auth0/angular-jwt";





const STORAGE_KEY = 'token';
const bDebug = true;
class AuthService {
  constructor(oAPI, oStorage, router) {
    this.oAPI = oAPI;
    this.oStorage = oStorage;
    this.router = router;
    // public jwtHelper: JwtHelperService = new JwtHelperService();
    this.oAPIService = null;
    this.isAuthenticated = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(false);
    this.oAPIService = oAPI;
  }
  checkAuthenticated() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (bDebug) console.info("checkAuthenticated");
      const authenticated = yield _this.exists();
      _this.isAuthenticated.next(authenticated);
      console.info(authenticated);
      return authenticated;
    })();
  }
  login(sService, data, sRedirectURL) {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const id = yield _this2.oAPIService?.performLogin(sService, data);
        _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.token = id;
        if (id) {
          let o = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_3__.jwtDecode)(id.access_token);
          let jwt_user_fields = JSON.parse(o['user_fields']);
          console.log(jwt_user_fields);
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sEntityID = jwt_user_fields["ENTITYID"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.iUserID = jwt_user_fields["UID"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.sUserType = jwt_user_fields["TYPE"];
          _app_properties__WEBPACK_IMPORTED_MODULE_2__.Global_Variables.token = id;
          _this2.oStorage.set(STORAGE_KEY, id);
          _this2.isAuthenticated.next(true);
          yield _this2.router.navigate([sRedirectURL]);
          return;
        }
      } catch (err) {
        console.error(data);
        console.error(err);
        // Global_Variables.token = "SkipValidation"
        // this.isAuthenticated.next(true);
        // await this.router.navigate(['qdisplay']);
        // return ;
        throw Error(JSON.stringify(err["error"]));
      }
      // console.log("Not Authenticated") ;
      // throw Error('Not Authenticated ');
    })();
  }

  logout(redirect) {
    var _this3 = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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

/***/ 8578:
/*!******************************************************************!*\
  !*** ./src/app/available-service/available-service.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AvailableServiceComponent: () => (/* binding */ AvailableServiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/properties */ 8101);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _title_bar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../title-bar.service */ 9018);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api.service */ 8789);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/card */ 4722);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 2947);









function AvailableServiceComponent_div_7_p_card_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p-gridRow")(2, "p-gridCol")(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const o_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("closed ", o_r2.NAME, "");
  }
}
function AvailableServiceComponent_div_7_p_card_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p-gridRow")(1, "p-gridCol")(2, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AvailableServiceComponent_div_7_p_card_1_ng_template_3_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const o_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r7.showNextInQPage(o_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const o_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("label", o_r2.NAME);
  }
}
function AvailableServiceComponent_div_7_p_card_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p-card")(1, "p-grid", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, AvailableServiceComponent_div_7_p_card_1_ng_container_2_Template, 5, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, AvailableServiceComponent_div_7_p_card_1_ng_template_3_Template, 3, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("columns", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", o_r2 == null ? null : o_r2.bClosed)("ngIfElse", _r4);
  }
}
function AvailableServiceComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, AvailableServiceComponent_div_7_p_card_1_Template, 5, 3, "p-card", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.oItems);
  }
}
class AvailableServiceComponent {
  onConnectionStatusChange(sMqttStatus) {
    // this.oTBS.titleChange({ title: this.oEntity?.ENAME, status: sMqttStatus });
  }
  constructor(oTBS, oRouter, oAPIService) {
    this.oTBS = oTBS;
    this.oRouter = oRouter;
    this.oAPIService = oAPIService;
    this.bDebug = false;
    this.oItems = [];
    this.bHasMore = false;
    this.sEmail = '';
    this.bLoaded = false;
    this.oEntity = {
      ENAME: 'Loading...',
      ADDRESS: ''
    };
    this.oMessage = "";
    //    constructor(public navCtrl: NavController, public navParams: NavParams, public oLoginService: LoginServiceProvider, private readonly oAPIService: ApiServiceProvider) {
    // if (Global_Variables.sEntityID == 0) {
    //   this.navCtrl.setRoot('HomePage');
    //   return;
    // }
    this.onConnectionStatusChange('');
    this.oAPIService.send2ServerP("entities/" + _app_properties__WEBPACK_IMPORTED_MODULE_1__.Global_Variables.sEntityID, true).then(data => {
      this.oEntity = data.result[0];
      this.oTBS.titleChange({
        title: this.oEntity?.ENAME
      });
      if (this.bDebug) console.log(this.oEntity);
    });
    this.oAPIService.send2ServerP("services/" + _app_properties__WEBPACK_IMPORTED_MODULE_1__.Global_Variables.sEntityID + "/allactive", true).then(data => {
      if (data._error || data.result.length == 0) {
        console.log("NO ENTITLEMENTS");
        // this.oLoginService.showInformation('No Entitlement', 'Contact Admin for Access.');
        // this.navCtrl.setRoot('HomePage');
        return;
      }
      this.oItems = data.result;
      this.bLoaded = true;
      //      this.connect() ;
    });
  }

  showNextInQPage(oItem) {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.oRouter.navigateByUrl('nextinq', {
        state: oItem
      });
    })();
  }
  static #_ = this.ɵfac = function AvailableServiceComponent_Factory(t) {
    return new (t || AvailableServiceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_2__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_3__.APIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AvailableServiceComponent,
    selectors: [["app-available-service"]],
    decls: 8,
    vars: 3,
    consts: [[1, "entity-title"], [1, "logout-button"], ["pButton", "", "type", "button", "label", "Logout", "routerLink", "/login", 1, "p-button-accent"], ["class", "dashboard", 4, "ngIf"], [1, "dashboard"], [4, "ngFor", "ngForOf"], [3, "columns"], [4, "ngIf", "ngIfElse"], ["openItem", ""], ["pButton", "", "type", "button", 1, "p-button-raised", "p-button-accent", 2, "width", "100%", 3, "label", "click"]],
    template: function AvailableServiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, AvailableServiceComponent_div_7_Template, 2, 1, "div", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.oEntity == null ? null : ctx.oEntity.ENAME, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.oEntity == null ? null : ctx.oEntity.ADDRESS, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.bLoaded);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, primeng_card__WEBPACK_IMPORTED_MODULE_7__.Card, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1594:
/*!*********************************************!*\
  !*** ./src/app/environments/environment.ts ***!
  \*********************************************/
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
/* harmony import */ var _Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _title_bar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../title-bar.service */ 9018);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ 6466);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api.service */ 8789);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtext */ 873);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_password__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/password */ 3219);











const _c0 = function () {
  return ["/"];
};
class LoginComponent {
  // private _jsonURL = 'assets/Login.json';
  onConnectionStatusChange(sMqttStatus) {
    this.oTBS.titleChange({
      title: "Service Counter",
      status: sMqttStatus
    });
  }
  constructor(oTBS, oRouter, oAuthService, oAPI) {
    this.oTBS = oTBS;
    this.oRouter = oRouter;
    this.oAuthService = oAuthService;
    this.oAPI = oAPI;
    this.returnUrl = 'availableservice';
    this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
      'email': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      'ACCESS': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('s', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required)
    });
    this.submitted = false;
    this.oErrorMessage = "";
    // async ngOnInit() {
    //   this.oAPI.send2Server(this._jsonURL).then((content: string) => {
    //     var formObject:any = content; //JSON.parse(content) ;
    //     this.oFormSchema = formObject['schema'];
    //     this.oFormLayout = formObject['layout'];
    //     this.oFormData = formObject['data'];
    //     this.oMasterFormData = JSON.parse(JSON.stringify(this.oFormData));
    //   }).catch((error: any) => console.log(error));
    //   //    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'qdisplay';
    //   this.returnUrl = 'availableservice';
    //   // if (await this.oAuthService.checkAuthenticated()) {
    //   //   await this.oRouter.navigate([this.returnUrl]);
    //   // }
    // }
    // oErrorMessage = "";
    this.oFormSchema = {};
    this.oFormLayout = [];
    this.oFormData = {};
    this.oAuthService.logout('');
    this.onConnectionStatusChange('');
  }
  ngOnInit() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this.oAuthService.checkAuthenticated()) {
        yield _this.oRouter.navigate([_this.returnUrl]);
      }
    })();
  }
  onSubmit() {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.submitted = true;
      // alert(JSON.stringify(this.loginForm.value));
      try {
        yield _this2.oAuthService.login("qauth", _this2.loginForm?.value, "availableservice");
      } catch (err) {
        _this2.oErrorMessage = err;
      }
    })();
  }
  // async onFormSubmit(formData: any) {
  //   this.oErrorMessage = "";
  //   try {
  //     await this.oAuthService.login("qauth", this.oAPI.mergeJSON(this.oMasterFormData, formData), "availableservice");
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
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_1__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_3__.APIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 16,
    vars: 5,
    consts: [[3, "formGroup", "ngSubmit"], [1, "surface-ground", "flex", "align-items-center", "justify-content-center", "min-h-screen", "min-w-screen", "overflow-hidden"], [1, "flex", "flex-column", "align-items-center", "justify-content-center"], [2, "border-radius", "56px", "padding", "0.3rem", "background", "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"], [1, "w-full", "surface-card", "py-8", "px-5", "sm:px-8", 2, "border-radius", "53px"], [1, "text-center", "mb-5"], [1, "text-900", "text-3xl", "font-medium", "mb-3"], ["for", "email1", 1, "block", "text-900", "text-xl", "font-medium", "mb-2"], ["id", "email1", "type", "text", "placeholder", "Email address", "pInputText", "", "formControlName", "email", 1, "w-full", "md:w-30rem", "mb-5", 2, "padding", "1rem"], ["for", "password1", 1, "block", "text-900", "font-medium", "text-xl", "mb-2"], ["id", "password1", "formControlName", "password", "placeholder", "Password", "styleClass", "mb-5", "inputStyleClass", "w-full p-3 md:w-30rem", 3, "feedback", "toggleMask"], ["pButton", "", "pRipple", "", "label", "Sign In", 1, "w-full", "p-3", "text-xl", 3, "routerLink"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_0_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Service Counter");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div")(9, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "p-password", 10)(15, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("feedback", false)("toggleMask", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](4, _c0));
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputText, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective, primeng_password__WEBPACK_IMPORTED_MODULE_9__.Password],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4989:
/*!**************************************************!*\
  !*** ./src/app/next-in-q/next-in-q.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NextInQComponent: () => (/* binding */ NextInQComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _app_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/properties */ 8101);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../env.properties */ 2430);
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abstract-mqtt */ 1820);
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(abstract_mqtt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ 4289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _title_bar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../title-bar.service */ 9018);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ 8789);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/button */ 2947);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/panel */ 6110);
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-pipes */ 4901);













const _c0 = function () {
  return {
    "blinking": true
  };
};
const _c1 = function (a0) {
  return {
    "blinking": a0
  };
};
function NextInQComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "p-panel", 8)(5, "div", 9)(6, "div", 10)(7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " Last in Q ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "lpad");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "Servicing Q#");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 11)(18, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "lpad");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 9)(22, "div", 10)(23, "div", 11)(24, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "Appointment #");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 9)(29, "div", 10)(30, "div", 15)(31, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NextInQComponent_div_7_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r1.onNextInQ());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("header", ctx_r0.oService == null ? null : ctx_r0.oService.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("toggleable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](11, 10, ctx_r0.oItem == null ? null : ctx_r0.oItem.PREFIX, 2, " "), "", ctx_r0.oItem.ISSUEDQN_T, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](18, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](20, 14, ctx_r0.oItem == null ? null : ctx_r0.oItem.PREFIX, 2, " "), "", ctx_r0.oItem.CURRENTQN_T, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](19, _c1, ctx_r0.bIsServicingAppointment && ctx_r0.bBlink));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r0.oAItem.CURRENTQN_T, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r0.shouldDisable());
  }
}
class NextInQComponent extends abstract_mqtt__WEBPACK_IMPORTED_MODULE_3__.MqttService {
  getMqttHost() {
    return this.sMqttHost;
  }
  getClientID() {
    //  super.sClientID = "qs-" + this.Global_Variables.UUID;
    return (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])();
  }
  onConnectionStatusChange(sMqttStatus) {
    // this.oTBS.titleChange({ title: "CallQueue #", status: sMqttStatus });
  }
  constructor(oTBS, oLocation, oRouter, oAPIService) {
    super(_env_properties__WEBPACK_IMPORTED_MODULE_2__.MQTT_HOST, _env_properties__WEBPACK_IMPORTED_MODULE_2__.MQTT_PORT, _app_properties__WEBPACK_IMPORTED_MODULE_1__.Global_Variables, false);
    this.oTBS = oTBS;
    this.oLocation = oLocation;
    this.oRouter = oRouter;
    this.oAPIService = oAPIService;
    this.bDebug = true;
    this.oItem = {
      CURRENTQN: 0,
      ISSUEDQN: 0
    };
    this.oAItem = {
      CURRENTQN: 0,
      ISSUEDQN: 0
    };
    this.oService = {};
    this.oEntity = {};
    this.COUNTERN = -1;
    //  bHasMore: boolean = false;
    this.sEmail = '';
    this.bLoaded = false;
    this.bIsServicingAppointment = false;
    this.oOptions = {
      useSSL: _env_properties__WEBPACK_IMPORTED_MODULE_2__.MQTT_USESSL,
      userName: "test",
      password: "test12"
    };
    this.sMqttHost = _env_properties__WEBPACK_IMPORTED_MODULE_2__.MQTT_HOST;
    this.oMessage = "";
    this.oAppointments = [];
    // onLogout() {
    //   //    this.setConnect(false);
    //   super.navCtrl.setRoot('HomePage');
    // }
    this.bBlink = false;
    super.setMqttOptions(this.oOptions);
    this.COUNTERN = -1;
    this.oService = this.oLocation.getState();
    console.log(this.oService);
    // this.sMqttHost = 'm-ezq.ignorelist.com';
    // this.oAPIService.send2ServerP("mqtthost/" + this.oService.ENTITYID, true).then((data: any) => {
    //   var o = data.result;
    //   console.log(o);
    //   if (o.length > 0) {
    //     this.sMqttHost = o[0].MQTTHOST;
    //     super.setConnect(true);
    //   }
    //   else {
    //     console.log("sMqttHost Not returned. ", o.length);
    //   }
    // });
    this.oAPIService.send2ServerP("entities/" + this.oService.ENTITYID, true).then(data => {
      this.oEntity = data.result[0];
      this.oTBS.titleChange({
        title: this.oEntity?.ENAME
      });
      console.info(data.result);
      this.loadQDetails();
    });
  }
  loadQDetails() {
    var _superprop_getSubscribe = () => super.subscribe,
      _this = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.fetchAppointments();
      _this.oAPIService.send2ServerP("lqn/" + _this.oEntity.ID + "/" + _this.oService.ID, true).then(data => {
        if (data.result.length == 0) {
          _this.oMessage = "Closed";
          _this.bLoaded = true;
        } else {
          if (data.result.length != 1) {
            console.log("FATAL Logic Error");
            console.log(JSON.stringify(data.result));
            //          this.fetchAppointments();
            _this.bLoaded = true;
            return;
          }
          _this.oItem = data.result[0];
          //        this.oItem.ENTITYID = 1 ;
          _this.oItem.CURRENTQN_T = _this.padLeft(_this.oItem.CURRENTQN, '0', 3);
          _this.oItem.ISSUEDQN_T = _this.padLeft(_this.oItem.ISSUEDQN, '0', 3);
          if (_this.bDebug) console.log("*** SERVICE " + JSON.stringify(_this.oService));
          _this.oItem.PREFIX = _this.oService.PREFIX;
          //        this.oItem.COUNTERN = this.l.counter;
          //        this.publish ( "LEDSetup/" + this.oItem.ENTITYID + "/" + this.oItem.SERVICEID,  this.oItem.COUNTERN + ",On") ;
          if (_this.bDebug) console.log(JSON.stringify(_this.oItem));
          // this.bHasMore = Number(this.oItem.CURRENTQN) < Number(this.oItem.ISSUEDQN);
          // this.bHasMore = true ;
          //        this.fetchAppointments();
          _this.setConnect(true);
          _superprop_getSubscribe().call(_this, "CQ/" + _this.oItem.ENTITYID + "/" + _this.oItem.SERVICEID);
          _superprop_getSubscribe().call(_this, "AQ/" + _this.oItem.ENTITYID + "/" + _this.oItem.SERVICEID);
          _this.bLoaded = true;
        }
      });
      // });
    })();
  }

  shouldDisable() {
    if (this.bConnected == false) return true;
    if (this.oAppointments.length > 0) {
      return false;
      // if (Number(this.oAppointments[0].AQNUMBER) <= Number(moment().format("HHmm")))
      //   return true;
    }

    return !(Number(this.oItem.CURRENTQN) < Number(this.oItem.ISSUEDQN));
  }
  fetchAppointments() {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qsc_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.oAPIService.send2ServerP("services/appointments/list/" + _this2.oEntity.ID + "/" + _this2.oService.ID + "", true).then(data => {
        if (data.result._error) console.log(data.result._error);else _this2.oAppointments = data.result;
      });
    })();
  }
  ngOnInit() {
    // ionViewDidEnter() {
    this.oAppointments = [];
    if (this.bLoaded) {
      this.fetchAppointments();
      super.subscribe("CQ/" + this.oItem.ENTITYID + "/" + this.oItem.SERVICEID);
      super.subscribe("AQ/" + this.oItem.ENTITYID + "/" + this.oItem.SERVICEID);
    }
  }
  getUserName() {
    //TODO get a new JWT token that expires in few minutes.
    return _app_properties__WEBPACK_IMPORTED_MODULE_1__.Global_Variables.token?.['access_token'] || '';
  }
  ngOnDestroy() {
    //  ionViewWillUnload() {
    //  ionViewDidLeave() {
    //this.disconnectMQTT();
    //Update the servicetime
    this.oAPIService.send2ServerP("sqnlogout/" + this.oEntity.ID + "/" + this.oService.ID + "/" + this.oItem.CURRENTQN, true).then(data => {});
    try {
      super.setConnect(false);
    } catch (err) {}
  }
  onNextInQ() {
    // !bConnected || !bServerUp ||
    this.bBlink = false;
    var c = this.COUNTERN;
    if (this.COUNTERN <= 0) c = -1;
    this.oAPIService.send2ServerP("sqn/" + this.oEntity.ID + "/" + this.oService.ID + "/" + c + "/" + (this.bIsServicingAppointment ? this.oAItem.COUNTERQN : 0), true).then(data => {
      if (data._error) {
        this.fetchAppointments();
        alert('No more Q# to Service');
        return;
      }
      if (this.bDebug) console.log(data.result[0]);
      if (data.result[0].ISSUEDQN == '-100')
        // Appointment
        {
          //        console.log(data.result[0]) ;
          this.oAItem.COUNTERQN = data.result[0].QUEUEN;
          this.oAItem.CURRENTQN_T = this.oAItem.COUNTERQN;
          this.bIsServicingAppointment = true;
          this.fetchAppointments();
        } else {
        this.oItem.CURRENTQN = data.result[0].QUEUEN;
        this.bIsServicingAppointment = false;
      }
      this.bBlink = true;
      //      this.notifyLEDUnit ( ) ;
    });
  }

  onNoShow() {
    console.log("TODO: Implement Logic");
    var c = this.COUNTERN;
    if (this.COUNTERN <= 0) c = -1;
    this.oAPIService.send2ServerP("sqnnoshow/" + this.oEntity.ID + "/" + this.oService.ID + "/" + c, true).then(data => {
      if (this.bDebug) console.log(data.result[0]);
      this.oItem.CURRENTQN = data.result[0].QUEUEN;
      this.bBlink = true;
      //      this.notifyLEDUnit ( ) ;
    });
  }

  padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }
  processMessage(message) {
    // ./pushMessage.sh 'CQ/1/11' '23'
    //    // ./pushMessage.sh 'NQ/1/11' '23'
    var t = super.getTopicPathInArray(message);
    if (t[0] == 'ServerUp') return;
    if (t[0] == 'IP') {
      this.onConnectionStatusChange(m);
      return;
    }
    var m = super.getMessageInArray(message);
    if (t[0] == 'CQ') {
      if (t[2] != this.oService.ID) return;
      this.oItem.CURRENTQN = m[0];
      if (m[0] == '0' && m[1] == '0') return;
      this.oItem.CURRENTQN_T = this.padLeft(this.oItem.CURRENTQN, '0', 3);
      this.oItem.ISSUEDQN = m[1];
      this.oItem.ISSUEDQN_T = this.padLeft(this.oItem.ISSUEDQN, '0', 3);
      if (this.bDebug) console.log(this.oItem);
      // this.bHasMore = Number(this.oItem.CURRENTQN) < Number(this.oItem.ISSUEDQN);
      // this.bHasMore = true;
      return;
    }
    if (t[0] == 'AQ') {
      if (t[2] != this.oItem.SERVICEID) return;
      this.oAItem.CURRENTQN = m[0];
      if (m[0] == '0' && m[1] == '0') return;
      this.oAItem.CURRENTQN_T = this.oAItem.CURRENTQN;
      if (this.bDebug) console.log(this.oAItem);
      this.fetchAppointments();
      return;
    }
    // if (message.destinationName.startsWith('CQ')) {
    //   var m = message.payloadString.split(',');
    //   this.oItem.LQN = m[1];
    //   return;
    // }
    //Next Q for the counter
    // if (message.destinationName.startsWith('NQ')) {
    //   //  var d = message.destinationName.split('/');
    //   // console.log(d[0] + " " + d[1] + " " + d[2]);
    //   var m = message.payloadString.split(',');
    //   console.log(m[0] + " and " + m[1]);
    //   this.oItem.ISSUEDQN = m[0];
    //   return;
    // }
    if (this.bDebug) console.log("Unhandled: " + message.destinationName + " " + message.payloadString);
    // var d = message.destinationName.split('/');
    // console.log(d[0] + " " + d[1] + " " + d[2]);
    // var m = message.payloadString.split(',');
    // console.log(m[0] + " and " + m[1]);
    // this.oItem.forEach((oItem) => {
    //   if (oItem.SERVICEID == d[2]) {
    //     oItem.CURRENTQN = Number(m[0]);
    //   }
    // });
  }

  onLogout() {
    //    this.setConnect(false);
    this.oRouter.navigateByUrl('login');
  }
  static #_ = this.ɵfac = function NextInQComponent_Factory(t) {
    return new (t || NextInQComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_title_bar_service__WEBPACK_IMPORTED_MODULE_4__.TitleBarService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_5__.APIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: NextInQComponent,
    selectors: [["app-next-in-q"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
    decls: 8,
    vars: 3,
    consts: [[1, "entity-title"], [1, "logout-button"], ["pButton", "", "type", "button", "label", "Logout", "routerLink", "/login", 1, "p-button-accent"], ["class", "grid", 4, "ngIf"], [1, "grid"], [1, "col-12"], [1, "card"], [1, "card-item", "mb-3"], [1, "line-height-3", "m-0", 3, "header", "toggleable"], [1, "mb-3"], [1, "p-grid"], [1, "p-col-6"], [1, "right"], [3, "ngClass"], [1, "p-col-6", 3, "ngClass"], [1, "p-col-12"], ["pButton", "", "type", "button", "label", "Next Person", 1, "p-button-raised", "p-button-accent", 3, "disabled", "click"]],
    template: function NextInQComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, NextInQComponent_div_7_Template, 32, 21, "div", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.oEntity == null ? null : ctx.oEntity.ENAME, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx.oEntity == null ? null : ctx.oEntity.ADDRESS, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.bLoaded);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, primeng_button__WEBPACK_IMPORTED_MODULE_10__.ButtonDirective, primeng_panel__WEBPACK_IMPORTED_MODULE_11__.Panel, ngx_pipes__WEBPACK_IMPORTED_MODULE_12__.LeftPadPipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
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
//export const sEndPoint = "http://192.168.0.120:4200/";
//export const sEndPoint = "http://127.0.0.1:4200/" ;


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
      title: 'Service Counter',
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