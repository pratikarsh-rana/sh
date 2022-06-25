(function() {
var exports = {};
exports.id = 410;
exports.ids = [410];
exports.modules = {

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

/***/ 7821:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8670);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Resume__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4138);
/* harmony import */ var _shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(666);


 // eslint-disable-next-line consistent-return

/* harmony default export */ __webpack_exports__["default"] = ((0,_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__.requireSession)(async (req, res) => {
  const {
    body,
    method
  } = req;
  await (0,_shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)();

  switch (method) {
    case 'GET':
      try {
        const {
          template,
          user
        } = req.query;
        const filterObj = {};
        if (template) filterObj.template = true;
        if (user) filterObj.userId = req.session.userId;
        const resume = await _models_Resume__WEBPACK_IMPORTED_MODULE_1__/* .default.find */ .Z.find(filterObj);

        if (!resume) {
          return res.status(400).json({
            success: false
          });
        }

        res.status(200).json({
          success: true,
          data: resume
        });
      } catch (error) {
        res.status(400).json({
          success: false
        });
      }

      break;

    case 'POST':
      try {
        const {
          title
        } = body;
        const resume = await _models_Resume__WEBPACK_IMPORTED_MODULE_1__/* .default.create */ .Z.create({
          title,
          userId: req.session.userId,
          templateName: body.templateName
        });

        if (!resume) {
          return res.status(400).json({
            success: false
          });
        }

        res.status(200).json({
          success: true,
          data: resume
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error
        });
      }

      break;

    default:
      res.status(400).json({
        success: false
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
var __webpack_exports__ = (__webpack_exec__(7821));
module.exports = __webpack_exports__;

})();