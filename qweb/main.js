"use strict";
(self["webpackChunkqweb"] = self["webpackChunkqweb"] || []).push([["main"],{

/***/ 87423:
/*!****************************************!*\
  !*** ./src/app/_helpers/auth.guard.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/_services */ 57870);



class AuthGuard {
  constructor(router, authenticationService) {
    this.router = router;
    this.authenticationService = authenticationService;
  }
  canActivate(route, state) {
    const user = this.authenticationService.userValue;
    if (user) {
      // check if route is restricted by role
      if (route.data['roles'] && route.data['roles']?.indexOf(user.TYPE) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
  static #_ = this.ɵfac = function AuthGuard_Factory(t) {
    return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_app_services__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 78418:
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorInterceptor: () => (/* binding */ ErrorInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 33252);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/_services */ 57870);




class ErrorInterceptor {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }
  intercept(request, next) {
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(err => {
      if ([403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.authenticationService.logout();
      }
      const error = err.error.message || err.statusText;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(error);
    }));
  }
  static #_ = this.ɵfac = function ErrorInterceptor_Factory(t) {
    return new (t || ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_app_services__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: ErrorInterceptor,
    factory: ErrorInterceptor.ɵfac
  });
}

/***/ }),

/***/ 21946:
/*!***********************************!*\
  !*** ./src/app/_helpers/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* reexport safe */ _auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard),
/* harmony export */   ErrorInterceptor: () => (/* reexport safe */ _error_interceptor__WEBPACK_IMPORTED_MODULE_1__.ErrorInterceptor),
/* harmony export */   JwtInterceptor: () => (/* reexport safe */ _jwt_interceptor__WEBPACK_IMPORTED_MODULE_2__.JwtInterceptor)
/* harmony export */ });
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ 87423);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.interceptor */ 78418);
/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jwt.interceptor */ 27877);


//export * from './fake-backend.NOTUSED';


/***/ }),

/***/ 27877:
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JwtInterceptor: () => (/* binding */ JwtInterceptor)
/* harmony export */ });
/* harmony import */ var src_env_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/env.properties */ 12430);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services */ 57870);



class JwtInterceptor {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }
  intercept(request, next) {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.access_token;
    const isApiUrl = request.url.startsWith(src_env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          //                    'ks-x-uthorization': `Bearer ${user.access_token}`
          'Authorization': `Bearer ${user.access_token}`
        }
      });
    }
    return next.handle(request);
  }
  static #_ = this.ɵfac = function JwtInterceptor_Factory(t) {
    return new (t || JwtInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_services__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: JwtInterceptor,
    factory: JwtInterceptor.ɵfac
  });
}

/***/ }),

/***/ 84939:
/*!**********************************!*\
  !*** ./src/app/_models/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Role: () => (/* reexport safe */ _role__WEBPACK_IMPORTED_MODULE_0__.Role),
/* harmony export */   User: () => (/* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_1__.User)
/* harmony export */ });
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role */ 34142);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ 252);



/***/ }),

/***/ 34142:
/*!*********************************!*\
  !*** ./src/app/_models/role.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Role: () => (/* binding */ Role)
/* harmony export */ });
var Role;
(function (Role) {
  Role["QueueAdmin"] = "Q";
  Role["EntityAdmin"] = "A";
})(Role || (Role = {}));

/***/ }),

/***/ 252:
/*!*********************************!*\
  !*** ./src/app/_models/user.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
class User {}

/***/ }),

/***/ 79123:
/*!******************************************!*\
  !*** ./src/app/_services/DataService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataService: () => (/* binding */ DataService)
/* harmony export */ });
/* harmony import */ var src_env_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/env.properties */ 12430);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication.service */ 2367);
// import { environment } from '../../environments/environment';
// import { AuthService } from 'angularx-social-login';
// import { SocialUser } from 'angularx-social-login';




const BACKEND_URL = "";
class DataService {
  // user: SocialUser;
  // constructor(private oAuthService: AuthService, private http: HttpClient) {
  //   this.oAuthService.authState.subscribe((user) => {
  //     this.user = user;
  //   });
  // }
  getJSONFromLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : null;
  }
  constructor(http, authenticationService) {
    this.http = http;
    this.authenticationService = authenticationService;
  }
  getFromURL(sURL) {
    return this.http.get(sURL).toPromise();
  }
  getData(sServiceName) {
    return this.http.get(BACKEND_URL + sServiceName).toPromise();
  }
  postData(sServiceName, data) {
    return this.http.post(BACKEND_URL + sServiceName, data).toPromise();
  }
  send2Server(sURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(sURL, oItem).toPromise();
    }
    return this.http.get(sURL).toPromise();
  }
  getURL() {
    //    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    //    console.log(this.authenticationService.userValue);
    return src_env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + "api/" + this.authenticationService.userValue.UID + "/";
  }
  send2ServerRoot(sPartialURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(src_env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + sPartialURL, oItem).toPromise();
    }
    return this.http.get(src_env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + sPartialURL).toPromise();
  }
  send2ServerC(sPartialURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL).toPromise();
  }
  send2ServerP(sPartialURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL).toPromise();
  }
  send2ServerPlainText(sPartialURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL).toPromise();
  }
  fileUpload(sUrl, formData) {
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
  send2ServerPImage(sPartialURL, bPost = false, oItem = null) {
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem, {
        responseType: 'text'
      }).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL, {
      responseType: 'text'
    }).toPromise();
  }
  sort(oData, oFields) {
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
    var parts = sTime.match(timeReg) || '0';
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
  static #_ = this.ɵfac = function DataService_Factory(t) {
    return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: DataService,
    factory: DataService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 2367:
/*!*****************************************************!*\
  !*** ./src/app/_services/authentication.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationService: () => (/* binding */ AuthenticationService),
/* harmony export */   NULL_USER: () => (/* binding */ NULL_USER)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 58071);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../env.properties */ 12430);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jwt-decode */ 10951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 54860);


// import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//import { JwtInterceptor } from '@app/_helpers';
// import { JwtHelperService } from '@auth0/angular-jwt';




// import { JwtHelperService, JWT_OPTIONS, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
const NULL_USER = {
  USEREMAIL: undefined,
  UID: undefined,
  TYPE: undefined,
  "access_token": undefined
  // Other properties initialized to null or appropriate default values
};

class AuthenticationService {
  constructor(router, http) {
    this.router = router;
    this.http = http;
    const oU = localStorage.getItem('user');
    if (oU === null) this.userSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(NULL_USER);else this.userSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(JSON.parse(oU));
    this.user = this.userSubject.asObservable();
  }
  get userValue() {
    return this.userSubject.value;
  }
  login(username, password) {
    console.log("***", _env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint);
    return this.http.post(_env_properties__WEBPACK_IMPORTED_MODULE_0__.sEndPoint + 'qwebauth', {
      email: username,
      password: password
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let o = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_1__.jwtDecode)(user.access_token);
      let jwt_user_fields = JSON.parse(o['user_fields']);
      console.log(jwt_user_fields);
      user.TYPE = jwt_user_fields["TYPE"];
      user.UID = jwt_user_fields["UID"];
      user.USEREMAIL = user["user_fields"]["USEREMAIL"];
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      this.userSubject.next(user);
      return user;
    }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(NULL_USER);
    this.router.navigate(['']);
  }
  static #_ = this.ɵfac = function AuthenticationService_Factory(t) {
    return new (t || AuthenticationService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AuthenticationService,
    factory: AuthenticationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 57870:
/*!************************************!*\
  !*** ./src/app/_services/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationService: () => (/* reexport safe */ _authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService),
/* harmony export */   DataService: () => (/* reexport safe */ _DataService__WEBPACK_IMPORTED_MODULE_1__.DataService),
/* harmony export */   NULL_USER: () => (/* reexport safe */ _authentication_service__WEBPACK_IMPORTED_MODULE_0__.NULL_USER)
/* harmony export */ });
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.service */ 2367);
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ 79123);


//export * from './user.service.notused';

/***/ }),

/***/ 63094:
/*!*********************************************!*\
  !*** ./src/app/_services/upload.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UploadService: () => (/* binding */ UploadService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);


class UploadService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.SERVER_URL = "https://file.io/";
  }
  upload(formData) {
    return this.httpClient.post(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  static #_ = this.ɵfac = function UploadService_Factory(t) {
    return new (t || UploadService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: UploadService,
    factory: UploadService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 23966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _layout_guest_guest_layout_guest_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/guest/guest-layout/guest-layout.component */ 22852);
/* harmony import */ var _pages_landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/landing-page/landing-page.component */ 42399);
/* harmony import */ var _layout_authorised_authorised_layout_authorised_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/authorised/authorised-layout/authorised-layout.component */ 66946);
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/dashboard/dashboard.component */ 21938);
/* harmony import */ var _pages_mqtt_status_mqtt_status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/mqtt-status/mqtt-status.component */ 1132);
/* harmony import */ var _pages_list_entities_list_entities_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/list-entities/list-entities.component */ 93900);
/* harmony import */ var _pages_list_services_list_services_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/list-services/list-services.component */ 99858);
/* harmony import */ var _pages_list_users_list_users_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/list-users/list-users.component */ 77637);
/* harmony import */ var _pages_edit_entity_edit_entity_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/edit-entity/edit-entity.component */ 36730);
/* harmony import */ var _pages_edit_service_edit_service_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/edit-service/edit-service.component */ 46678);
/* harmony import */ var _pages_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/edit-user/edit-user.component */ 57124);
/* harmony import */ var _pages_business_hours_business_hours_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/business-hours/business-hours.component */ 34030);
/* harmony import */ var _pages_messages_messages_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/messages/messages.component */ 64440);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);













// import { MessageComponent } from 'angular6-json-schema-form';



const routes = [{
  path: '',
  component: _layout_guest_guest_layout_guest_layout_component__WEBPACK_IMPORTED_MODULE_0__.GuestLayoutComponent,
  children: [{
    path: '',
    component: _pages_landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_1__.LandingPageComponent,
    pathMatch: 'full'
  }]
}, {
  path: '',
  component: _layout_authorised_authorised_layout_authorised_layout_component__WEBPACK_IMPORTED_MODULE_2__.AuthorisedLayoutComponent,
  children: [{
    path: '',
    component: _pages_messages_messages_component__WEBPACK_IMPORTED_MODULE_12__.MessagesComponent,
    pathMatch: 'full'
  }, {
    path: 'messages',
    component: _pages_messages_messages_component__WEBPACK_IMPORTED_MODULE_12__.MessagesComponent,
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__.DashboardComponent,
    pathMatch: 'full'
  }, {
    path: 'mqttstatus',
    component: _pages_mqtt_status_mqtt_status_component__WEBPACK_IMPORTED_MODULE_4__.MqttStatusComponent,
    pathMatch: 'full'
  }, {
    path: 'clinics',
    component: _pages_list_entities_list_entities_component__WEBPACK_IMPORTED_MODULE_5__.ListEntitiesComponent,
    pathMatch: 'full'
  }, {
    path: 'services',
    component: _pages_list_services_list_services_component__WEBPACK_IMPORTED_MODULE_6__.ListServicesComponent,
    pathMatch: 'full'
  }, {
    path: 'users',
    component: _pages_list_users_list_users_component__WEBPACK_IMPORTED_MODULE_7__.ListUsersComponent,
    pathMatch: 'full'
  }, {
    path: 'edit-entity',
    component: _pages_edit_entity_edit_entity_component__WEBPACK_IMPORTED_MODULE_8__.EditEntityComponent,
    pathMatch: 'full'
  }, {
    path: 'edit-service',
    component: _pages_edit_service_edit_service_component__WEBPACK_IMPORTED_MODULE_9__.EditServiceComponent,
    pathMatch: 'full'
  }, {
    path: 'edit-user',
    component: _pages_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_10__.EditUserComponent,
    pathMatch: 'full'
  }, {
    path: 'business-hours',
    component: _pages_business_hours_business_hours_component__WEBPACK_IMPORTED_MODULE_11__.BusinessHoursComponent,
    pathMatch: 'full'
  }]
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
  });
})();

/***/ }),

/***/ 66401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);


class AppComponent {
  constructor() {
    this.title = 'qweb';
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 78629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 23966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 66401);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/service-worker */ 51509);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _layout_page_content_page_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/page-content/page-content.component */ 15287);
/* harmony import */ var _layout_guest_guest_top_nav_guest_top_nav_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/guest/guest-top-nav/guest-top-nav.component */ 58006);
/* harmony import */ var _layout_guest_guest_footer_guest_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/guest/guest-footer/guest-footer.component */ 96813);
/* harmony import */ var _layout_guest_guest_layout_guest_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout/guest/guest-layout/guest-layout.component */ 22852);
/* harmony import */ var _pages_landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/landing-page/landing-page.component */ 42399);
/* harmony import */ var _layout_authorised_authorised_side_nav_authorised_side_nav_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layout/authorised/authorised-side-nav/authorised-side-nav.component */ 67381);
/* harmony import */ var _layout_authorised_authorised_layout_authorised_layout_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layout/authorised/authorised-layout/authorised-layout.component */ 66946);
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/dashboard/dashboard.component */ 21938);
/* harmony import */ var _layout_authorised_authorised_top_nav_authorised_top_nav_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layout/authorised/authorised-top-nav/authorised-top-nav.component */ 86087);
/* harmony import */ var _layout_authorised_authorised_side_nav_toggler_authorised_side_nav_toggler_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component */ 45701);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _ajsf_bootstrap4__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @ajsf/bootstrap4 */ 8834);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_helpers */ 21946);
/* harmony import */ var _pages_mqtt_status_mqtt_status_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/mqtt-status/mqtt-status.component */ 1132);
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! angular-confirmation-popover */ 71479);
/* harmony import */ var _pages_list_entities_list_entities_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/list-entities/list-entities.component */ 93900);
/* harmony import */ var _pages_list_services_list_services_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/list-services/list-services.component */ 99858);
/* harmony import */ var _pages_list_users_list_users_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/list-users/list-users.component */ 77637);
/* harmony import */ var _pages_edit_entity_edit_entity_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/edit-entity/edit-entity.component */ 36730);
/* harmony import */ var _pages_edit_service_edit_service_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/edit-service/edit-service.component */ 46678);
/* harmony import */ var _pages_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/edit-user/edit-user.component */ 57124);
/* harmony import */ var _pages_business_hours_business_hours_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/business-hours/business-hours.component */ 34030);
/* harmony import */ var _pages_jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/jsonform/jsonform.component */ 80106);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 79985);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ 88495);
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ 67991);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _pages_messages_messages_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pages/messages/messages.component */ 64440);

































//import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "ngx-schema-form";
// import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';

//import { library, dom } from '@fortawesome/fontawesome-svg-core'



//import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
//import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';






// library.add(fas, far, fab);
// dom.watch()
class AppModule {
  // fas = fas;
  constructor(faConfig, lib) {
    lib.addIconPacks(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_23__.fas, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_24__.far, _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_25__.fab);
    faConfig.fallbackIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_23__.faBan;
    faConfig.defaultPrefix = 'far';
    // library.add(fas, far, fab);
  }
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵinject"](_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_27__.FaConfig), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵinject"](_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_27__.FaIconLibrary));
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineInjector"]({
    providers: [
    //    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HTTP_INTERCEPTORS,
      useClass: _helpers__WEBPACK_IMPORTED_MODULE_12__.JwtInterceptor,
      multi: true
    }, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HTTP_INTERCEPTORS,
      useClass: _helpers__WEBPACK_IMPORTED_MODULE_12__.ErrorInterceptor,
      multi: true
    }, {
      provide: _angular_common__WEBPACK_IMPORTED_MODULE_29__.LocationStrategy,
      useClass: _angular_common__WEBPACK_IMPORTED_MODULE_29__.HashLocationStrategy
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_31__.ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !(0,_angular_core__WEBPACK_IMPORTED_MODULE_26__.isDevMode)(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), _angular_common__WEBPACK_IMPORTED_MODULE_29__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.FormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_33__.NgbModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HttpClientModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_27__.FontAwesomeModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_34__.MatProgressSpinnerModule, _ajsf_bootstrap4__WEBPACK_IMPORTED_MODULE_35__.Bootstrap4FrameworkModule,
    //    MaterialDesignFramework,
    angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_36__.ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })]
  });
}

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _layout_page_content_page_content_component__WEBPACK_IMPORTED_MODULE_2__.PageContentComponent, _layout_guest_guest_top_nav_guest_top_nav_component__WEBPACK_IMPORTED_MODULE_3__.GuestTopNavComponent, _layout_guest_guest_footer_guest_footer_component__WEBPACK_IMPORTED_MODULE_4__.GuestFooterComponent, _layout_guest_guest_layout_guest_layout_component__WEBPACK_IMPORTED_MODULE_5__.GuestLayoutComponent, _pages_landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_6__.LandingPageComponent, _layout_authorised_authorised_side_nav_authorised_side_nav_component__WEBPACK_IMPORTED_MODULE_7__.AuthorisedSideNavComponent, _layout_authorised_authorised_layout_authorised_layout_component__WEBPACK_IMPORTED_MODULE_8__.AuthorisedLayoutComponent, _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__.DashboardComponent, _layout_authorised_authorised_top_nav_authorised_top_nav_component__WEBPACK_IMPORTED_MODULE_10__.AuthorisedTopNavComponent, _layout_authorised_authorised_side_nav_toggler_authorised_side_nav_toggler_component__WEBPACK_IMPORTED_MODULE_11__.AuthorisedSideNavTogglerComponent, _pages_jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_21__.JSONFormComponent, _pages_list_entities_list_entities_component__WEBPACK_IMPORTED_MODULE_14__.ListEntitiesComponent, _pages_list_services_list_services_component__WEBPACK_IMPORTED_MODULE_15__.ListServicesComponent, _pages_edit_entity_edit_entity_component__WEBPACK_IMPORTED_MODULE_17__.EditEntityComponent, _pages_list_users_list_users_component__WEBPACK_IMPORTED_MODULE_16__.ListUsersComponent, _pages_edit_service_edit_service_component__WEBPACK_IMPORTED_MODULE_18__.EditServiceComponent, _pages_edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_19__.EditUserComponent, _pages_business_hours_business_hours_component__WEBPACK_IMPORTED_MODULE_20__.BusinessHoursComponent, _pages_mqtt_status_mqtt_status_component__WEBPACK_IMPORTED_MODULE_13__.MqttStatusComponent, _pages_messages_messages_component__WEBPACK_IMPORTED_MODULE_22__.MessagesComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_31__.ServiceWorkerModule, _angular_common__WEBPACK_IMPORTED_MODULE_29__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.FormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_33__.NgbModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HttpClientModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_27__.FontAwesomeModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_34__.MatProgressSpinnerModule, _ajsf_bootstrap4__WEBPACK_IMPORTED_MODULE_35__.Bootstrap4FrameworkModule, angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_36__.ConfirmationPopoverModule]
  });
})();

/***/ }),

/***/ 66946:
/*!************************************************************************************!*\
  !*** ./src/app/layout/authorised/authorised-layout/authorised-layout.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorisedLayoutComponent: () => (/* binding */ AuthorisedLayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _page_content_page_content_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../page-content/page-content.component */ 15287);
/* harmony import */ var _authorised_side_nav_authorised_side_nav_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../authorised-side-nav/authorised-side-nav.component */ 67381);
/* harmony import */ var _authorised_top_nav_authorised_top_nav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../authorised-top-nav/authorised-top-nav.component */ 86087);




class AuthorisedLayoutComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function AuthorisedLayoutComponent_Factory(t) {
    return new (t || AuthorisedLayoutComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: AuthorisedLayoutComponent,
    selectors: [["app-authorised-layout"]],
    decls: 4,
    vars: 0,
    consts: [[1, "box"]],
    template: function AuthorisedLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-authorised-top-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-authorised-side-nav")(3, "app-page-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_page_content_page_content_component__WEBPACK_IMPORTED_MODULE_0__.PageContentComponent, _authorised_side_nav_authorised_side_nav_component__WEBPACK_IMPORTED_MODULE_1__.AuthorisedSideNavComponent, _authorised_top_nav_authorised_top_nav_component__WEBPACK_IMPORTED_MODULE_2__.AuthorisedTopNavComponent],
    styles: [".box[_ngcontent-%COMP%] {\n  padding: 0;\n  display: flex;\n  min-height: 0;\n  flex-direction: row;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2F1dGhvcmlzZWQvYXV0aG9yaXNlZC1sYXlvdXQvYXV0aG9yaXNlZC1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0RBO0VBRUUsVUFBQTtFQUVBLGFBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7QUExREYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAud3JhcHBlciB7XG4vLyAgIC8vIHdpZHRoOiAxMDAlO1xuLy8gICAvLyBoZWlnaHQ6IDEwMCU7XG4vLyAgIC8vIGRpc3BsYXk6IGZsZXg7XG4vLyAgIC8vIC8vIGZsZXg6IDAgMCAxMDAlO1xuLy8gICAvLyBmbGV4LWRpcmVjdGlvbjogcm93O1xuLy8gICAvLyAvLyBmbGV4LXNocmluazogMDtcbi8vICAgLy8gLy8gZmxleC1ncm93OiAxO1xuLy8gICAvLyAvLyBwYWRkaW5nOiAwcHg7XG4vLyAgIC8vIC8vIG1hcmdpbjogMDtcbi8vICAgLy8gLy8gdmVydGljYWwtYWxpZ246IHRvcDtcbi8vICAgLy8gd2lkdGg6IDEwMCU7XG5cbi8vICAgZGlzcGxheTogZmxleDtcbi8vICAgZmxleC1kaXJlY3Rpb246IHJvdztcbi8vICAgZmxleC13cmFwOiB3cmFwO1xuLy8gICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4vLyAgIG1hcmdpbjogMCAtMTVweDtcblxuLy8gfVxuXG5cbi8vICNtYWluIHtcbi8vICAgd2lkdGg6IDEwMCU7XG4vLyAgIC8vIGhlaWdodDogMTAwcHg7XG4vLyAgIGhlaWdodDogMTAwJTtcbi8vICAgYm9yZGVyOiAxcHggc29saWQgI2MzYzNjMztcbi8vICAgZGlzcGxheTogZmxleDtcbi8vIH1cblxuLy8gLmJveGNvbnRhaW5lciAuYm94IHtcbi8vICAgd2lkdGg6IDEwMCU7XG4vLyAgIGZsZXgtc2hyaW5rOiAwO1xuLy8gfVxuXG4vLyAqIHtcbi8vICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbi8vIH1cblxuLy8gLndyYXBwZXIge1xuLy8gICB3aWR0aDogMTAwJTtcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTtcbi8vICAgYm9yZGVyOiAycHggc29saWQgI0RERERERDtcbi8vICAgcGFkZGluZzogMXJlbTtcbi8vIH1cblxuLy8gLmJveGNvbnRhaW5lciB7XG4vLyAgIHdpZHRoOiAxMDAlO1xuLy8gICAvLyAgcG9zaXRpb246IHJlbGF0aXZlO1xuLy8gICBsZWZ0OiAwO1xuLy8gICBib3JkZXI6IDJweCBzb2xpZCAjQkRDM0M3O1xuLy8gICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlO1xuLy8gICBkaXNwbGF5OiBmbGV4O1xuLy8gfVxuXG4vLyAuYm94Y29udGFpbmVyIFxuLmJveCB7XG4gIC8vIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICAvLyBmbGV4LXNocmluazogMDtcbiAgZGlzcGxheTogZmxleDtcblxuICBtaW4taGVpZ2h0OiAwO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAvLyAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIC8vIGZsZXgtZ3JvdzogMTtcbiAgLy8gZmxleC1zaHJpbms6IDA7XG4gIC8vIGZsZXgtYmFzaXM6IDEwMCU7XG59XG5cblxuXG4vLyAqIHtcbi8vICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbi8vIH1cblxuLy8gLndyYXBwZXIge1xuXG4vLyAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cbi8vICAgbWluLWhlaWdodDogMDtcbi8vICAgZmxleC1kaXJlY3Rpb246IHJvdztcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG5cblxuLy8gICAvLyBkaXNwbGF5OiBmbGV4O1xuLy8gICAvLyAvLyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbi8vICAgLy8gLy8gYWxpZ24taXRlbXM6IGNlbnRlcjtcbi8vICAgLy8gLy8gZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XG4vLyAgIC8vIGJhY2tncm91bmQ6ICMyNjI2MjY7XG4vLyAgIC8vIHdpZHRoOiAxMDAlO1xuLy8gICAvLyBoZWlnaHQ6IDEwMHZoO1xuLy8gICAvLyBmbGV4LWRpcmVjdGlvbjogcm93O1xuLy8gICAvLyAgZmxleC1ncm93OiAxO1xuXG4vLyB9XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 45701:
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorisedSideNavTogglerComponent: () => (/* binding */ AuthorisedSideNavTogglerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/authorised-side-nav.service */ 35736);


class AuthorisedSideNavTogglerComponent {
  constructor(sideNavService) {
    this.sideNavService = sideNavService;
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function AuthorisedSideNavTogglerComponent_Factory(t) {
    return new (t || AuthorisedSideNavTogglerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__.AuthorisedSideNavService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AuthorisedSideNavTogglerComponent,
    selectors: [["app-authorised-side-nav-toggler"]],
    decls: 2,
    vars: 0,
    consts: [["type", "button", 1, "navbar-toggler", 3, "click"], [1, "navbar-toggler-icon"]],
    template: function AuthorisedSideNavTogglerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AuthorisedSideNavTogglerComponent_Template_button_click_0_listener() {
          return ctx.sideNavService.toggleSideNav();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 67381:
/*!****************************************************************************************!*\
  !*** ./src/app/layout/authorised/authorised-side-nav/authorised-side-nav.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorisedSideNavComponent: () => (/* binding */ AuthorisedSideNavComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/authorised-side-nav.service */ 35736);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);




function AuthorisedSideNavComponent_a_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function AuthorisedSideNavComponent_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Clinics");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function AuthorisedSideNavComponent_a_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "My Clinic");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    "hidden": a0
  };
};
class AuthorisedSideNavComponent {
  constructor(sideNavService) {
    this.sideNavService = sideNavService;
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function AuthorisedSideNavComponent_Factory(t) {
    return new (t || AuthorisedSideNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__.AuthorisedSideNavService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AuthorisedSideNavComponent,
    selectors: [["app-authorised-side-nav"]],
    decls: 8,
    vars: 6,
    consts: [["id", "sidebar", 1, "navbar-dark", "bg-dark", 3, "ngClass"], [1, "navbar-nav"], [1, "nav-item"], ["class", "nav-link", "routerLink", "/messages", 4, "ngIf"], ["class", "nav-link", "routerLink", "/clinics", 4, "ngIf"], ["routerLink", "/messages", 1, "nav-link"], ["routerLink", "/clinics", 1, "nav-link"]],
    template: function AuthorisedSideNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav", 0)(1, "ul", 1)(2, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, AuthorisedSideNavComponent_a_3_Template, 2, 0, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, AuthorisedSideNavComponent_a_5_Template, 2, 0, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, AuthorisedSideNavComponent_a_7_Template, 2, 0, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c0, ctx.sideNavService.hideSideNav));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sideNavService.isQueueAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sideNavService.isQueueAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sideNavService.isEntityAdmin);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
    styles: ["[_nghost-%COMP%] {\n  background: #343a40;\n}\n\n#sidebar[_ngcontent-%COMP%] {\n  min-width: 200px;\n  max-width: 200px;\n  min-height: 100vh;\n  color: #fff;\n  transition: all 0.3s;\n  font-weight: 300;\n  font-size: 1rem;\n  line-height: 1.5;\n}\n\n#sidebar.hidden[_ngcontent-%COMP%] {\n  margin-left: -200px;\n}\n\na[data-toggle=collapse][_ngcontent-%COMP%] {\n  position: relative;\n}\n\n@media (max-width: 575px) {\n  #sidebar[_ngcontent-%COMP%] {\n    margin-left: -200px;\n  }\n  #sidebar.hidden[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\na[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:focus {\n  color: inherit;\n}\n\n#sidebar[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 15px;\n  display: block;\n  width: 100%;\n}\n#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\nhr[_ngcontent-%COMP%] {\n  border-top: 1px solid #fff;\n  margin-top: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2F1dGhvcmlzZWQvYXV0aG9yaXNlZC1zaWRlLW5hdi9hdXRob3Jpc2VkLXNpZGUtbmF2LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsbUJBQUE7RUFDRjtFQUVBO0lBQ0UsY0FBQTtFQUFGO0FBQ0Y7QUFHQTs7O0VBR0UsY0FBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBREY7QUFHRTtFQUNFLDBDQUFBO0FBREo7O0FBS0E7RUFDRSwwQkFBQTtFQUNBLGFBQUE7QUFGRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgYmFja2dyb3VuZDogIzM0M2E0MDtcbn1cblxuI3NpZGViYXIge1xuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICBmb250LXdlaWdodDogMzAwO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbiNzaWRlYmFyLmhpZGRlbiB7XG4gIG1hcmdpbi1sZWZ0OiAtMjAwcHg7XG59XG5cbmFbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NXB4KSB7XG4gICNzaWRlYmFyIHtcbiAgICBtYXJnaW4tbGVmdDogLTIwMHB4O1xuICB9XG5cbiAgI3NpZGViYXIuaGlkZGVuIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxufVxuXG5hLFxuYTpob3ZlcixcbmE6Zm9jdXMge1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuI3NpZGViYXIgLnNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuI3NpZGViYXIgdWwgbGkgYSB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gIH1cbn1cblxuaHIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZjtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuXG4vLyAjc2lkZWJhciB7XG4vLyAgIHBhZGRpbmc6IDI1cHg7XG4vLyAgIG1pbi13aWR0aDogMHB4O1xuLy8gICBtYXgtd2lkdGg6IDIwMHB4O1xuLy8gICBtaW4taGVpZ2h0OiAxMDAlO1xuLy8gICBmbGV4LWdyb3c6IDE7XG4vLyAgIGZsZXgtc2hyaW5rOiAwO1xuLy8gICBmbGV4LWJhc2lzOiBhdXRvO1xuXG4vLyAgIGhlaWdodDogMTAwJTtcbi8vIH1cblxuLy8gI3NpZGViYXIuaGlkZGVuIHtcbi8vICAgZmxleC1iYXNpczogMDtcbi8vICAgbWluLXdpZHRoOiAwO1xuLy8gICBtYXgtd2lkdGg6IDA7XG4vLyAgIHBhZGRpbmc6IDBweDtcblxuLy8gfVxuXG4vLyAvLyAjc2lkZWJhci5pcy12aXNpYmxlfi5jb250ZW50IHtcbi8vIC8vICAgZmxleC1iYXNpczogMDtcbi8vIC8vIH1cblxuLy8gYVtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdIHtcbi8vICAgcG9zaXRpb246IHJlbGF0aXZlO1xuLy8gfVxuXG4vLyAvKiBBbmltYXRpb24gKi9cbi8vIC8vIC5jb250ZW50IHtcbi8vIC8vICAgdHJhbnNpdGlvbjogZmxleC1iYXNpcyAuMXMgY3ViaWMtYmV6aWVyKC40NjUsIC4xODMsIC4xNTMsIC45NDYpO1xuLy8gLy8gICB3aWxsLWNoYW5nZTogZmxleC1iYXNpcztcbi8vIC8vIH1cblxuLy8gLy8gI3NpZGViYXIuaXMtdmlzaWJsZX4jY29udGVudCB7XG4vLyAvLyAgIHRyYW5zaXRpb246IGZsZXgtYmFzaXMgLjNzIGN1YmljLWJlemllciguNDY1LCAuMTgzLCAuMTUzLCAuOTQ2KTtcbi8vIC8vIH1cblxuXG4vLyAvLyAjc2lkZWJhci1jb250ZW50IHtcbi8vIC8vICAgZGlzcGxheTogYmxvY2s7XG4vLyAvLyAgIHdpZHRoOiAzMDBweDtcbi8vIC8vICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbi8vIC8vICAgaGVpZ2h0OiAxMDAlO1xuLy8gLy8gICBtYXJnaW46IDA7XG4vLyAvLyAgIHBhZGRpbmc6IDIwcHg7XG4vLyAvLyAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjY2M7XG4vLyAvLyB9XG5cbi8vIC8vICNjb250ZW50IHtcbi8vIC8vICAgcGFkZGluZzogMjBweDtcbi8vIC8vIH1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 86087:
/*!**************************************************************************************!*\
  !*** ./src/app/layout/authorised/authorised-top-nav/authorised-top-nav.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorisedTopNavComponent: () => (/* binding */ AuthorisedTopNavComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/authorised-side-nav.service */ 35736);
/* harmony import */ var _authorised_side_nav_toggler_authorised_side_nav_toggler_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../authorised-side-nav-toggler/authorised-side-nav-toggler.component */ 45701);



class AuthorisedTopNavComponent {
  constructor(sideNavService) {
    this.sideNavService = sideNavService;
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function AuthorisedTopNavComponent_Factory(t) {
    return new (t || AuthorisedTopNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_authorised_side_nav_service__WEBPACK_IMPORTED_MODULE_0__.AuthorisedSideNavService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AuthorisedTopNavComponent,
    selectors: [["app-authorised-top-nav"]],
    decls: 6,
    vars: 1,
    consts: [[1, "navbar", "navbar-dark", "bg-dark"], [1, "text-white"], [3, "click"]],
    template: function AuthorisedTopNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-authorised-side-nav-toggler");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h5", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AuthorisedTopNavComponent_Template_button_click_4_listener() {
          return ctx.sideNavService.logout();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Logout");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.sideNavService.user == null ? null : ctx.sideNavService.user.USEREMAIL, " ");
      }
    },
    dependencies: [_authorised_side_nav_toggler_authorised_side_nav_toggler_component__WEBPACK_IMPORTED_MODULE_1__.AuthorisedSideNavTogglerComponent],
    styles: ["h3[_ngcontent-%COMP%] {\n  color: orange;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2F1dGhvcmlzZWQvYXV0aG9yaXNlZC10b3AtbmF2L2F1dGhvcmlzZWQtdG9wLW5hdi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImgzIHtcbiAgY29sb3I6IG9yYW5nZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 35736:
/*!***************************************************************************!*\
  !*** ./src/app/layout/authorised/services/authorised-side-nav.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorisedSideNavService: () => (/* binding */ AuthorisedSideNavService)
/* harmony export */ });
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../app/_models */ 84939);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../app/_services */ 57870);



class AuthorisedSideNavService {
  toggleSideNav() {
    this.hideSideNav = !this.hideSideNav;
  }
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
    this.hideSideNav = true;
    this.user = undefined;
    //    this.user = this.authenticationService.userValue;
    this.authenticationService.user.subscribe(x => {
      this.user = x;
      localStorage.removeItem("oEntity");
      localStorage.removeItem("oService");
    });
  }
  get isQueueAdmin() {
    return this.user && this.user.TYPE === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.QueueAdmin;
  }
  get isEntityAdmin() {
    return this.user && this.user.TYPE === _app_models__WEBPACK_IMPORTED_MODULE_0__.Role.EntityAdmin;
  }
  logout() {
    this.authenticationService.logout();
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function AuthorisedSideNavService_Factory(t) {
    return new (t || AuthorisedSideNavService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_app_services__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AuthorisedSideNavService,
    factory: AuthorisedSideNavService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 96813:
/*!*********************************************************************!*\
  !*** ./src/app/layout/guest/guest-footer/guest-footer.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestFooterComponent: () => (/* binding */ GuestFooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class GuestFooterComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function GuestFooterComponent_Factory(t) {
    return new (t || GuestFooterComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: GuestFooterComponent,
    selectors: [["app-guest-footer"]],
    decls: 5,
    vars: 0,
    consts: [[1, "footer", "bg-dark", "pt-2", "pb-2"], [1, "container", "text-center"], [1, "text-white"]],
    template: function GuestFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0)(1, "div", 1)(2, "span")(3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "copyright ezqueue");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 22852:
/*!*********************************************************************!*\
  !*** ./src/app/layout/guest/guest-layout/guest-layout.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestLayoutComponent: () => (/* binding */ GuestLayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _page_content_page_content_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../page-content/page-content.component */ 15287);
/* harmony import */ var _guest_top_nav_guest_top_nav_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../guest-top-nav/guest-top-nav.component */ 58006);
/* harmony import */ var _guest_footer_guest_footer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../guest-footer/guest-footer.component */ 96813);




class GuestLayoutComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function GuestLayoutComponent_Factory(t) {
    return new (t || GuestLayoutComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: GuestLayoutComponent,
    selectors: [["app-guest-layout"]],
    decls: 4,
    vars: 0,
    consts: [[1, "wrapper"]],
    template: function GuestLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-guest-top-nav")(2, "app-page-content")(3, "app-guest-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_page_content_page_content_component__WEBPACK_IMPORTED_MODULE_0__.PageContentComponent, _guest_top_nav_guest_top_nav_component__WEBPACK_IMPORTED_MODULE_1__.GuestTopNavComponent, _guest_footer_guest_footer_component__WEBPACK_IMPORTED_MODULE_2__.GuestFooterComponent],
    styles: [".wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: space-between;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2d1ZXN0L2d1ZXN0LWxheW91dC9ndWVzdC1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi53cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 58006:
/*!***********************************************************************!*\
  !*** ./src/app/layout/guest/guest-top-nav/guest-top-nav.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestTopNavComponent: () => (/* binding */ GuestTopNavComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);


class GuestTopNavComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function GuestTopNavComponent_Factory(t) {
    return new (t || GuestTopNavComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: GuestTopNavComponent,
    selectors: [["app-guest-top-nav"]],
    decls: 53,
    vars: 0,
    consts: [[1, "navbar", "navbar-expand-sm", "navbar-dark", "bg-dark"], ["href", "#", 1, "text-white", "nav-link"], [1, "sr-only"], ["type", "button", "data-toggle", "modal", "data-target", "#myModal", 1, "btn", "btn-primary"], ["id", "myModal", 1, "modal", "fade", "left"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "pull-left", "no-margin"], ["type", "button", "data-dismiss", "modal", "title", "Close", 1, "close"], [1, "glyphicon", "glyphicon-remove"], [1, "modal-body"], ["role", "form", "method", "post", "action", "form_to_email_script.php ", 1, "form-horizontal"], [1, "required"], [1, "form-group"], ["for", "name", 1, "col-sm-3", "control-label"], [1, "col-sm-9"], ["type", "text", "id", "name", "name", "name", "placeholder", "First & Last", "required", "", 1, "form-control"], ["for", "email", 1, "col-sm-3", "control-label"], ["type", "email", "id", "email", "name", "email", "placeholder", "you@domain.com", "required", "", 1, "form-control"], ["for", "message", 1, "col-sm-3", "control-label"], ["name", "message", "rows", "4", "required", "", "id", "message", "placeholder", "Comments", 1, "form-control"], [1, "col-sm-offset-3", "col-sm-6", "col-sm-offset-3"], ["type", "submit", "id", "submit", "name", "submit", 1, "btn-lg", "btn-primary"], [1, "modal-footer"], [1, "col-xs-10", "pull-left", "text-left", "text-muted"], ["type", "button", "data-dismiss", "modal", 1, "btn-sm", "close"]],
    template: function GuestTopNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0)(1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Home ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "(current)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Contact Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "CONTACT US");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4)(10, "div", 5)(11, "div", 6)(12, "div", 7)(13, "h3", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Contact Form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11)(18, "form", 12)(19, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "* Required");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 14)(22, "label", 15)(23, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Name:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 14)(29, "label", 18)(30, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14)(36, "label", 20)(37, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Message:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "textarea", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 14)(43, "div", 22)(44, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "SUBMIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 24)(47, "div", 25)(48, "small")(49, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Privacy Policy: We will use your contact for marketing purposes.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgForm],
    styles: [".required[_ngcontent-%COMP%] {\n  color: red;\n  font-weight: bold;\n}\n\n.human[_ngcontent-%COMP%] {\n  margin: 0 0 0 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L2d1ZXN0L2d1ZXN0LXRvcC1uYXYvZ3Vlc3QtdG9wLW5hdi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5yZXF1aXJlZCB7XG4gIGNvbG9yOiByZWQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkXG59XG5cbi5odW1hbiB7XG4gIG1hcmdpbjogMCAwIDAgMTJweFxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 15287:
/*!***************************************************************!*\
  !*** ./src/app/layout/page-content/page-content.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageContentComponent: () => (/* binding */ PageContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);


class PageContentComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function PageContentComponent_Factory(t) {
    return new (t || PageContentComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: PageContentComponent,
    selectors: [["app-page-content"]],
    decls: 1,
    vars: 0,
    template: function PageContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    styles: [".full-width[_nghost-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0L3BhZ2UtY29udGVudC9wYWdlLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxXQUFBO0FBQUoiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICYuZnVsbC13aWR0aCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 34030:
/*!******************************************************************!*\
  !*** ./src/app/pages/business-hours/business-hours.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BusinessHoursComponent: () => (/* binding */ BusinessHoursComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-confirmation-popover */ 71479);







const _c0 = function () {
  return ["fas", "plus"];
};
function BusinessHoursComponent_form_14_fa_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_3_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r17.addInput(ctx_r17.getControlArray(ctx_r17.oInputForm, "MO")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
const _c1 = function () {
  return ["fas", "times"];
};
function BusinessHoursComponent_form_14_div_8_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_8_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23);
      const i_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.delInput(ctx_r22.getControlArray(ctx_r22.oInputForm, "MO"), i_r20));
    })("cancel", function BusinessHoursComponent_form_14_div_8_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r25.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r21.sDeleteTitle)("popoverMessage", ctx_r21.sDeleteMessage)("isDisabled", "MO" == ctx_r21.sToday);
  }
}
function BusinessHoursComponent_form_14_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_8_fa_icon_4_Template, 1, 5, "fa-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r20 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "MO" != ctx_r2.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "MO" == ctx_r2.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "MO" == ctx_r2.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_11_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r26.addInput(ctx_r26.getControlArray(ctx_r26.oInputForm, "TU")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_16_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_16_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r32);
      const i_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r31.delInput(ctx_r31.getControlArray(ctx_r31.oInputForm, "TU"), i_r29));
    })("cancel", function BusinessHoursComponent_form_14_div_16_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r32);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r34.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r30.sDeleteTitle)("popoverMessage", ctx_r30.sDeleteMessage)("isDisabled", "TU" == ctx_r30.sToday);
  }
}
function BusinessHoursComponent_form_14_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_16_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r29 = ctx.index;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "TU" != ctx_r4.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "TU" == ctx_r4.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "TU" == ctx_r4.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_19_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r36);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r35.addInput(ctx_r35.getControlArray(ctx_r35.oInputForm, "WE")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_24_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_24_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r41);
      const i_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r40.delInput(ctx_r40.getControlArray(ctx_r40.oInputForm, "WE"), i_r38));
    })("cancel", function BusinessHoursComponent_form_14_div_24_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r41);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r43.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r39.sDeleteTitle)("popoverMessage", ctx_r39.sDeleteMessage)("isDisabled", "WE" == ctx_r39.sToday);
  }
}
function BusinessHoursComponent_form_14_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_24_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r38 = ctx.index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "WE" != ctx_r6.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "WE" == ctx_r6.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "WE" == ctx_r6.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_27_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r45);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r44.addInput(ctx_r44.getControlArray(ctx_r44.oInputForm, "TH")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_32_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_32_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r50);
      const i_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r49.delInput(ctx_r49.getControlArray(ctx_r49.oInputForm, "TH"), i_r47));
    })("cancel", function BusinessHoursComponent_form_14_div_32_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r50);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r52.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r48.sDeleteTitle)("popoverMessage", ctx_r48.sDeleteMessage)("isDisabled", "TH" == ctx_r48.sToday);
  }
}
function BusinessHoursComponent_form_14_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_32_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r47 = ctx.index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "TH" != ctx_r8.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "TH" == ctx_r8.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "TH" == ctx_r8.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_35_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r53.addInput(ctx_r53.getControlArray(ctx_r53.oInputForm, "FR")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_40_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_40_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r59);
      const i_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r58.delInput(ctx_r58.getControlArray(ctx_r58.oInputForm, "FR"), i_r56));
    })("cancel", function BusinessHoursComponent_form_14_div_40_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r59);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r61.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r57.sDeleteTitle)("popoverMessage", ctx_r57.sDeleteMessage)("isDisabled", "FR" == ctx_r57.sToday);
  }
}
function BusinessHoursComponent_form_14_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_40_fa_icon_4_Template, 1, 5, "fa-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r56 = ctx.index;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "FR" != ctx_r10.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_43_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r63);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r62.addInput(ctx_r62.getControlArray(ctx_r62.oInputForm, "SA")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_48_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_48_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r68);
      const i_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r67.delInput(ctx_r67.getControlArray(ctx_r67.oInputForm, "SA"), i_r65));
    })("cancel", function BusinessHoursComponent_form_14_div_48_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r68);
      const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r70.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r66.sDeleteTitle)("popoverMessage", ctx_r66.sDeleteMessage)("isDisabled", "SA" == ctx_r66.sToday);
  }
}
function BusinessHoursComponent_form_14_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_48_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r65 = ctx.index;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "SA" != ctx_r12.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "SA" == ctx_r12.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "SA" == ctx_r12.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_51_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r71.addInput(ctx_r71.getControlArray(ctx_r71.oInputForm, "SU")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_56_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_56_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r77);
      const i_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r76.delInput(ctx_r76.getControlArray(ctx_r76.oInputForm, "SU"), i_r74));
    })("cancel", function BusinessHoursComponent_form_14_div_56_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r77);
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r79.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r75.sDeleteTitle)("popoverMessage", ctx_r75.sDeleteMessage)("isDisabled", "SU" == ctx_r75.sToday);
  }
}
function BusinessHoursComponent_form_14_div_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_56_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r74 = ctx.index;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "SU" != ctx_r14.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "SU" == ctx_r14.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("readonly", "SU" == ctx_r14.sToday);
  }
}
function BusinessHoursComponent_form_14_fa_icon_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_fa_icon_59_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r81);
      const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r80.addInput(ctx_r80.getControlArray(ctx_r80.oInputForm, "PH")));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
  }
}
function BusinessHoursComponent_form_14_div_64_fa_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r86 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "fa-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("confirm", function BusinessHoursComponent_form_14_div_64_fa_icon_4_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r86);
      const i_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().index;
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r85.delInput(ctx_r85.getControlArray(ctx_r85.oInputForm, "PH"), i_r83));
    })("cancel", function BusinessHoursComponent_form_14_div_64_fa_icon_4_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r86);
      const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r88.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c1))("popoverTitle", ctx_r84.sDeleteTitle)("popoverMessage", ctx_r84.sDeleteMessage)("isDisabled", "PH" == ctx_r84.sToday);
  }
}
function BusinessHoursComponent_form_14_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "tr", 30)(3, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BusinessHoursComponent_form_14_div_64_fa_icon_4_Template, 1, 5, "fa-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r83 = ctx.index;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupName", i_r83);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "PH" != ctx_r16.sToday);
  }
}
function BusinessHoursComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BusinessHoursComponent_form_14_fa_icon_3_Template, 1, 2, "fa-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Monday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, BusinessHoursComponent_form_14_div_8_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, BusinessHoursComponent_form_14_fa_icon_11_Template, 1, 2, "fa-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Tuesday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, BusinessHoursComponent_form_14_div_16_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, BusinessHoursComponent_form_14_fa_icon_19_Template, 1, 2, "fa-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Wednessday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, BusinessHoursComponent_form_14_div_24_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, BusinessHoursComponent_form_14_fa_icon_27_Template, 1, 2, "fa-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Thursday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, BusinessHoursComponent_form_14_div_32_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, BusinessHoursComponent_form_14_fa_icon_35_Template, 1, 2, "fa-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Friday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](38, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, BusinessHoursComponent_form_14_div_40_Template, 9, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](41, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](43, BusinessHoursComponent_form_14_fa_icon_43_Template, 1, 2, "fa-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Saturday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](46, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](48, BusinessHoursComponent_form_14_div_48_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](51, BusinessHoursComponent_form_14_fa_icon_51_Template, 1, 2, "fa-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Sunday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](54, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](56, BusinessHoursComponent_form_14_div_56_Template, 9, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](57, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](59, BusinessHoursComponent_form_14_fa_icon_59_Template, 1, 2, "fa-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "PH");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](62, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](64, BusinessHoursComponent_form_14_div_64_Template, 9, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "div", 27)(66, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_form_14_Template_input_click_66_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r90);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r89.onSubmit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.oInputForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "MO" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "MO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "TU" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "TU"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "WE" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "WE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "TH" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "TH"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "FR" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "FR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "SA" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "SA"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "SU" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "SU"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", "PH" != ctx_r0.sToday);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getControls(ctx_r0.oInputForm, "PH"));
  }
}
const _c2 = function () {
  return ["fas", "arrow-left"];
};
// import { JSONFormComponent } from '../jsonform/jsonform.component';
//import { JsonSchemaFormComponent } from 'angular6-json-schema-form';
class BusinessHoursComponent {
  onBack() {
    this.oLocation.back();
  }
  // //declaration
  // time1: NgbTimeStruct;
  // time2: NgbTimeStruct;
  // ngOnInit() {
  //   //get your start and end time and assign it to below 
  //   this.time1 = {hour: 13, minute: 30, second: 0};
  //   this.time2 = {hour: 16, minute: 15, second: 0};
  // }
  ngOnInit() {
    //    super.showSpinner();
    // super.loadJSONForm(this.formObject);
    this.bLoaded = true;
    //    super.hideSpinner();
  }
  //https://stackoverflow.com/questions/43205237/how-to-build-nested-array-by-using-angular2-reactive-forms
  //https://plnkr.co/edit/nSHvlPfQXJZhucNrezz9?p=preview
  constructor(oLocation, oAPIService, _location, oBuilder, router) {
    //    super(oAPIService, dialog);
    this.oLocation = oLocation;
    this.oAPIService = oAPIService;
    this._location = _location;
    this.oBuilder = oBuilder;
    this.router = router;
    this.sDeleteTitle = 'Confirm Delete';
    this.sDeleteMessage = 'Delete Working Hours';
    this.confirmClicked = false;
    this.cancelClicked = false;
    this.sTitle = "Working Hours";
    this.bLoaded = false;
    this.inputArray = [];
    this.sToday = null;
    this.sWOD = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'PH'];
    //    this.oItem = JSON.parse(localStorage.getItem("oEntity"));
    // this.oService = JSON.parse(localStorage.getItem("oService")|| '');
    // this.oEntity = JSON.parse(localStorage.getItem("oEntity")|| '');
    this.oService = oAPIService.getJSONFromLocalStorage('oService');
    this.oEntity = oAPIService.getJSONFromLocalStorage('oEntity');
    if (this.oEntity === undefined || this.oEntity == null || this.oService === undefined || this.oService == null) {
      this.onBack();
      return;
    }
    //    this.formObject['data'] = oT;
    this.loadWorkingHours();
    // localStorage.setItem("oService", oT);
    // if (oT != null) {
    //   this.oItem = oT;
    //   //      console.log(this.oItem);
    //   // this.formObject['data'] = oT;
    //   this.loadWorkingHours();
    //   // this.sTitle = "Modify Entity";
    // }
    this.bLoaded = true;
  }
  loadWorkingHours() {
    this.oAPIService.send2ServerP("dow_today/" + this.oEntity.ID).then(data => {
      if (data['_error']) console.error(data);else this.sToday = this.sWOD[parseInt(data.result[0]['TODAY'])];
    });
    let oFG = this.oBuilder.group({
      SU: this.oBuilder.array([]),
      MO: this.oBuilder.array([]),
      TU: this.oBuilder.array([]),
      WE: this.oBuilder.array([]),
      TH: this.oBuilder.array([]),
      FR: this.oBuilder.array([]),
      SA: this.oBuilder.array([]),
      PH: this.oBuilder.array([])
    });
    this.oInputForm = oFG;
    this.oAPIService.send2ServerP("services/" + this.oService.ID + "/wh/fetch").then(data => {
      if (data['_error']) console.error(data);else {
        this.oWorkingHours = data.result;
        //      console.log(this.oWorkingHours);
        this.populateFormData();
      }
    });
  }
  // this.form = this.fb.group({
  //   addValue: this.fb.control(null),
  //   values: this.fb.array(['test2', 'test3'])
  // }, { validator: this.validatorService.duplicate2 });
  // public duplicate2(control: AbstractControl): ValidationErrors | null {
  //   const newValue = control.get('addValue') ? control.get('addValue').value : null;
  //   const values = control.get('values') ? control.get('values').value : [];
  //   console.log("1 " + newValue);
  //   console.log(values);
  //   for (let i = 0, j = values.length; i < j; i++ ) {
  //             if (newValue === values[i]) {
  //                 return { 'duplicate2': true };
  //             }
  //         }
  //         return null;          
  // }
  getControls(frmGrp, key) {
    return frmGrp.controls[key].controls;
  }
  getControlArray(frmGrp, key) {
    return frmGrp.controls[key];
  }
  populateFormData() {
    //    console.log("Total Defined Working Hours");
    //    console.log(this.oWorkingHours);
    this.oWorkingHours?.forEach(o => {
      let s = this.sWOD[o.DAYOFWEEK];
      const arrayControl = this.oInputForm.controls[s];
      let oFC = this.setFields(o);
      //      console.log("Pushing: " + s + " " + oFC);
      arrayControl.push(oFC);
    });
  }
  setFields(oData) {
    return this.oBuilder.group({
      OPEN_TIME: [oData.TIME_OPEN],
      CLOSE_TIME: [oData.TIME_CLOSE],
      MAXQN: [oData.MAXQN],
      EntityID: this.oEntity.ID // Required ?
    });
  }

  initFields() {
    return this.oBuilder.group({
      OPEN_TIME: ['0900'],
      CLOSE_TIME: ['1200'],
      MAXQN: ['1000'],
      EntityID: this.oEntity.ID // Required ?
    });
  }

  addInput(day) {
    day.push(this.initFields());
  }
  delInput(day, index) {
    day.removeAt(index);
  }
  onSubmit() {
    console.log(this.oInputForm?.value);
    var o = this.oInputForm?.value;
    this.oAPIService.send2ServerP("services/" + this.oEntity.ID + "/" + this.oService.ID + "/wh/delete", true, this.oService).then(data => {
      this.insert(o.SU, 0);
      this.insert(o.MO, 1);
      this.insert(o.TU, 2);
      this.insert(o.WE, 3);
      this.insert(o.TH, 4);
      this.insert(o.FR, 5);
      this.insert(o.SA, 6);
      this.insert(o.PH, 7);
      this.ngOnInit();
    });
    // let alert = this.alertCtrl.create({
    //   title: 'Saved',
    //   subTitle: 'Successfully',
    //   buttons: ['Dismiss']
    // });
    // alert.present();
  }

  insert(oDay, iDOW) {
    for (let i = 0; i < oDay.length; i++) {
      let oItem = oDay[i];
      oItem['DOW'] = iDOW;
      console.log(iDOW, oDay);
      if (this.sWOD[iDOW] != this.sToday) this.oAPIService.send2ServerP("services/" + this.oService.ID + "/wh/add", true, oItem).then(data => {});
      // if (i == oDay.length - 1)
      //   this.onBack();
    }
  }
  static #_ = this.ɵfac = function BusinessHoursComponent_Factory(t) {
    return new (t || BusinessHoursComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_0__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: BusinessHoursComponent,
    selectors: [["app-business-hours"]],
    inputs: {
      inputArray: "inputArray"
    },
    decls: 15,
    vars: 6,
    consts: [[1, "full-screen"], ["src", "https://www.starpng.com/public/uploads/preview/thin-crayon-divider-line-png-51575739708kixuhrawiv.png", "id", "dummy-image"], [1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "scrolling-wrapper"], ["role", "form", 3, "formGroup", 4, "ngIf"], ["role", "form", 3, "formGroup"], [1, "ksd-week-day"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'MO' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "MO"], ["no-padding", "", 4, "ngFor", "ngForOf"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'TU' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "TU"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'WE' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "WE"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'TH' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "TH"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'FR' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "FR"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'SA' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "SA"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'SU' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "SU"], ["class", "btn btn-primary btn-sm mr-1", "disabled", "'PH' == sToday", "toggle", "tooltip", "title", "more working hours!", 3, "icon", "click", 4, "ngIf"], ["no-padding", "", "formArrayName", "PH"], [2, "padding-top", "30px"], ["type", "button", "value", "Save", 1, "btn", "btn-info", 3, "click"], ["disabled", "'MO' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["no-padding", ""], ["no-padding", "", 3, "formGroupName"], ["col-2", ""], ["class", "btn btn-danger btn-sm mr-1", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Working Hours!", 3, "icon", "popoverTitle", "popoverMessage", "isDisabled", "confirm", "cancel", 4, "ngIf"], ["type", "number", "placeholder", "0900", "formControlName", "OPEN_TIME", 3, "readonly"], ["type", "number", "placeholder", "1200", "formControlName", "CLOSE_TIME", 3, "readonly"], ["mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Working Hours!", 1, "btn", "btn-danger", "btn-sm", "mr-1", 3, "icon", "popoverTitle", "popoverMessage", "isDisabled", "confirm", "cancel"], ["disabled", "'TU' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["class", "btn btn-danger  btn-sm mr-1", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Working Hours!", 3, "icon", "popoverTitle", "popoverMessage", "isDisabled", "confirm", "cancel", 4, "ngIf"], ["disabled", "'WE' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["disabled", "'TH' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["disabled", "'FR' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["class", "btn btn-danger btn-sm mr-1", "readonly", "'FR' == sToday", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Working Hours!", 3, "icon", "popoverTitle", "popoverMessage", "isDisabled", "confirm", "cancel", 4, "ngIf"], ["type", "number", "readonly", "'FR' == sToday", "placeholder", "0900", "formControlName", "OPEN_TIME"], ["type", "number", "readonly", "'FR' == sToday", "placeholder", "1200", "formControlName", "CLOSE_TIME"], ["readonly", "'FR' == sToday", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Working Hours!", 1, "btn", "btn-danger", "btn-sm", "mr-1", 3, "icon", "popoverTitle", "popoverMessage", "isDisabled", "confirm", "cancel"], ["disabled", "'SA' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["disabled", "'SU' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["disabled", "'PH' == sToday", "toggle", "tooltip", "title", "more working hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["type", "number", "placeholder", "0900", "formControlName", "OPEN_TIME"], ["type", "number", "placeholder", "1200", "formControlName", "CLOSE_TIME"]],
    template: function BusinessHoursComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5")(6, "fa-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BusinessHoursComponent_Template_fa_icon_click_6_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 6)(13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, BusinessHoursComponent_form_14_Template, 67, 17, "form", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.oEntity.NAME);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.oEntity.ADDRESS);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.bLoaded);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormArrayName, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FaIconComponent, angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_6__.ConfirmationPopoverDirective],
    styles: [".ksd-week-day[_ngcontent-%COMP%] {\n  padding: 0px;\n  padding-top: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYnVzaW5lc3MtaG91cnMvYnVzaW5lc3MtaG91cnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5rc2Qtd2Vlay1kYXkge1xuICBwYWRkaW5nOiAwcHg7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 21938:
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 26575);


const _c0 = function (a0, a1) {
  return {
    "expanded": a0,
    "collapsed": a1
  };
};
class DashboardComponent {
  constructor() {
    this.bActive = false;
  }
  ngOnInit() {}
  showDetails() {
    this.bActive = !this.bActive;
  }
  static #_ = this.ɵfac = function DashboardComponent_Factory(t) {
    return new (t || DashboardComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: DashboardComponent,
    selectors: [["app-dashboard"]],
    decls: 111,
    vars: 4,
    consts: [[1, "container-fluid"], [1, "mb-5", "mt-4"], [1, "wrap"], [1, "card"], [1, "card-header"], [1, "card-body"], [1, "task"], [1, "abstract", 3, "click"], [1, "details", 3, "ngClass"], [1, "details__inner"], [1, "date"], ["href", "#", 1, "btn", "btn-primary"], [1, "dashboard-cards"], [1, "card-title"], [1, "card-text"], [1, "card", 2, "width", "18rem"], [1, "card-subtitle", "mb-2", "text-muted"], ["href", "#", 1, "card-link"]],
    template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Dashboard page");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div")(4, "div", 2)(5, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Hover card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3)(8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Dr. Madhav Clinick ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5)(11, "div", 6)(12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DashboardComponent_Template_div_click_12_listener() {
          return ctx.showDetails();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "General Practice");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 8)(16, "div", 9)(17, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Services");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Dental RTC");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Dental Implant");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 10)(24, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "20");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "APR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Go somewhere");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 12)(31, "div", 3)(32, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Featured ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 5)(35, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Special title treatment");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "With supporting text below as a natural lead-in to additional content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Go somewhere");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 3)(42, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Featured ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 5)(45, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Special title treatment");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "With supporting text below as a natural lead-in to additional content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Go somewhere");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 15)(52, "div", 5)(53, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Card title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Card subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Some quick example text to build on the card title and make up the bulk of the card's content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Card link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Another link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 15)(64, "div", 5)(65, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Card title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Card subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Some quick example text to build on the card title and make up the bulk of the card's content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Card link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Another link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 15)(76, "div", 5)(77, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "Card title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "Card subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Some quick example text to build on the card title and make up the bulk of the card's content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Card link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Another link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 15)(88, "div", 5)(89, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "Card title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "Card subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Some quick example text to build on the card title and make up the bulk of the card's content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "Card link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "Another link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 15)(100, "div", 5)(101, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "Card title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, "Card subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, "Some quick example text to build on the card title and make up the bulk of the card's content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "Card link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, "Another link");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c0, ctx.bActive == true, ctx.bActive == false));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass],
    styles: [".dashboard-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  margin: 0 -15px;\n}\n.dashboard-cards[_ngcontent-%COMP%]    > .card[_ngcontent-%COMP%] {\n  margin: 15px;\n}\n\nbody[_ngcontent-%COMP%] {\n  width: 30%;\n  min-width: 300px;\n  height: 80vh;\n  margin: 20vh auto 0;\n  background: linear-gradient(to left, #FF512F, #DD2476);\n  \n\n  color: #282828;\n}\n\nh1[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.task[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  perspective: 800px;\n  transform-style: preserve-3d;\n}\n\n.abstract[_ngcontent-%COMP%], .details[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 15px 30px;\n  position: relative;\n  background: white;\n}\n\n.abstract[_ngcontent-%COMP%] {\n  transition: 0.3s ease all;\n}\n\n.details[_ngcontent-%COMP%] {\n  max-height: 0;\n  padding: 0;\n  overflow: hidden;\n  visibility: hidden;\n  transform: rotateX(-180deg);\n  transform-origin: top center;\n  backface-visibility: hidden;\n}\n.details[_ngcontent-%COMP%]:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 10%;\n  right: 10%;\n  height: 1px;\n  background: grey;\n}\n.details[_ngcontent-%COMP%]   .task[_ngcontent-%COMP%]   .expanded[_ngcontent-%COMP%] {\n  max-height: none;\n  overflow: visible;\n  visibility: visible;\n  transform: rotateX(0deg);\n}\n\n.abstract[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   .expanded[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n\n.expanded[_ngcontent-%COMP%] {\n  max-height: none;\n  overflow: visible;\n  visibility: visible;\n  transform: rotateX(0deg);\n}\n\n.details__inner[_ngcontent-%COMP%] {\n  padding: 15px 30px;\n}\n\n.date[_ngcontent-%COMP%] {\n  width: 48px;\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n  background-color: blue;\n  text-shadow: 1px 1px rgba(0, 0, 0, 0.7);\n  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.date[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: white;\n  line-height: 1;\n}\n.date[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-size: 20px;\n  font-weight: 900;\n}\n.date[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 14px;\n  font-weight: 400;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7QUFDRjtBQUNFO0VBQ0UsWUFBQTtBQUNKOztBQUlBO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0RBQUE7RUFDQSxxRUFBQTtFQUNBLGNBQUE7QUFERjs7QUFJQTtFQUNFLFlBQUE7QUFERjs7QUFRQTtFQUNFLGtCQUFBO0VBRUEsZ0JBQUE7RUFDQSxlQUFBO0VBRUEsa0JBQUE7RUFDQSw0QkFBQTtBQVBGOztBQVVBOztFQUdFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBSks7QUFKUDs7QUFlQTtFQUVFLHlCQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsYUFBQTtFQUNBLFVBQUE7RUFFQSxnQkFBQTtFQUNBLGtCQUFBO0VBRUEsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0FBZkY7QUFrQkU7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBaEJKO0FBbUJFO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7QUFqQko7O0FBNEJBO0VBRUUsbUJBQUE7QUExQkY7O0FBNkJBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7QUExQkY7O0FBNkJBO0VBQ0Usa0JBQUE7QUExQkY7O0FBK0JBO0VBRUUsV0FBQTtFQUdBLGFBQUE7RUFHQSxzQkFBQTtFQUNBLGFBQUE7RUFFQSxzQkFBQTtFQUNBLHVDQUFBO0VBQ0EscURBQUE7QUFsQ0Y7QUFvQ0U7RUFDRSxZQUFBO0VBQ0EsY0FBQTtBQWxDSjtBQW9DSTtFQUVFLGVBQUE7RUFDQSxnQkFBQTtBQW5DTjtBQXNDSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQXBDTiIsInNvdXJjZXNDb250ZW50IjpbIi5kYXNoYm9hcmQtY2FyZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgbWFyZ2luOiAwIC0xNXB4O1xuXG4gID4uY2FyZCB7XG4gICAgbWFyZ2luOiAxNXB4O1xuICB9XG59XG5cblxuYm9keSB7XG4gIHdpZHRoOiAzMCU7XG4gIG1pbi13aWR0aDogMzAwcHg7XG4gIGhlaWdodDogODB2aDtcbiAgbWFyZ2luOiAyMHZoIGF1dG8gMDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICNGRjUxMkYsICNERDI0NzYpO1xuICAvKiBXM0MsIElFIDEwKy8gRWRnZSwgRmlyZWZveCAxNissIENocm9tZSAyNissIE9wZXJhIDEyKywgU2FmYXJpIDcrICovXG4gIGNvbG9yOiAjMjgyODI4O1xufVxuXG5oMSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuXG5cblxuLy9EZW1vIHN0eWxlc1xuLnRhc2sge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIHBlcnNwZWN0aXZlOiA4MDBweDtcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbn1cblxuLmFic3RyYWN0LFxuLmRldGFpbHMge1xuICAkYmc6IHJnYmEod2hpdGUsIDEpO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTVweCAzMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6ICRiZztcblxuICAvLyAudGFzazpob3ZlciAmIHtcbiAgLy8gICBiYWNrZ3JvdW5kOiBkYXJrZW4oJGJnLCAyJSk7XG4gIC8vIH1cbn1cblxuLmFic3RyYWN0IHtcbiAgLy96LWluZGV4OiAxMDtcbiAgdHJhbnNpdGlvbjogLjNzIGVhc2UgYWxsO1xufVxuXG4uZGV0YWlscyB7XG4gIG1heC1oZWlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG5cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuXG4gIHRyYW5zZm9ybTogcm90YXRlWCgtMTgwZGVnKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGNlbnRlcjtcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAvLyAgdHJhbnNpdGlvbjogLjNzIHRyYW5zZm9ybSBlYXNlO1xuXG4gICY6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDEwJTtcbiAgICByaWdodDogMTAlO1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQ6IGdyZXk7XG4gIH1cblxuICAudGFzayAuZXhwYW5kZWQge1xuICAgIG1heC1oZWlnaHQ6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZyk7XG4gIH1cblxuICAvLyAudGFzazpob3ZlciAmIHtcbiAgLy8gICBtYXgtaGVpZ2h0OiBub25lO1xuICAvLyAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAvLyAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIC8vICAgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpO1xuICAvLyB9XG59XG5cbi5hYnN0cmFjdCAuZGV0YWlsIC5leHBhbmRlZCB7XG4gICRiZzogcmdiYSh3aGl0ZSwgMSk7XG4gIGJhY2tncm91bmQ6IGRhcmtlbigkYmcsIDIlKTtcbn1cblxuLmV4cGFuZGVkIHtcbiAgbWF4LWhlaWdodDogbm9uZTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKTtcbn1cblxuLmRldGFpbHNfX2lubmVyIHtcbiAgcGFkZGluZzogMTVweCAzMHB4O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tXG5cbi5kYXRlIHtcbiAgLy8gcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogNDhweDtcbiAgLy8gYm90dG9tOiAwO1xuICAvLyByaWdodDogMzBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgLy8gYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgLy8ganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDEwcHg7XG4gIC8vICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRwcmltYXJ5LCAwLjgpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xuICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKGJsYWNrLCAwLjcpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBjdWJpYy1iZXppZXIoLjI1LCAuOCwgLjI1LCAxKTtcblxuICBzcGFuIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG5cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgIC8vICAgICAgZm9udC1mYW1pbHk6ICRmb250LW1vbm9zcGFjZTtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgfVxuICB9XG59XG5cbi8vIC0tLS0tLS0tLVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 36730:
/*!************************************************************!*\
  !*** ./src/app/pages/edit-entity/edit-entity.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditEntityComponent: () => (/* binding */ EditEntityComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsonform/jsonform.component */ 80106);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app/_services */ 57870);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _ajsf_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ajsf/core */ 35017);

//import { MatDialog } from '@angular/material/dialog';
//import { JsonSchemaFormComponent } from 'angular6-json-schema-form';









function EditEntityComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "mat-progress-spinner", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return ["fas", "arrow-left"];
};
class EditEntityComponent extends _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__.JSONFormComponent {
  //  @ViewChild("form") oFormInstance: JsonSchemaFormComponent;
  onBack() {
    this.oLocation.back();
  }
  constructor(oLocation, oAPIService, _location, oBuilder, router) {
    super();
    this.oLocation = oLocation;
    this.oAPIService = oAPIService;
    this._location = _location;
    this.oBuilder = oBuilder;
    this.router = router;
    this.bLoaded = false;
    this.sTitle = "New Clinic";
    // oItem: any = {
    //   ID: "0",
    //   NAME: "",
    //   ADDRESS: "",
    //   PHONE: "+6512345663",
    //   COUNTRY: "IN",
    //   ISACTIVE: 'Y'
    // };
    // oInputForm: FormGroup;
    this.formObject = {
      "schema": {
        "type": "object",
        "properties": {
          "ID": {
            "type": "string",
            "readonly": "true"
          },
          "NAME": {
            "type": "string"
          },
          "ADDRESS": {
            "type": "string"
          },
          "PHONE": {
            "type": "string"
          },
          "COUNTRY": {
            "type": "string",
            "enum": ["SG", "IN"]
          },
          "ISACTIVE": {
            "type": "string"
          },
          "busy": {
            "type": "string"
          }
        },
        "required": ["NAME", "ADDRESS", "PHONE", "COUNTRY", "ISACTIVE"]
      },
      "layout": [{
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["ID"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["NAME", "PHONE"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["ADDRESS"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["COUNTRY", "ISACTIVE"]
      }],
      "data": {
        "ID": "0",
        "NAME": "Doe",
        "ADDRESS": "123 Main St.",
        "PHONE": "1999-09-21",
        "COUNTRY": "SG",
        "ISACTIVE": "Y",
        "busy": "N"
      }
    };
    //    super(oAPIService, dialog);
    // }
    console.log("In Edit");
    // this.oEntity = JSON.parse(localStorage.getItem('oEntity'));
    this.oEntity = oAPIService.getJSONFromLocalStorage('oEntity');
    // constructor(private _location: Location, private oBuilder: FormBuilder,private router: Router, private readonly oAPIService: ApiServiceProvider) {
    //    var o = localStorage.getItem("oEntityItem");
    // var o = this.oLocation.getState();
    // var oT = o['oEntityItem'];
    if (this.oEntity != null) {
      // this.oItem = oT;
      this.formObject['data'] = this.oEntity;
      this.sTitle = "Edit Entity";
    }
    // this.oInputForm = this.oBuilder.group({
    //   ID: [this.oItem.ID],
    //   NAME: [this.oItem.NAME, Validators.compose([Validators.required])],
    //   ADDRESS: [this.oItem.ADDRESS, Validators.compose([Validators.required])],
    //   PHONE: [this.oItem.PHONE, Validators.compose([Validators.required])],
    //   COUNTRY: [this.oItem.COUNTRY, Validators.compose([Validators.required])],
    //   ISACTIVE: [this.oItem.ISACTIVE == 'Y'],
    // });
  }

  ngOnInit() {
    //    super.showSpinner();
    super.loadJSONForm(this.formObject);
    this.bLoaded = true;
    //    super.hideSpinner();
  }

  isFormValid(e) {
    return true;
  }
  onFormSubmit(formData) {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //    super.showSpinner();
      console.log(formData);
      // formData.ISACTIVE = (formData.ISACTIVE) ? 'Y' : 'N';
      if (formData.ID === undefined || formData.ID == '0') {
        _this.insert(formData);
      } else _this.update(formData);
    })();
  }
  insert(formData) {
    this.oAPIService.send2ServerP("entity/add", true, formData).then(data => {
      //      var oItem = data.result[0];
      this.onBack();
      // let alert = this.alertCtrl.create({
      //   title: 'Saved',
      //   subTitle: 'Successfully',
      //   buttons: ['Dismiss']
      // });
      // alert.present().then(() => {
      //   this.navCtrl.pop();
      // });
    });
  }

  update(formData) {
    this.oAPIService.send2ServerP("entity/" + formData.ID + "/update", true, formData).then(data => {
      //      var oItem = data.result[0];
      this.onBack();
      // let alert = this.alertCtrl.create({
      //   title: 'Updated',
      //   subTitle: 'Successfully',
      //   buttons: ['Dismiss']
      // });
      // alert.present();
      //      this.navCtrl.pop() ;
    });
  }
  // onShowServices() {
  //   Global_Variables.oEID = this.oItem.ID;
  //   this.navCtrl.push('ServicesPage', { oEntity: this.oItem });
  // }
  showCalendar(oItem) {
    //    this.navCtrl.push("WorkingHoursPage", { Item: this.oItem });
    localStorage.setItem("oEntity", JSON.stringify(oItem));
    //JSON.stringify(this.oItem));
    //    this.router.navigateByUrl('business-hours', { state: { "oEntityItem": this.formObject['data'] } });
    this.router.navigateByUrl('business-hours', {
      state: {
        "oEntity": oItem
      }
    });
  }
  onRemove(oEntity) {
    this.oAPIService.send2ServerP("entity/delete", true, oEntity).then(data => {}).catch(err => {
      console.log(err);
      // let alert = this.alertCtrl.create({
      //   title: 'Removed',
      //   subTitle: 'Successfully',
      //   buttons: ['Dismiss']
      // });
      // alert.present();  
    });
  }
  static #_ = this.ɵfac = function EditEntityComponent_Factory(t) {
    return new (t || EditEntityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: EditEntityComponent,
    selectors: [["app-edit-entity"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 11,
    vars: 9,
    consts: [[1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["size", "1x", "toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "form-container"], ["framework", "bootstrap-4", 3, "schema", "layout", "options", "data", "loadExternalAssets", "dataChange", "onSubmit", "isValid"], ["form", ""], ["id", "outer", 4, "ngIf"], ["id", "outer"], ["diameter", "50", "mode", "indeterminate", "color", "primary"]],
    template: function EditEntityComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h5")(4, "fa-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EditEntityComponent_Template_fa_icon_click_4_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4)(7, "json-schema-form", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dataChange", function EditEntityComponent_Template_json_schema_form_dataChange_7_listener($event) {
          return ctx.oFormData = $event;
        })("onSubmit", function EditEntityComponent_Template_json_schema_form_onSubmit_7_listener($event) {
          return ctx.onFormSubmit($event);
        })("isValid", function EditEntityComponent_Template_json_schema_form_isValid_7_listener($event) {
          return ctx.isFormValid($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, EditEntityComponent_div_9_Template, 2, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("schema", ctx.oFormSchema)("layout", ctx.oFormLayout)("options", ctx.formOptions)("data", ctx.oFormData)("loadExternalAssets", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bShowSpinner);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__.FaIconComponent, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinner, _ajsf_core__WEBPACK_IMPORTED_MODULE_9__.JsonSchemaFormComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 46678:
/*!**************************************************************!*\
  !*** ./src/app/pages/edit-service/edit-service.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditServiceComponent: () => (/* binding */ EditServiceComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsonform/jsonform.component */ 80106);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var _ajsf_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ajsf/core */ 35017);









function EditServiceComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 8);
  }
}
const _c0 = function () {
  return ["fas", "arrow-left"];
};
//import { MatDialog } from '@angular/material/dialog';
// import { TranslateService } from '@ngx-translate/core';
// import { first } from 'rxjs/operators';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { routerTransition } from '../../router.animations';
class EditServiceComponent extends _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__.JSONFormComponent {
  onBack() {
    // this.oLocation.back();
    this.router.navigateByUrl('/services', {
      state: {
        "oEntity": this.oEntity
      }
    });
    //    window.history.go(-2);
  }

  ngOnInit() {
    //    super.showSpinner();
    super.loadJSONForm(this.formObject);
    this.bLoaded = true;
    //    super.hideSpinner();
  }

  constructor(oLocation, oAPIService, oBuilder, router, route) {
    super();
    this.oLocation = oLocation;
    this.oAPIService = oAPIService;
    this.oBuilder = oBuilder;
    this.router = router;
    this.route = route;
    this.formObject = {
      "schema": {
        "type": "object",
        "properties": {
          "ID": {
            "type": "string",
            "readonly": "true"
          },
          "ISACTIVE": {
            "type": "string"
          },
          "NAME": {
            "type": "string"
          },
          "PREFIX": {
            "type": "string"
          },
          "RECYCLEEOD": {
            "type": "string"
          },
          "STARTQN": {
            "type": "string"
          },
          "STARTTIME": {
            "type": "string"
          },
          "ENDTIME": {
            "type": "string"
          },
          "MOREINFO": {
            "type": "string"
          },
          "busy": {
            "type": "string"
          }
        },
        "required": ["NAME", "PREFIX", "RECYCLEEOD", "STARTQN", "STARTTIME", "ENDTIME", "ISACTIVE"]
      },
      "layout": [{
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["ID", "ISACTIVE"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["NAME"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["PREFIX", "RECYCLEEOD", "STARTQN"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["STARTTIME", "ENDTIME"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["MOREINFO"]
      }],
      "data": {
        "ID": "0",
        "NAME": "ABCD Service",
        "STARTQN": "1",
        "PREFIX": "A",
        "RECYCLEEOD": "Y",
        "STARTTIME": "0930",
        "ENDTIME": "1730",
        "MOREINFO": "Registration at reception is required before you can be served.",
        "ISACTIVE": "Y",
        "busy": "N"
      }
    };
    this.sTitle = "Add Service";
    this.bLoaded = true;
    this.oEntity = {};
    this.oEntity = oAPIService.getJSONFromLocalStorage('oEntity');
    // this.oEntity = JSON.parse(localStorage.getItem("oEntity")||'');
    // var oT = JSON.parse(localStorage.getItem("oService")||'');
    var oT = oAPIService.getJSONFromLocalStorage('oService');
    this.oFormSchema = this.formObject['schema'];
    this.oFormLayout = this.formObject['layout'];
    if (oT != null) {
      this.oFormData = oT;
      console.log(this.oFormData);
      this.sTitle = "Edit Service";
    }
  }
  // populateFormData() {
  //   this.oInputForm = this.oBuilder.group({
  //     NAME: [this.oItem.NAME],
  //     PREFIX: [this.oItem.PREFIX],
  //     STARTQN: [this.oItem.STARTQN, Validators.compose([Validators.required])],
  //     RECYCLEEOD: [this.oItem.RECYCLEEOD == 'Y'],
  //     //      STARTTIME: [this.oItem.STARTTIME, Validators.compose([Validators.required])],
  //     //      ENDTIME: [this.oItem.ENDTIME, Validators.compose([Validators.required])],
  //     ISACTIVE: [this.oItem.ISACTIVE == 'Y'],
  //   });
  // }
  isFormValid(e) {
    return true;
  }
  onFormSubmit(formData) {
    //    console.log(formData);
    // formData.ISACTIVE = (formData.ISACTIVE) ? 'Y' : 'N';
    // formData.RECYCLEEOD = (formData.RECYCLEEOD) ? 'Y' : 'N';
    if (formData.ID === undefined || formData.ID == '0') {
      this.insert(formData);
    } else this.update(formData);
  }
  onShowUsers() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      localStorage.setItem("oService", JSON.stringify(_this.oFormData));
      _this.router.navigateByUrl('list-users', {
        state: {
          "oService": _this.oFormData
        }
      });
      // this.router.navigate(['list-users'], { relativeTo: this.route });
    })();
  }

  insert(formData) {
    this.oAPIService.send2ServerP("services/" + this.oEntity.ID + "/add", true, formData).then(data => {
      //      var oItem = data.result[0];
      this.onBack();
      // let alert = this.alertCtrl.create({
      //   title: 'Saved',
      //   subTitle: 'Successfully',
      //   buttons: ['Dismiss']
      // });
      // alert.present();
    });
  }

  update(formData) {
    this.oAPIService.send2ServerP("services/" + this.oEntity.ID + '/' + formData.ID + "/update", true, formData).then(data => {
      //      var oItem = data.result[0];
      this.onBack();
      // let alert = this.alertCtrl.create({
      //   title: 'Updated',
      //   subTitle: 'Successfully',
      //   buttons: ['Dismiss']
      // });
      // alert.present();
    });
  }
  static #_ = this.ɵfac = function EditServiceComponent_Factory(t) {
    return new (t || EditServiceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: EditServiceComponent,
    selectors: [["app-edit-service"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 15,
    vars: 11,
    consts: [[1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["size", "1x", "toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "form-container"], ["framework", "bootstrap-4", 3, "schema", "layout", "options", "data", "loadExternalAssets", "dataChange", "onSubmit", "isValid"], ["form", ""], ["id", "outer", 4, "ngIf"], ["id", "outer"]],
    template: function EditServiceComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h5")(4, "fa-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EditServiceComponent_Template_fa_icon_click_4_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4)(11, "json-schema-form", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dataChange", function EditServiceComponent_Template_json_schema_form_dataChange_11_listener($event) {
          return ctx.oFormData = $event;
        })("onSubmit", function EditServiceComponent_Template_json_schema_form_onSubmit_11_listener($event) {
          return ctx.onFormSubmit($event);
        })("isValid", function EditServiceComponent_Template_json_schema_form_isValid_11_listener($event) {
          return ctx.isFormValid($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, EditServiceComponent_div_13_Template, 1, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](10, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.oEntity.NAME, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.oEntity.ADDRESS, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("schema", ctx.oFormSchema)("layout", ctx.oFormLayout)("options", ctx.formOptions)("data", ctx.oFormData)("loadExternalAssets", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bShowSpinner);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__.FaIconComponent, _ajsf_core__WEBPACK_IMPORTED_MODULE_8__.JsonSchemaFormComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 57124:
/*!********************************************************!*\
  !*** ./src/app/pages/edit-user/edit-user.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditUserComponent: () => (/* binding */ EditUserComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsonform/jsonform.component */ 80106);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var _ajsf_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ajsf/core */ 35017);

//import { MatDialog } from '@angular/material/dialog';







function EditUserComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 8);
  }
}
const _c0 = function () {
  return ["fas", "arrow-left"];
};
//import { JsonSchemaFormComponent } from 'angular6-json-schema-form';
//import { CommonUIComponent } from '../common-ui/common-ui.component';
class EditUserComponent extends _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__.JSONFormComponent {
  onBack() {
    this.router.navigateByUrl('/users', {
      state: {
        "oService": this.oService
      }
    });
    // this.oLocation.back();
    //    window.history.go(-2);
  }
  // constructor(public oLocation: Location, private readonly oAPIService: DataService, dialog: MatDialog, private _location: Location, private oBuilder: FormBuilder, private router: Router) {
  //   super(oAPIService, dialog);
  // }
  // constructor(private _location: Location, private oBuilder: FormBuilder,private router: Router, private readonly oAPIService: ApiServiceProvider) {
  //    var o = localStorage.getItem("oEntityItem");
  constructor(oLocation, oAPIService, router) {
    super();
    this.oLocation = oLocation;
    this.oAPIService = oAPIService;
    this.router = router;
    this.sTitle = "Add User";
    /*
                 <option value="A">Entity Admin</option>
                 <option value="s">Service Counter</option>
                 <option value="d">Display</option>
                 <option value="p">Printer</option>
    */
    this.formObject = {
      "schema": {
        "type": "object",
        "properties": {
          "UID": {
            "type": "string",
            "readonly": "true"
          },
          "EMAIL": {
            "type": "string"
          },
          "ACCESS": {
            "type": "string",
            "enumNames": ["Entity Admin", "Service Counter", "Display", "Printer"],
            "enum": ["A", "s", "d", "p"]
          },
          "ISACTIVE": {
            "type": "string"
          },
          "busy": {
            "type": "string"
          }
        },
        "required": ["EMAIL", "ACCESS", "ISACTIVE"]
      },
      "layout": [{
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["UID", "ISACTIVE"]
      }, {
        "type": "flex",
        "flex-flow": "row wrap",
        "items": ["EMAIL", "ACCESS"]
      }],
      "data": {
        "UID": "0",
        "EMAIL": "Doe",
        "ACCESS": "d",
        "ISACTIVE": "Y",
        "busy": "N"
      }
    };
    // oInputForm: FormGroup;
    this.bLoaded = false;
    // this.oService = JSON.parse(localStorage.getItem('oService')||'');
    this.oService = oAPIService.getJSONFromLocalStorage('oService');
    // var oT = JSON.parse(localStorage.getItem('oUser')||'');
    var oT = oAPIService.getJSONFromLocalStorage('oUser');
    // var o = this.oLocation.getState();
    // this.oService = o['oService'];
    // var oT = o['oUserItem'];
    if (oT != null) {
      // this.oItem = oT;
      console.log(oT);
      this.formObject['data'] = oT;
      this.sTitle = "Edit User";
    }
  }
  ngOnInit() {
    //    super.showSpinner();
    super.loadJSONForm(this.formObject);
    this.bLoaded = true;
    //    super.hideSpinner();
  }

  isFormValid(e) {
    return true;
  }
  onFormSubmit(formData) {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // formData.ISACTIVE = (formData.ISACTIVE) ? 'Y' : 'N';
      console.log(formData);
      // console.log(this.oItem);
      if (formData.UID === undefined || formData.UID === "0") {
        _this.insert(formData);
      } else _this.update(formData);
    })();
  }
  insert(formData) {
    this.oAPIService.send2ServerP("users/" + this.oService.ENTITYID + "/" + this.oService.ID + "/add", true, formData).then(data => {
      console.log(data);
      if (data._error) {
        alert("User has a role in another Business");
      } else this.onBack();
    });
  }
  update(formData) {
    this.oAPIService.send2ServerP("users/" + this.oService.ENTITYID + "/" + this.oService.ID + '/' + formData.UID + "/update", true, formData).then(data => {
      this.onBack();
    });
  }
  static #_ = this.ɵfac = function EditUserComponent_Factory(t) {
    return new (t || EditUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: EditUserComponent,
    selectors: [["app-edit-user"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 11,
    vars: 9,
    consts: [[1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["size", "1x", "toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "form-container"], ["framework", "bootstrap-4", 3, "schema", "layout", "options", "data", "loadExternalAssets", "dataChange", "onSubmit", "isValid"], ["form", ""], ["id", "outer", 4, "ngIf"], ["id", "outer"]],
    template: function EditUserComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h5")(4, "fa-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EditUserComponent_Template_fa_icon_click_4_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4)(7, "json-schema-form", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dataChange", function EditUserComponent_Template_json_schema_form_dataChange_7_listener($event) {
          return ctx.oFormData = $event;
        })("onSubmit", function EditUserComponent_Template_json_schema_form_onSubmit_7_listener($event) {
          return ctx.onFormSubmit($event);
        })("isValid", function EditUserComponent_Template_json_schema_form_isValid_7_listener($event) {
          return ctx.isFormValid($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, EditUserComponent_div_9_Template, 1, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("schema", ctx.oFormSchema)("layout", ctx.oFormLayout)("options", ctx.formOptions)("data", ctx.oFormData)("loadExternalAssets", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bShowSpinner);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__.FaIconComponent, _ajsf_core__WEBPACK_IMPORTED_MODULE_7__.JsonSchemaFormComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 80106:
/*!******************************************************!*\
  !*** ./src/app/pages/jsonform/jsonform.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONFormComponent: () => (/* binding */ JSONFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class JSONFormComponent {
  constructor() {
    this.bShowSpinner = false;
    this.oFormSchema = {};
    this.oFormLayout = {};
    this.oFormData = {};
    this.formOptions = {
      defautWidgetOptions: {
        returnEmptyFields: true
      }
    };
  }
  ngOnInit() {}
  loadJSONForm(formObject) {
    this.oFormSchema = formObject['schema'];
    this.oFormLayout = formObject['layout'];
    this.oFormData = formObject['data'];
    // this.oFormData['Owner'] = sessionStorage.getItem('Email');
  }
  static #_ = this.ɵfac = function JSONFormComponent_Factory(t) {
    return new (t || JSONFormComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: JSONFormComponent,
    selectors: [["app-jsonform"]],
    decls: 2,
    vars: 0,
    template: function JSONFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "jsonform works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 42399:
/*!**************************************************************!*\
  !*** ./src/app/pages/landing-page/landing-page.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LandingPageComponent: () => (/* binding */ LandingPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 25267);
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/_services */ 57870);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);








function LandingPageComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Username is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LandingPageComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LandingPageComponent_div_11_div_1_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["username"].errors["required"]);
  }
}
function LandingPageComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LandingPageComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LandingPageComponent_div_16_div_1_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.f["password"].errors["required"]);
  }
}
function LandingPageComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 18);
  }
}
function LandingPageComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.error);
  }
}
const _c0 = function (a0) {
  return {
    "is-invalid": a0
  };
};
class LandingPageComponent {
  constructor(formBuilder, route, router, authenticationService) {
    this.formBuilder = formBuilder;
    this.route = route;
    this.router = router;
    this.authenticationService = authenticationService;
    this.mySchema = {
      "properties": {
        "email": {
          "type": "string",
          "description": "email",
          "format": "email"
        },
        "password": {
          "type": "string",
          "description": "Password"
        },
        "rememberMe": {
          "type": "boolean",
          "default": false,
          "description": "Remember me"
        }
      },
      "required": ["email", "password", "rememberMe"],
      "buttons": [{
        "id": "alert",
        "label": "Alert !" // the text inside the button
      }]
    };

    this.myActions = {
      "alert": property => {
        console.log(property);
      },
      "reset": property => {
        property.reset();
      }
    };
    this.myModel = {
      email: "john.doe@example.com"
    };
    this.loading = false;
    this.submitted = false;
    this.error = '';
    // redirect to home if already logged in
    if (this.authenticationService.userValue !== src_app_services__WEBPACK_IMPORTED_MODULE_0__.NULL_USER) {
      this.router.navigate(['/clinics']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f['username'].value, this.f['password'].value).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.first)()).subscribe(data => {
      this.router.navigate(['/clinics']);
      //          this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
  static #_ = this.ɵfac = function LandingPageComponent_Factory(t) {
    return new (t || LandingPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LandingPageComponent,
    selectors: [["app-landing-page"]],
    decls: 35,
    vars: 12,
    consts: [[1, "container", "row"], [1, "col-md-5"], [1, "card"], [1, "card-header"], [1, "card-body"], [3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "username"], ["type", "text", "formControlName", "username", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "password"], ["type", "password", "formControlName", "password", 1, "form-control", 3, "ngClass"], [1, "btn", "btn-primary", 3, "disabled"], ["class", "spinner-border spinner-border-sm mr-1", 4, "ngIf"], ["class", "alert alert-danger mt-3 mb-0", 4, "ngIf"], [1, "col-md-7"], [1, "invalid-feedback"], [4, "ngIf"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "alert", "alert-danger", "mt-3", "mb-0"]],
    template: function LandingPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "EzQueue Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LandingPageComponent_Template_form_ngSubmit_6_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 6)(8, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, LandingPageComponent_div_11_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 6)(13, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, LandingPageComponent_div_16_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, LandingPageComponent_span_18_Template, 1, 0, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, LandingPageComponent_div_20_Template, 2, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 15)(22, "div")(23, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, " Imagine you need to see a doctor..., but don't know how many patients are waiting at the clinic ? Ok, fire up your browser..., go to easy Queue..., and look at clinics near by. Check out the current queue number..., and the last queue number taken. Choose the clinic that suits your time..., take a queue number..., monitor queue status..., and go to the clinic just in time. With easy Queue, you are free to optimize your time, instead of waiting at the clinic. Don't let yourself to be among patients for long ! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div")(26, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "EzQueue System");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div")(29, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Benefits");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "For Patients: Convinence, saves time");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "For Doctors: Less real estate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c0, ctx.submitted && ctx.f["username"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["username"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c0, ctx.submitted && ctx.f["password"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["password"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 93900:
/*!****************************************************************!*\
  !*** ./src/app/pages/list-entities/list-entities.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListEntitiesComponent: () => (/* binding */ ListEntitiesComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_models */ 84939);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 84980);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app/_services */ 57870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/upload.service */ 63094);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular-confirmation-popover */ 71479);












const _c0 = ["fileUpload"];
const _c1 = function () {
  return ["fas", "plus"];
};
function ListEntitiesComponent_fa_icon_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "fa-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListEntitiesComponent_fa_icon_22_Template_fa_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.onAddEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c1));
  }
}
const _c2 = function () {
  return ["fas", "times"];
};
function ListEntitiesComponent_tr_24_fa_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("confirm", function ListEntitiesComponent_tr_24_fa_icon_9_Template_fa_icon_confirm_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const o_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r7.onRemove(o_r4));
    })("cancel", function ListEntitiesComponent_tr_24_fa_icon_9_Template_fa_icon_cancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r10.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](3, _c2))("popoverTitle", ctx_r6.sDeleteTitle)("popoverMessage", ctx_r6.sDeleteMessage);
  }
}
const _c3 = function () {
  return ["fas", "user-md"];
};
function ListEntitiesComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td")(4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListEntitiesComponent_tr_24_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.onClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Upload ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "input", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ListEntitiesComponent_tr_24_fa_icon_9_Template, 1, 4, "fa-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListEntitiesComponent_tr_24_Template_div_click_10_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r13.onAddEdit(o_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "td")(22, "fa-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ListEntitiesComponent_tr_24_Template_fa_icon_click_22_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r14.onShowServices(o_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", o_r4.COUNTRY, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.isQueueAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](o_r4.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](o_r4.ADDRESS);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](o_r4.PHONE);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](o_r4.ISACTIVE);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c3));
  }
}
/* Font Awesome Icons */
// https://fontawesome.com/icons?d=gallery&q=edit
// library.add(
//   faPlus,
//   faPlusSquare,
//   faEdit,
//   faUserEdit,
//   faTimes,
//   faClock,
//   faTrash,
//   // faGoogle,
//   // faCopyright,
//   // faBalanceScale,
//   // faPiggyBank,
//   // faBinoculars,
// )
class ListEntitiesComponent {
  //  currentUser:any ;
  constructor(authenticationService, oAPIService, router, uploadService) {
    this.authenticationService = authenticationService;
    this.oAPIService = oAPIService;
    this.router = router;
    this.uploadService = uploadService;
    this.files = [];
    // add = faPlus;
    // edit = faEdit;
    // delete = faTrash;
    // services = faPlusSquare;
    // clock = faClock;
    this.sDeleteTitle = 'Confirm Delete';
    this.sDeleteMessage = 'Delete Clinic';
    this.confirmClicked = false;
    this.cancelClicked = false;
    this.oItems = [];
    // searchControl: FormControl;
    // bSearching: any;
    this.bLoaded = false;
    // loading: Loading;
    this.sCountry = 'NotSet';
    this.bShowSpinner = false;
    //    super(oAPIService, dialog);
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(event => {
      switch (event.type) {
        case _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpEventType.UploadProgress:
          file.progress = Math.round(event.loaded * 100 / ((event.total || 0) + 0.00000001));
          break;
        case _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpEventType.Response:
          return event;
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => {
      file.inProgress = false;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(`${file.data.name} upload failed.`);
    })).subscribe(event => {
      if (typeof event === 'object') {
        console.log(event.body);
      }
    });
  }
  uploadFiles() {
    if (this.fileUpload) {
      this.fileUpload.nativeElement.value = '';
      this.files.forEach(file => {
        this.uploadFile(file);
      });
    }
  }
  onClick() {
    if (!this.fileUpload) return;
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file,
          inProgress: false,
          progress: 0
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  // constructor(private authenticationService: AuthenticationService, private oAPIService: DataService, private router: Router) {
  //   //    super(oAPIService, dialog);
  // }
  // constructor(private router: Router, private route: ActivatedRoute, private oAPIService: DataService, private confirmationDialogService: ConfirmationDialogService) {
  // }
  get isQueueAdmin() {
    return this.authenticationService.userValue.TYPE === _models__WEBPACK_IMPORTED_MODULE_1__.Role.QueueAdmin;
  }
  ngOnInit() {
    //    this.currentUser = localStorage.getItem('currentUser')
    this.loadEntities();
  }
  loadEntities() {
    // this.loading = this.loadingCtrl.create({
    //   content: 'loading...',
    // });
    // this.loading.present();
    this.oAPIService.send2ServerP("entity/get/all", true).then(data => {
      this.oItems = data.result;
      this.bLoaded = true;
      //      this.loading.dismiss();
    });
  }

  onAddEdit(oItem = null) {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(oItem);
      localStorage.removeItem("oEntity");
      if (oItem != null) {
        localStorage.setItem("oEntity", JSON.stringify(oItem));
        console.log("Store Entity: ", oItem);
        yield _this.router.navigateByUrl('edit-entity', {
          state: {
            "oEntity": oItem
          }
        });
        // this.router.navigate(['entity-entity'], { relativeTo: this.route });
        // return;
      } else console.log(_this.router.url);
      // await this.router.navigateByUrl('edit-entity', { state: { "hello": true } });
      yield _this.router.navigate(['edit-entity']); //, { relativeTo: this.route });
      // if (oItem == null)
      //   this.navCtrl.push('AddEntityPage');
      // else
      //   this.navCtrl.push('AddEntityPage', { oItem: oItem });
    })();
  }

  onSelectedItem(oItem) {
    console.log("Called Entity");
    localStorage.setItem("oEntity", JSON.stringify(oItem));
  }
  onShowServices(oItem) {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(oItem);
      // localStorage.setItem("oEntityItem", JSON.stringify(oItem));
      console.log('configured routes: ', _this2.router.config);
      localStorage.setItem("oEntity", JSON.stringify(oItem));
      //    this.router.navigate(['list-services']);
      yield _this2.router.navigateByUrl('services', {
        state: {
          "oEntity": oItem
        }
      });
      // this.router.navigate(['services']); //, { relativeTo: this.route });
      // Global_Variables.oEID = this.oItem.ID;
      // this.navCtrl.push('ServicesPage', { oEntity: this.oItem });
    })();
  }

  onRemove(oItem) {
    var _this3 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // this.oFormInstance.value.busy = null;
      //    console.log(oItem);
      // var bExists: any = await super.checkExistence(formData);
      // if (bExists == false) {
      //   super.openAlertDialog("Environment NOT Present");
      //   this.oFormInstance.value.busy = "N";
      //   return;
      // }
      // this.bShowSpinner = true;
      // if (await super.confirmDialog("Confirm Deletion", `Delete  ${oItem.NAME}`)) {
      try {
        _this3.bShowSpinner = true;
        _this3.oAPIService.send2ServerP("entity/" + oItem.ID + "/delete", true, oItem).then(data => {
          //this.router.navigate(['/entities']) ;
          _this3.ngOnInit();
          return;
        });
      } catch (err) {
        console.log("Failed ", err);
      } finally {
        _this3.bShowSpinner = false;
      }
      //    }
      // this.oFormInstance.value.busy = "N";
      //.initializeForm();
      //}
      //   this.confirmationDialogService.confirm('Confirm Deletion', 'Delete ' + oItem.NAME, 'Yes Delete')
      //     .then((confirmed) => {
      //       console.log('User confirmed:', confirmed)
      //       if (confirmed == true) {
      //         this.oAPIService.send2ServerP("entity/" + oItem.ID + "/delete", true, oItem).then((data) => {
      //           //this.router.navigate(['/entities']) ;
      //           this.ngOnInit();
      //           return;
      //         })
      //           .catch((err) => {
      //             alert("Error deleting");
      //             // let alert = this.alertCtrl.create({
      //             //   title: 'Saved',
      //             //   subTitle: 'Successfully',
      //             //   buttons: ['Dismiss']
      //             // });
      //             // alert.present();
      //           });
      //       }
      //     })
      //     .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    })();
  }

  onBusinessHours(oItem) {
    var _this4 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      localStorage.setItem("oEntity", JSON.stringify(oItem));
      // this.router.navigate(['business-hours'], { relativeTo: this.route });
      yield _this4.router.navigateByUrl('business-hours', {
        state: {
          "oService": oItem
        }
      });
    })();
  }
  static #_ = this.ɵfac = function ListEntitiesComponent_Factory(t) {
    return new (t || ListEntitiesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_services__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_upload_service__WEBPACK_IMPORTED_MODULE_3__.UploadService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: ListEntitiesComponent,
    selectors: [["app-list-entities"]],
    viewQuery: function ListEntitiesComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.fileUpload = _t.first);
      }
    },
    decls: 25,
    vars: 2,
    consts: [[1, "full-screen"], ["src", "https://www.starpng.com/public/uploads/preview/thin-crayon-divider-line-png-51575739708kixuhrawiv.png", "id", "dummy-image"], [1, "card", 2, "width", "100%"], [1, "card-header"], [1, "bodycontainer", "scrollable"], [1, "card-table", "table", 2, "width", "100%"], ["scope", "col"], ["scope", "col", 1, "text-center"], ["size", "1x", "class", "btn btn-primary btn-sm mr-1", "toggle", "tooltip", "title", "New Clinic!", 3, "icon", "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["size", "1x", "toggle", "tooltip", "title", "New Clinic!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["mat-button", "", "color", "warn", 3, "click"], ["type", "file", "id", "fileUpload", "name", "fileUpload", "multiple", "multiple", "accept", "image/*", 2, "display", "none"], ["fileUpload", ""], ["size", "1x", "class", "btn btn-danger  btn-sm mr-1", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Clinic!", 3, "icon", "popoverTitle", "popoverMessage", "confirm", "cancel", 4, "ngIf"], [1, "ksd-tooltip", 3, "click"], [1, "ksd-tooltiptext"], ["size", "1x", "toggle", "tooltip", "title", "Show Services", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["size", "1x", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Clinic!", 1, "btn", "btn-danger", "btn-sm", "mr-1", 3, "icon", "popoverTitle", "popoverMessage", "confirm", "cancel"]],
    template: function ListEntitiesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Clinics ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4)(6, "table", 5)(7, "thead")(8, "tr")(9, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Country");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Address");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Phone");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "IsActive");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "th", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, ListEntitiesComponent_fa_icon_22_Template, 1, 2, "fa-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, ListEntitiesComponent_tr_24_Template, 23, 8, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isQueueAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.oItems);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_11__.FaIconComponent, angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_12__.ConfirmationPopoverDirective],
    styles: [".bodycontainer[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0;\n  overflow-x: scroll;\n  overflow-y: auto;\n}\n\n.table-scrollable[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n\nul[_ngcontent-%COMP%], li[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvbGlzdC1lbnRpdGllcy9saXN0LWVudGl0aWVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCQTtFQUVFLFdBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQXJCRjs7QUF3QkE7RUFFRSxTQUFBO0VBQ0EsVUFBQTtBQXRCRjs7QUEyQkE7O0VBRU0sU0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQXhCTiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN2ZyB7XG4vLyAgIHdpZHRoOiAyMCUgIWltcG9ydGFudDtcbi8vICAgcGFkZGluZy10b3A6IDIwJTtcbi8vICAgbWFyZ2luLXJpZ2h0OiAyMCU7XG4vLyAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4vLyAgIGJhY2tncm91bmQtY29sb3I6ICNlYzU2N2M7XG4vLyAgIGZsb2F0OiBsZWZ0O1xuLy8gICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuLy8gfVxuXG4vLyBzdmc6bGFzdC1vZi10eXBlIHtcbi8vICAgbWFyZ2luLXJpZ2h0OiAwO1xuLy8gfVxuXG4vLyAuZGF0YS10YWJsZSB7XG4vLyAgIHdpZHRoOiAxMDAlO1xuLy8gICBvdmVyZmxvdy14OiBzY3JvbGw7XG4vLyAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbi8vIH1cblxuLy8gTk9UIFdPUktJTkdcbi5ib2R5Y29udGFpbmVyIHtcbiAgLy8gIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi50YWJsZS1zY3JvbGxhYmxlIHtcbiAgLy8gb3ZlcmZsb3cteDogc2Nyb2xsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cblxuLy8gRmlsZSBVcGxvYWRcbnVsLCAgXG5saSB7ICBcbiAgICAgIG1hcmdpbjogMDsgIFxuICAgICAgcGFkZGluZzogMDsgIFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTsgIFxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 99858:
/*!****************************************************************!*\
  !*** ./src/app/pages/list-services/list-services.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListServicesComponent: () => (/* binding */ ListServicesComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsonform/jsonform.component */ 80106);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-confirmation-popover */ 71479);










function ListServicesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.oEntity.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.oEntity.ADDRESS);
  }
}
const _c0 = function () {
  return ["fas", "times"];
};
const _c1 = function () {
  return ["fas", "users"];
};
const _c2 = function () {
  return ["fas", "qrcode"];
};
const _c3 = function () {
  return ["fas", "clock"];
};
function ListServicesComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td")(2, "fa-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("confirm", function ListServicesComponent_tr_28_Template_fa_icon_confirm_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.onRemove(o_r4));
    })("cancel", function ListServicesComponent_tr_28_Template_fa_icon_cancel_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_tr_28_Template_div_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r8.onAddEdit(o_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "td")(16, "fa-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_tr_28_Template_fa_icon_click_16_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.onShowUsers(o_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "fa-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_tr_28_Template_fa_icon_click_17_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](30);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r10.onShowQR(o_r4, _r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "fa-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_tr_28_Template_fa_icon_click_18_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const o_r4 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.onBusinessHours(o_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](11, _c0))("popoverTitle", ctx_r1.sDeleteTitle)("popoverMessage", ctx_r1.sDeleteMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", o_r4.NAME, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r4.PREFIX);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r4.STARTQN);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r4.RECYCLEEOD);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r4.ISACTIVE);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](12, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](13, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](14, _c3));
  }
}
function ListServicesComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 22)(1, "h2", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_ng_template_29_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const modal_r12 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](modal_r12.dismiss("Cross click"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r3.sQRCodeTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r3.svg, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
  }
}
const _c4 = function () {
  return ["fas", "arrow-left"];
};
const _c5 = function () {
  return ["fas", "plus"];
};
/* Font Awesome Icons */
// https://fontawesome.com/icons?d=gallery&q=edit
class ListServicesComponent extends _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__.JSONFormComponent {
  onBack() {
    // this.oLocation.back();
    this.router.navigateByUrl('/clinics', {
      state: {
        "oEntity": this.oEntity
      }
    });
    //    window.history.go(-2);
  }

  constructor(oLocation, modalService, oAPIService, router, sanitizer) {
    super();
    this.oLocation = oLocation;
    this.modalService = modalService;
    this.oAPIService = oAPIService;
    this.router = router;
    this.sanitizer = sanitizer;
    this.sDeleteTitle = 'Confirm Delete';
    this.sDeleteMessage = 'Delete Service';
    this.confirmClicked = false;
    this.cancelClicked = false;
    this.sTitle = 'Services';
    this.oEntity = {};
    this.oItems = [];
    //  loading: Loading;
    this.bDisabled = true;
    this.bLoaded = false;
    this.sQRCodeTitle = "";
    // this.oEntity = JSON.parse(localStorage.getItem("oEntity")||'');
    this.oEntity = oAPIService.getJSONFromLocalStorage('oEntity');
    if (this.oEntity === undefined || this.oEntity == null) {
      this.router.navigateByUrl('/clinics');
      return;
    }
    //    console.log(this.oEntity);
    //   if (this.oEntity === undefined || this.oEntity == null) {
    //   var o = this.oLocation.getState();
    //   this.oEntity = o['oEntityItem'];
    //   //      console.log(this.oEntity);  
    // }
  }
  //   constructordd(private router: Router, private route: ActivatedRoute, private oAPIService: ApiServiceProvider, private confirmationDialogService: ConfirmationDialogService, private modalService: NgbModal, private sanitizer: DomSanitizer) {
  //     localStorage.removeItem("oServiceItem");
  //     this.oEntity = JSON.parse(localStorage.getItem("oEntityItem"));
  //     console.log(this.oEntity) ;
  // //    this.oEntity = navParams.get("oEntity");
  //     // this.oAPIService.send2ServerP("services/" + Global_Variables.oEID + "/all", true).then((data: any) => {
  //     //   this.oItems = data.result;
  //     //   this.bLoaded = true;
  //     // });
  //   }
  ngOnInit() {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.bLoaded = false;
      if (_this.oEntity == null) {
        //      await this.router.navigateByUrl('/clinics');
        return;
      }
      //    console.log(this.oEntity);
      _this.oAPIService.send2ServerP("services/" + _this.oEntity.ID + "/all", true).then(data => {
        _this.oItems = data.result;
        console.log(_this.oItems);
        // this.loading.dismiss();
        _this.bLoaded = true;
        //      this.bShowSpinner = false;
      });
      // }
      // ionViewWillEnter() {
      // this.loading = this.loadingCtrl.create({
      //   content: 'loading...',
      // });
      // this.loading.present();
      // this.oAPIService.send2ServerP("services/" + this.oEntity.ID + "/all", true).then((data: any) => {
      //   this.oItems = data.result;
      //   console.log(this.oItems) ;
      //   // this.loading.dismiss();
      //   // this.bLoaded = true;
      // });
    })();
  }
  // onGetQN(oItem: any) {
  //   this.oAPIService.send2ServerP("gqn/" + Global_Variables.oEID + "/" + oItem.ID, true).then((data: any) => {
  //     if (data._error) {
  //       console.log(data._error);
  //       return;
  //     }
  //     oItem.ISSUEDQN = data.result[0].QUEUEN;
  //     oItem.CURRENTQN = data.result[0].CURRENTQN;
  //     oItem._D = [];
  //     oItem._D.push({ QUEUEN: oItem.ISSUEDQN });
  //   });
  // }
  onAddEdit(oItem = null) {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (oItem != null) localStorage.setItem("oService", JSON.stringify(oItem));else localStorage.removeItem("oService");
      //    console.log('configured routes: ', this.router.config);
      if (oItem != null) yield _this2.router.navigateByUrl('edit-service', {
        state: {
          "oEntity": _this2.oEntity,
          "oService": oItem
        }
      });else yield _this2.router.navigateByUrl('edit-service', {
        state: {
          "oEntity": _this2.oEntity
        }
      });
      // this.router.navigate(['edit-service'] , { relativeTo: this.route });
    })();
  }
  // showCalendar ( ) {
  //   this.navCtrl.push ( "WorkingHoursPage", { Item: this.oEntity }) ;
  // }
  onRemove(oItem) {
    var _this3 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // if (!await super.confirmDialog("Confirm Deletion", `Delete  ${oItem.NAME}`))
      //   return;
      try {
        //           this.bShowSpinner = true;
        _this3.oAPIService.send2ServerP("services/" + oItem.ID + "/delete", true, oItem).then(data => {
          _this3.ngOnInit();
          return;
        });
      } catch (err) {
        console.log("Failed ", err);
      } finally {
        //      this.bShowSpinner = false;
      }
      // this.confirmationDialogService.confirm('Confirm Deletion', 'Delete ' + oItem.NAME, 'Yes Delete')
      //   .then((confirmed) => {
      //     console.log('User confirmed:', confirmed)
      //     if (confirmed == true) {
      //       super.getDataService().send2ServerP("services/" + oItem.ID + "/delete", true, oItem).then((data) => {
      //         this.ngOnInit();
      //         return;
      //       })
      //         .catch((err) => {
      //           alert("Error deleting");
      //           // let alert = this.alertCtrl.create({
      //           //   title: 'Saved',
      //           //   subTitle: 'Successfully',
      //           //   buttons: ['Dismiss']
      //           // });
      //           // alert.present();
      //         });
      //     }
      //   })
      //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    })();
  }

  onShowUsers(oItem) {
    var _this4 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      localStorage.setItem("oService", JSON.stringify(oItem));
      // console.log('configured routes: ', this.router.config);
      // this.router.navigate(['users'], { relativeTo: this.route });
      yield _this4.router.navigateByUrl('users', {
        state: {
          "oService": oItem
        }
      });
    })();
  }
  onShowQR(oItem, content) {
    //    var oItem = JSON.parse(localStorage.getItem("oService"));
    console.info("***", oItem);
    this.sQRCodeTitle = oItem['NAME'];
    // console.log("Called onShowQR " + JSON.stringify(oItem)) ;
    this.oAPIService.send2ServerPImage('qr/' + oItem.IQSERVICEID).then(data => {
      //      console.log(data ) ;
      this.svg = this.sanitizer.bypassSecurityTrustHtml(data);
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then(result => {
        //        console.log("Closed Reason: " + result) ;
        // this.closeResult = `Closed with: ${result}`;
      }, reason => {
        //        console.log("Closed Reason: " + reason) ;
      });
    }).catch(err => {
      console.log(err);
    });
  }
  onSelectedItem(oItem) {
    console.log("Called SelectedItem");
    localStorage.setItem("oService", JSON.stringify(oItem));
  }
  onBusinessHours(oItem) {
    var _this5 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(oItem);
      localStorage.setItem("oService", JSON.stringify(oItem));
      // this.router.navigate(['business-hours'], { relativeTo: this.route });
      _this5.router.navigateByUrl('business-hours', {
        state: {
          "oService": oItem
        }
      }).then(aa => {
        console.log("KO");
      }).catch(err => {
        console.log(err);
      });
    })();
  }
  static #_ = this.ɵfac = function ListServicesComponent_Factory(t) {
    return new (t || ListServicesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ListServicesComponent,
    selectors: [["app-list-services"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 31,
    vars: 7,
    consts: [[1, "full-screen"], ["src", "https://www.starpng.com/public/uploads/preview/thin-crayon-divider-line-png-51575739708kixuhrawiv.png", "id", "dummy-image"], [1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["size", "1x", "toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "card", 2, "width", "100%"], [1, "card-header"], [4, "ngIf"], [1, "bodycontainer", "scrollable"], [1, "card-table", "table", 2, "width", "100%"], ["scope", "col"], ["scope", "col", 1, "text-center"], ["size", "1x", "toggle", "tooltip", "title", "New Service!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [4, "ngFor", "ngForOf"], ["qrdialog", ""], ["size", "1x", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Clinic!", 1, "btn", "btn-danger", "btn-sm", "mr-1", 3, "icon", "popoverTitle", "popoverMessage", "confirm", "cancel"], [1, "ksd-tooltip", 3, "click"], [1, "ksd-tooltiptext"], ["size", "1x", "toggle", "tooltip", "title", "Show Users", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["size", "1x", "toggle", "tooltip", "title", "Show QR Code", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], ["size", "1x", "toggle", "tooltip", "title", "Working Hours!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "modal-header"], ["id", "modal-basic-title", 1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "svg", 3, "innerHTML"]],
    template: function ListServicesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5")(6, "fa-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_Template_fa_icon_click_6_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ListServicesComponent_div_10_Template, 5, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 9)(12, "table", 10)(13, "thead")(14, "tr")(15, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Prefix");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "StartQ#");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Recycle Q# EOD");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "IsActive");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "th", 12)(26, "fa-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListServicesComponent_Template_fa_icon_click_26_listener() {
          return ctx.onAddEdit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, ListServicesComponent_tr_28_Template, 19, 15, "tr", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, ListServicesComponent_ng_template_29_Template, 8, 2, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](5, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bLoaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](6, _c5));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.oItems);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__.FaIconComponent, angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_9__.ConfirmationPopoverDirective],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 77637:
/*!**********************************************************!*\
  !*** ./src/app/pages/list-users/list-users.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListUsersComponent: () => (/* binding */ ListUsersComponent)
/* harmony export */ });
/* harmony import */ var _Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsonform/jsonform.component */ 80106);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 60683);
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-confirmation-popover */ 71479);

//import { CommonUIComponent } from '../common-ui/common-ui.component';
//import { MatDialog } from '@angular/material/dialog';
//import { Location } from '@angular/common';
// import { faPlus, faPlusSquare, faEdit, faTimes, faUserEdit, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core'









function ListUsersComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.oEntity.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.oService.NAME);
  }
}
const _c0 = function () {
  return ["fas", "times"];
};
function ListUsersComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td")(2, "fa-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("confirm", function ListUsersComponent_tr_24_Template_fa_icon_confirm_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const o_r2 = restoredCtx.$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.onRemove(o_r2));
    })("cancel", function ListUsersComponent_tr_24_Template_fa_icon_cancel_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.cancelClicked = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListUsersComponent_tr_24_Template_div_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const o_r2 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r6.onAddEdit(o_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td")(8, "select", 18)(9, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Entity Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Service Counter");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Display");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Printer");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](6, _c0))("popoverTitle", ctx_r1.sDeleteTitle)("popoverMessage", ctx_r1.sDeleteMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", o_r2.EMAIL, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("value", o_r2.ACCESS);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r2.ISACTIVE);
  }
}
const _c1 = function () {
  return ["fas", "arrow-left"];
};
const _c2 = function () {
  return ["fas", "plus"];
};
/* Font Awesome Icons */
// https://fontawesome.com/icons?d=gallery&q=edit
class ListUsersComponent extends _jsonform_jsonform_component__WEBPACK_IMPORTED_MODULE_1__.JSONFormComponent {
  onBack() {
    // this.oLocation.back();
    this.router.navigateByUrl('/services', {
      state: {
        "oEntity": this.oEntity
      }
    });
    //    window.history.go(-2);
  }

  ngOnInit() {
    this.bLoaded = false;
    this.oAPIService.send2ServerP("users/" + this.oService.ENTITYID + "/" + this.oService.ID + "/all", true).then(data => {
      this.oItems = data.result;
      // this.loading.dismiss();
      console.log(this.oItems);
      this.bLoaded = true;
    });
  }
  constructor(modalService, oAPIService, router, route) {
    super();
    this.modalService = modalService;
    this.oAPIService = oAPIService;
    this.router = router;
    this.route = route;
    this.sDeleteTitle = 'Confirm Delete';
    this.sDeleteMessage = 'Delete User';
    this.confirmClicked = false;
    this.cancelClicked = false;
    this.sTitle = 'Users';
    //  oEntity: any = {};
    this.oItems = [];
    //  loading: Loading;
    this.bDisabled = true;
    this.bLoaded = false;
    this.oEntity = {};
    this.oService = {};
    // this.oEntity = JSON.parse(localStorage.getItem("oEntity")|| '');
    // this.oService = JSON.parse(localStorage.getItem("oService")|| '');
    this.oService = oAPIService.getJSONFromLocalStorage('oService');
    this.oEntity = oAPIService.getJSONFromLocalStorage('oEntity');
    // var o = this.oLocation.getState();
    // this.oService = o['oService'];
    // console.log(this.oService);
  }
  // constructor(public navCtrl: NavController, public navParams: NavParams, private readonly oAPIService: ApiServiceProvider,
  //   private readonly loadingCtrl: LoadingController,
  //   public modalCtrl: ModalController, public viewCtrl: ViewController) {
  //     console.log(navParams) ;
  //     this.oItem = navParams.get("PServiceItem");
  //     // this.oAPIService.send2ServerP("entity/" + this.oItem.ID, true ).then((data) => {
  //     //   this.oEntity = data.result[0];
  //     // }).catch(e => {
  //     //   console.log(e) ;
  //     // });
  //   // var oEntityInfo = navParams.get("PEntity");
  //   // this.oAPIService.send2ServerP("entity/" + oEntityInfo.ID, true ).then((data) => {
  //   //   this.oEntity = data.result[0];
  //   // });
  // }
  // ionViewDidLoad(){
  //   this.bLoaded = false;
  //   // this.loading = this.loadingCtrl.create({
  //   //   content: 'loading...',
  //   // });
  //   // this.loading.present();
  //   this.oAPIService.send2ServerP("users/" + this.oItem.ENTITYID + "/" + this.oItem.ID + "/all", true).then((data: any) => {
  //     this.oItems = data.result;
  //     // this.loading.dismiss();
  //     this.bLoaded = true;
  //   });
  // }
  onAddEdit(oItem = null) {
    var _this = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // localStorage.removeItem("oUserItem") ;
      // localStorage.setItem("oService", JSON.stringify(this.oItem));
      // if ( oItem != null )
      //   localStorage.setItem("oUserItem", JSON.stringify(oItem));
      // this.router.navigate(['edit-user'], { relativeTo: this.route });
      if (oItem != null) localStorage.setItem("oUser", JSON.stringify(oItem));else localStorage.removeItem("oUser");
      if (oItem != null) yield _this.router.navigateByUrl('edit-user', {
        state: {
          "oService": _this.oService,
          "oUserItem": oItem
        }
      });else yield _this.router.navigateByUrl('edit-user', {
        state: {
          "oService": _this.oService
        }
      });
    })();
  }
  onResetPassword(oItem) {
    console.log("Reset Password");
    console.log(oItem);
    this.oAPIService.send2ServerRoot("/resetpwd", true, oItem).then(data => {
      console.log(data);
    }).catch(err => {
      alert("Error Resetting Password");
    });
  }
  onRemove(oItem) {
    var _this2 = this;
    return (0,_Users_uqapp_qstatus_qweb_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // if (!await super.confirmDialog("Confirm Deletion", `Delete  ${oItem.EMAIL}`))
      //   return;
      try {
        //      this.bShowSpinner = true;
        _this2.oAPIService.send2ServerP("users/" + _this2.oService.ENTITYID + "/" + _this2.oService.ID + '/' + oItem.UID + "/delete", true, oItem).then(data => {
          _this2.ngOnInit();
          return;
        });
      } catch (err) {
        console.log("Failed ", err);
      } finally {
        //      this.bShowSpinner = false;
      }
    })();
  }
  static #_ = this.ɵfac = function ListUsersComponent_Factory(t) {
    return new (t || ListUsersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ListUsersComponent,
    selectors: [["app-list-users"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 25,
    vars: 7,
    consts: [[1, "full-screen"], ["src", "https://www.starpng.com/public/uploads/preview/thin-crayon-divider-line-png-51575739708kixuhrawiv.png", "id", "dummy-image"], [1, "edit-title"], [1, "row"], [1, "col-sm-6"], ["size", "1x", "toggle", "tooltip", "title", "List Clinics", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [1, "card", 2, "width", "100%"], [1, "card-header"], [4, "ngIf"], [1, "bodycontainer", "scrollable"], [1, "card-table", "table", 2, "width", "100%"], ["scope", "col"], ["scope", "col", 1, "text-center"], ["size", "1x", "toggle", "tooltip", "title", "New Service!", 1, "btn", "btn-primary", "btn-sm", "mr-1", 3, "icon", "click"], [4, "ngFor", "ngForOf"], ["size", "1x", "mwlConfirmationPopover", "", "placement", "right", "toggle", "tooltip", "title", "Delete Clinic!", 1, "btn", "btn-danger", "btn-sm", "mr-1", 3, "icon", "popoverTitle", "popoverMessage", "confirm", "cancel"], [1, "ksd-tooltip", 3, "click"], [1, "ksd-tooltiptext"], ["disabled", "", 1, "browser-default", "custom-select", 3, "value"], ["value", "A"], ["value", "s"], ["value", "d"], ["value", "p"]],
    template: function ListUsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5")(6, "fa-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListUsersComponent_Template_fa_icon_click_6_listener() {
          return ctx.onBack();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ListUsersComponent_div_10_Template, 5, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 9)(12, "table", 10)(13, "thead")(14, "tr")(15, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Role");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "th", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "IsActive");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "th", 12)(22, "fa-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ListUsersComponent_Template_fa_icon_click_22_listener() {
          return ctx.onAddEdit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, ListUsersComponent_tr_24_Template, 19, 7, "tr", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](5, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.sTitle, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bLoaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](6, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.oItems);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__.FaIconComponent, angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_9__.ConfirmationPopoverDirective],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 64440:
/*!******************************************************!*\
  !*** ./src/app/pages/messages/messages.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessagesComponent: () => (/* binding */ MessagesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_services */ 57870);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);



function MessagesComponent_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "td")(10, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MessagesComponent_tr_11_Template_input_click_10_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const o_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onDeleteMessage(o_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](o_r1.NAME);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](o_r1.PHONE);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](o_r1.EMAIL);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](o_r1.MESSAGE);
  }
}
class MessagesComponent {
  constructor(oAPIService) {
    this.oAPIService = oAPIService;
    this.oMessages = [];
  }
  ngOnInit() {
    this.oAPIService.send2ServerP("messages", true).then(data => {
      this.oMessages = data.result;
      console.log(this.oMessages);
    });
  }
  onDeleteMessage(oItem) {
    this.oAPIService.send2ServerP("messages/" + oItem.ID + "/delete", true).then(data => {
      var index = this.oMessages.indexOf(oItem);
      if (index !== -1) this.oMessages.splice(index, 1);
    });
  }
  static #_ = this.ɵfac = function MessagesComponent_Factory(t) {
    return new (t || MessagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_0__.DataService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MessagesComponent,
    selectors: [["app-messages"]],
    decls: 12,
    vars: 1,
    consts: [[1, "row"], [1, "col-lg-6"], ["width", "100%"], [4, "ngFor", "ngForOf"], ["type", "button", "value", "Delete", 1, "danger", 3, "click"]],
    template: function MessagesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "table", 2)(3, "thead")(4, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Clinic");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, MessagesComponent_tr_11_Template, 11, 4, "tr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.oMessages);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1132:
/*!************************************************************!*\
  !*** ./src/app/pages/mqtt-status/mqtt-status.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MqttStatusComponent: () => (/* binding */ MqttStatusComponent)
/* harmony export */ });
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! abstract-mqtt */ 31820);
/* harmony import */ var abstract_mqtt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(abstract_mqtt__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../env.properties */ 12430);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ 94289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app/_services */ 57870);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);


// import { UUID } from 'angular2-uuid';




function MqttStatusComponent_tr_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r1.Display);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r1.Value);
  }
}
var Global_Variables = {
  // iUserID: '',
  // sUserType: 'N',
  //  isConnected: true,
  // token: null,
  // // DeviceID: "None",
  // oEID: -1,
  // sEntityID: 0,
  //  oRItem: null,
  //  oMenuItems: [],
  // sCurrentPage: 'entities',
  // bSaved: false,
  // InstantQ: '',
  // sDeviceUUID: null,
  // sDeviceReg: null,
  //  sCountry: '',
  // sTZ: '',
  // sNewDeviceReg: '',
  //  DOW: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'PH']
};
class MqttStatusComponent extends abstract_mqtt__WEBPACK_IMPORTED_MODULE_0__.MqttService {
  //  oSub: any = null;
  constructor(authenticationService) {
    super(_env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_HOST, _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_PORT, Global_Variables, false);
    this.authenticationService = authenticationService;
    this.oOptions = {
      useSSL: _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_USESSL,
      userName: "test",
      password: "test12"
    };
    this.sMqttHost = _env_properties__WEBPACK_IMPORTED_MODULE_1__.MQTT_HOST;
    this.oItems = [{
      Topic: '$SYS/broker/clients/connected',
      Display: 'Connected Clients',
      Value: '0'
    }
    //      ,'$SYS/broker/clients/disconnected'
    , {
      Topic: '$SYS/broker/clients/total',
      Display: 'Connected Clients',
      Value: '0'
    }, {
      Topic: '$SYS/broker/messages/inflight',
      Display: 'Inflight Msg Requiring Ack',
      Value: '0'
    }
    //      ,'$SYS/broker/messages/sent'
    //      ,'$SYS/broker/uptime'
    ];

    super.setMqttOptions(this.oOptions);
    this.user = this.authenticationService.userValue;
    // this.oSub = this.authenticationService.user.subscribe(x => {
    //   this.user = x;
    // });
  }

  getMqttHost() {
    return this.sMqttHost;
  }
  getClientID() {
    return "admin-" + (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
    // return "admin-" + UUID.UUID();
  }

  ngOnInit() {
    super.setConnect(true);
    this.oItems.forEach(oItem => {
      super.subscribe(oItem.Topic);
    });
  }
  ngOnDestroy() {
    console.log("ngOnDestroy");
    try {
      super.setConnect(false);
    } catch (err) {}
  }
  processMessage(message) {
    var t = super.getTopicPathInArray(message);
    if (t[0] == 'ServerUp') return;
    if (t[0] == 'IP') {
      this.oMqttStatus = message.payloadString;
      return;
    }
    //    var m = super.getMessageInArray(message);
    this.oItems.forEach(oItem => {
      if (oItem.Topic == message.destinationName) {
        oItem.Value = message.payloadString;
      }
    });
  }
  getUserName() {
    // if (this.oSub != null && this.user.access_token !== undefined) {
    //   this.oSub.unsubscribe();
    //   this.oSub = null;
    // }
    return this.user.access_token || '';
  }
  static #_ = this.ɵfac = function MqttStatusComponent_Factory(t) {
    return new (t || MqttStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_app_services__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: MqttStatusComponent,
    selectors: [["app-mqtt-status"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
    decls: 5,
    vars: 2,
    consts: [[4, "ngFor", "ngForOf"]],
    template: function MqttStatusComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tbody")(1, "tr")(2, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, MqttStatusComponent_tr_4_Template, 5, 2, "tr", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Status ", ctx.oMqttStatus, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.oItems);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 12430:
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
const sEndPoint = "https://api.bullish.sg";
const MQTT_HOST = 'msg.bullish.sg';
const MQTT_PORT = 443;
const MQTT_USESSL = true;

/***/ }),

/***/ 14913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 78629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map