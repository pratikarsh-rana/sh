(function() {
var exports = {};
exports.id = 73;
exports.ids = [73];
exports.modules = {

/***/ 2711:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

/* ExperienceSchema will correspond to a collection in your MongoDB database. */

const ExperienceSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  resumeId: {
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Resume',
    required: [true, 'Resume Required']
  },
  userId: {
    type: String,
    required: [true, 'Please enter the experience owner id.']
  },
  years: {
    type: String,
    required: [true, 'Please enter years of experience.']
  },
  designation: {
    type: String,
    required: [true, 'Please provide a designation your experience.']
  },
  company: {
    type: String,
    required: [true, "Please provide the company's name."]
  },
  startedAt: {
    type: String,
    required: [true, 'Please specify the end date of your experience']
  },
  endedAt: {
    type: String,
    required: [true, 'Please specify the end date of your experience.']
  },
  description: {
    type: String,
    required: [true, 'Please enter the description for this experience.']
  },
  country: {
    type: String,
    required: [true, 'Please enter the country where you had this experience.']
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true
});
/* harmony default export */ __webpack_exports__["Z"] = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Experience) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Experience', ExperienceSchema));

/***/ }),

/***/ 4138:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

/* ResumeSchema will correspond to a collection in your MongoDB database. */

const ResumeSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  title: {
    type: String,
    required: [true, 'A Resume must have a title.']
  },
  template: {
    type: Boolean,
    default: false
  },
  templateName: {
    type: String
  },
  userId: {
    type: String,
    required: [true, "Please enter the resume's owner id."]
  },
  personal: {
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Personal'
  },
  experience: [{
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Experience'
  }],
  education: [{
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Education'
  }],
  extras: [{
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Extras'
  }],
  customStyles: {
    font: {
      type: String,
      default: 'Poppins'
    }
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true
});
/* harmony default export */ __webpack_exports__["Z"] = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Resume) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Resume', ResumeSchema));

/***/ }),

/***/ 4027:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8670);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Experience__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2711);
/* harmony import */ var _models_Resume__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4138);
/* harmony import */ var _shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(666);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // eslint-disable-next-line consistent-return

/* harmony default export */ __webpack_exports__["default"] = ((0,_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__.requireSession)(async (req, res) => {
  const {
    body,
    method
  } = req;
  await (0,_shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)();

  switch (method) {
    case 'POST':
      try {
        const experience = await _models_Experience__WEBPACK_IMPORTED_MODULE_1__/* .default.create */ .Z.create(_objectSpread(_objectSpread({}, body), {}, {
          userId: req.session.userId
        }));
        const resume = await _models_Resume__WEBPACK_IMPORTED_MODULE_2__/* .default.findOneAndUpdate */ .Z.findOneAndUpdate({
          _id: body.resumeId,
          userId: req.session.userId
        }, {
          $addToSet: {
            experience: experience._id
          }
        });

        if (!experience) {
          return res.status(400).json({
            success: false,
            error: 'Unable to create Experience data.'
          });
        }

        res.status(201).json({
          success: true,
          experience
        });
      } catch (error) {
        // console.log(error);
        res.status(400).json({
          success: false,
          error
        });
      }

      break;

    default:
      res.status(400).json({
        success: false,
        error: "This route doesn't exist."
      });
      break;
  }
}));

/***/ }),

/***/ 666:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const MONGO_URI = process.env.NEXT_PUBLIC_MONOGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */


let cached = global.mongoose;

if (!cached) {
  cached = {
    conn: null,
    promise: null
  };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true
    };
    cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGO_URI, opts).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* harmony default export */ __webpack_exports__["Z"] = (dbConnect);

/***/ }),

/***/ 8670:
/***/ (function(module) {

"use strict";
module.exports = require("@clerk/clerk-sdk-node");;

/***/ }),

/***/ 5619:
/***/ (function(module) {

"use strict";
module.exports = require("mongoose");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(4027));
module.exports = __webpack_exports__;

})();