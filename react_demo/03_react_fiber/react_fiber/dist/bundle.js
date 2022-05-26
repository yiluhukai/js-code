/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/CreateElement/createElement.js":
/*!**************************************************!*\
  !*** ./src/react/CreateElement/createElement.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // 当我们的子元素是一个数组是需要拆分
  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    // 忽略布尔值和null
    if (child !== true && child !== false && child !== null) {
      // 不是对象的时候是文本节点
      if (child instanceof Object) {
        result.push(child);
      } else {
        //文本节点
        result.push(createElement("text", {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    props: Object.assign({
      children: childElements
    }, props),
    children: childElements
  };
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _updateElementNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateElementNode */ "./src/react/DOM/updateElementNode.js");


var createDOMElement = function createDOMElement(virtualDom) {
  // 先判断是不是文本节点
  var dom = null;

  if (virtualDom.type === "text") {
    dom = document.createTextNode(virtualDom.props.textContent);
  } else {
    // 是一个元素节点
    dom = document.createElement(virtualDom.type);
    (0,_updateElementNode__WEBPACK_IMPORTED_MODULE_0__["default"])(virtualDom, dom);
  }

  return dom;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDOMElement);

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");


/***/ }),

/***/ "./src/react/DOM/updateElementNode.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateElementNode.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateElementNode)
/* harmony export */ });
function updateElementNode(virtualDom, newElement) {
  var oldVirtualDom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var propsObj = virtualDom.props || {};
  var oldPropsObj = oldVirtualDom.props || {};
  Object.keys(propsObj).forEach(function (prop) {
    var propValue = propsObj[prop];
    var oldPropValue = oldPropsObj[prop];

    if (propValue !== oldPropValue) {
      if (prop.slice(0, 2) === "on") {
        // 当我们要添加的属性是元素的事件
        var eventName = prop.slice(2).toLowerCase();

        if (oldPropValue) {
          // 删除旧的事件
          newElement.removeEventListener(eventName, oldPropValue);
        }

        newElement.addEventListener(eventName, propValue);
      } else if (prop === "value" || prop === "checked") {
        // bool属性
        newElement[prop] = propValue;
      } else if (prop !== "children") {
        // class属性和其他的属性
        if (prop === "className") {
          newElement.setAttribute("class", propValue);
        } else {
          newElement.setAttribute(prop, propValue);
        }
      }
    }
  }); // 判断属性被删除的情况(旧的虚拟上有但是新的没有)

  Object.keys(oldPropsObj).forEach(function (prop) {
    var propValue = propsObj[prop];
    var oldPropValue = oldPropsObj[prop];

    if (!propValue) {
      if (prop.slice(0, 2) === "on") {
        var eventName = prop.slice(2).toLowerCase();
        newElement.removeEventListener(eventName, oldPropValue);
      } else if (prop !== "children") {
        newElement.removeAttribute(prop);
      }
    }
  });
  newElement._virtualDom = virtualDom;
}

/***/ }),

/***/ "./src/react/Misc/Arrified/index.js":
/*!******************************************!*\
  !*** ./src/react/Misc/Arrified/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var arrified = function arrified(arg) {
  return Array.isArray(arg) ? arg : [arg];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrified);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskQueue": () => (/* binding */ createTaskQueue)
/* harmony export */ });
/**
 * 导入一个生成任务队列的方法
 */
var createTaskQueue = function createTaskQueue() {
  var queue = [];
  return {
    push: function push(task) {
      return queue.push(task);
    },
    pop: function pop() {
      return queue.shift();
    },
    isEmpty: function isEmpty() {
      return queue.length === 0;
    }
  };
};

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");


var createStateNode = function createStateNode(fiber) {
  // 文本节点和元素节点
  if (fiber.tag === "host_component") {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/getTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getTag = function getTag(vdom) {
  // 文本节点和元素节点
  if (typeof vdom.type === "string") {
    return "host_component";
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrified": () => (/* reexport safe */ _Arrified__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _createStateNode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "createTaskQueue": () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue),
/* harmony export */   "getTag": () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrified */ "./src/react/Misc/Arrified/index.js");
/* harmony import */ var _createStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createStateNode */ "./src/react/Misc/createStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");





/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "render": () => (/* reexport safe */ _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)
/* harmony export */ });
/* harmony import */ var _CreateElement_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement/createElement */ "./src/react/CreateElement/createElement.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement_createElement__WEBPACK_IMPORTED_MODULE_0__.createElement
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
/**
 *
 * 实现render方法：
 *
 * render方法主要功能：1.向任务队列中添加任务
 *                  2. 浏览器空闲的时候从任务队列中取出任务执行
 *
 * 任务：这里的任务就是通过vdom对象构建fiber对象
 *
 */

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
var subTask = null;

var getFirstTask = function getFirstTask() {
  /**
   * 获取任务队列队列中第一个任务的子任务
   *
   */
  var subTask = taskQueue.pop(); // console.error(subTask);

  /**
   * 构建fiber对象(最晚层元素root对应的fiber对象)
   */

  return {
    props: subTask.props,
    stateNode: subTask.dom,
    //当前fiber对象对应的dom
    tag: "hostRoot",
    //根节点
    effects: [],
    child: null //后面构建了子fiber节点再去设置

  };
};
/**
 *
 * @param {*} fiber 父fiber对象
 * @param {Array | Object} children 虚拟dom
 */


var reconcileChildren = function reconcileChildren(fiber, children) {
  //当children是根fiber对象时，children是对象，当是用creaeElement方法创建的，则是数组
  // 将children转成数组统一处理
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.arrified)(children);
  var index = 0,
      element = null,
      length = arrifiedChildren.length,
      newFiber = null,
      prevFiber = null;

  while (index < length) {
    element = arrifiedChildren[index]; // 将当前的虚拟dom构建成fiber对象

    newFiber = {
      type: element.type,
      props: element.props,
      tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
      effects: [],
      effectTag: "placement",
      // 添加节点
      // stateNode: null,
      parent: fiber
    }; // 给新创建的fiber对象添加stateNode属性

    newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);

    if (index == 0) {
      // 作为当前节点的child
      fiber.child = newFiber;
    } else {
      //作为前一个兄弟节点的邻居节点
      prevFiber.subling = newFiber;
    }

    prevFiber = newFiber;
    index++;
  }
};

var executeTask = function executeTask(fiber) {
  /**
   * 构建当前fiber对象的子fiber对象
   */
  reconcileChildren(fiber, fiber.props.children); // 下次任务时继续构建fiber.child对象,z这块只处理了子节点，没有处理兄弟节点

  if (fiber.child) {
    return fiber.child;
  } // 当没有子节点的时候，开始去查找兄弟节点并构建fiber对象


  var currentFiber = fiber;

  while (currentFiber.parent) {
    // 存放当前节点下的所有fiber对象，包含自身
    currentFiber.parent.effects = currentFiber.parent.effects.concat(currentFiber.effects.concat([currentFiber]));

    if (currentFiber.subling) {
      return currentFiber.subling; // 基于该节点去构建
    }

    currentFiber = currentFiber.parent; // 向上去处理父节点subling节点
  }

  console.dir(fiber);
};

var workLoop = function workLoop(deadline) {
  if (!subTask) {
    subTask = getFirstTask(); // console.log(subTask);
  }

  while (subTask && deadline.timeRemaining() > 1) {
    // 执行任务并返回一个新的任务,这里的任务是构建好的fiber对象
    subTask = executeTask(subTask);
  }
}; // 执行任务


var performTask = function performTask(deadline) {
  // 开启任务循环
  workLoop(deadline); // 当任务执行中断后中心执行

  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};
/**
 * render方法的参数，第一个element代表虚拟dom，第二个参数代表根元素
 */


function render(element, dom) {
  // 向任务队列中添加任务，将jsx最为当前元素的子元素
  taskQueue.push({
    dom: dom,
    props: {
      children: element
    }
  }); // 取出我们刚刚添加的任务
  // console.log(taskQueue);
  // 取出任务队列中的任务执行

  requestIdleCallback(performTask);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");

var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello wolrd!"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", null, "subling"));
console.log(jsx);
var root = document.getElementById("root");
(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)(jsx, root);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map