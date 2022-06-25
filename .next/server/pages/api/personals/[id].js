(function() {
var exports = {};
exports.id = 429;
exports.ids = [429];
exports.modules = {

/***/ 6379:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

/* PersonalSchema will correspond to a collection in your MongoDB database. */

const PersonalSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  resumeId: {
    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
    ref: 'Resume',
    required: [true, 'Resume Required']
  },
  userId: {
    type: String,
    required: [true, 'Please enter the personal data owner id.']
  },
  name: {
    type: String,
    required: [true, 'Please provide your name.']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.']
  },
  designation: {
    type: String,
    required: [true, 'Please provide your designation.']
  },
  country: {
    type: String,
    required: [true, 'Please provide your country.']
  },
  objective: {
    type: String
  },
  phoneNumber: {
    type: String
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
/* harmony default export */ __webpack_exports__["Z"] = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Personal) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Personal', PersonalSchema));

/***/ }),

/***/ 9098:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8670);
/* harmony import */ var _clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Personal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6379);
/* harmony import */ var _shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(666);


 // eslint-disable-next-line consistent-return

/* harmony default export */ __webpack_exports__["default"] = ((0,_clerk_clerk_sdk_node__WEBPACK_IMPORTED_MODULE_0__.requireSession)(async (req, res) => {
  const {
    query: {
      id
    },
    body,
    method
  } = req;
  await (0,_shared_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)();

  switch (method) {
    case 'PUT':
      try {
        const personal = await _models_Personal__WEBPACK_IMPORTED_MODULE_1__/* .default.findOneAndUpdate */ .Z.findOneAndUpdate({
          _id: id,
          userId: req.session.userId
        }, body, {
          new: true,
          runValidators: true
        });

        if (!personal) {
          return res.status(400).json({
            success: false,
            error: 'Unable to update personal data.'
          });
        }

        res.status(200).json({
          success: true,
          personal
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error
        });
      }

      break;

    case 'DELETE':
      try {
        await _models_Personal__WEBPACK_IMPORTED_MODULE_1__/* .default.findOneAndRemove */ .Z.findOneAndRemove({
          _id: id,
          userId: req.session.userId
        });
        res.status(204).json({
          success: true
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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(9098));
module.exports = __webpack_exports__;

})();