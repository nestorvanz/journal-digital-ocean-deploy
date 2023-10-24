/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appRouter = void 0;
const tslib_1 = __webpack_require__(1);
const express_1 = __webpack_require__(2);
const entry_1 = __webpack_require__(4);
const notebook_1 = __webpack_require__(58);
const user_1 = __webpack_require__(72);
const cors_1 = tslib_1.__importDefault(__webpack_require__(84));
const auth_1 = __webpack_require__(85);
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use((0, cors_1.default)({
    origin: ['http://localhost:7060', 'https://yournal.net'],
}));
exports.appRouter.use((0, express_1.json)());
exports.appRouter.use('/auth', auth_1.authRouter);
exports.appRouter.use('/entry', entry_1.entryRouter);
exports.appRouter.use('/notebook', notebook_1.notebookRouter);
exports.appRouter.use('/user', user_1.userRouter);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteEntryProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function deleteEntryProcess({ id }, { entryDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('delete_entry');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        yield entryDataAccess.delete(id);
        return;
    });
}
exports.deleteEntryProcess = deleteEntryProcess;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(9), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorIssueHandler = void 0;
const date_validator_class_1 = __webpack_require__(8);
const string_validator_class_1 = __webpack_require__(10);
class ErrorIssueHandler {
    constructor(issues = [], errorHanlder = null) {
        this.issues = issues;
        this.errorHanlder = errorHanlder;
    }
    add(type, expected, actual) {
        this.issues.push({ type, expected, actual });
        return this;
    }
    date(value) {
        return new date_validator_class_1.DateValidator(value, this.issues);
    }
    string(value) {
        return new string_validator_class_1.StringValidator(value, this.issues);
    }
    throw(status) {
        if (this.errorHanlder != null) {
            this.errorHanlder.throw(status);
        }
    }
}
exports.ErrorIssueHandler = ErrorIssueHandler;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateValidator = void 0;
const error_issue_type_enum_1 = __webpack_require__(9);
class DateValidator {
    constructor(value, issues) {
        this.value = value;
        this.issues = issues;
        this.continue = true;
        this.hasValidType = null;
        if (value != null) {
            this.validateType();
        }
    }
    if(value) {
        this.continue = value;
        return this;
    }
    max(value) {
        if (this.value != null && this.value > value) {
            this.issues.push({
                type: error_issue_type_enum_1.ErrorIssueType.Max,
                expected: value.toISOString(),
                actual: this.value.toISOString(),
            });
        }
        return this;
    }
    required() {
        if (this.value == null) {
            this.issues.push({
                type: error_issue_type_enum_1.ErrorIssueType.Empty,
            });
        }
        return this;
    }
    static isValidDate(value) {
        const dateFromRegex = DateValidator.regex.exec(value);
        if (!dateFromRegex) {
            return false;
        }
        const parsedDate = Date.parse(value);
        if (Number.isNaN(parsedDate)) {
            return false;
        }
        return true;
    }
    validateType() {
        this.value;
        if (this.hasValidType == null && this.value != null) {
            const date = new Date(this.value);
            if (date.toString() === 'Invalid Date') {
                this.hasValidType == false;
                this.issues.push({
                    type: error_issue_type_enum_1.ErrorIssueType.ValueType,
                });
            }
            else {
                this.hasValidType = true;
                this.value = date;
            }
        }
    }
}
exports.DateValidator = DateValidator;
DateValidator.regex = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorIssueType = void 0;
var ErrorIssueType;
(function (ErrorIssueType) {
    ErrorIssueType["Access"] = "ACCESS";
    ErrorIssueType["Empty"] = "EMPTY";
    ErrorIssueType["Exists"] = "EXISTS";
    ErrorIssueType["Internal"] = "INTERNAL";
    ErrorIssueType["Length"] = "LENGTH";
    ErrorIssueType["Max"] = "MAX";
    ErrorIssueType["MaxLength"] = "MAX_LENGTH";
    ErrorIssueType["Min"] = "MIN";
    ErrorIssueType["MinLength"] = "MIN_LENGTH";
    ErrorIssueType["ValueType"] = "VALUE_TYPE";
    ErrorIssueType["Validity"] = "VALIDITY";
})(ErrorIssueType || (exports.ErrorIssueType = ErrorIssueType = {}));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringValidator = void 0;
const error_issue_type_enum_1 = __webpack_require__(9);
class StringValidator {
    constructor(value, issues) {
        this.value = value;
        this.issues = issues;
        this.hasValue = value != null;
        this.hasValidType = null;
    }
    checkType() {
        if (this.hasValidType == null) {
            this.hasValidType = typeof this.value === 'string';
            if (!this.hasValidType) {
                this.issues.push({
                    type: error_issue_type_enum_1.ErrorIssueType.ValueType,
                    expected: 'string',
                    actual: this.value === null
                        ? 'null'
                        : this.value == undefined
                            ? 'undefined'
                            : typeof this.value,
                });
            }
        }
    }
    length(min, max) {
        if (this.hasValidType && this.hasValue) {
            this.checkType();
            const fixed = max == null ? min : null;
            if (fixed != null) {
                if (this.value != null && this.value.length !== fixed) {
                    this.issues.push({
                        type: error_issue_type_enum_1.ErrorIssueType.Length,
                        expected: min.toString(),
                        actual: this.value.length.toString(),
                    });
                }
            }
            else {
                this.minLength(min).maxLength(max !== null && max !== void 0 ? max : 0);
            }
        }
    }
    maxLength(length) {
        this.checkType();
        if (this.hasValidType && this.value != null) {
            if (this.value.length > length) {
                this.issues.push({
                    type: error_issue_type_enum_1.ErrorIssueType.MaxLength,
                    expected: length.toString(),
                    actual: this.value.length.toString(),
                });
            }
        }
        return this;
    }
    minLength(length) {
        this.checkType();
        if (this.hasValidType && this.value != null) {
            if (this.value.length < length) {
                this.issues.push({
                    type: error_issue_type_enum_1.ErrorIssueType.MinLength,
                    expected: length.toString(),
                    actual: this.value.length.toString(),
                });
            }
        }
        return this;
    }
    notEmpty() {
        this.checkType();
        if (this.hasValue && this.value === '') {
            this.issues.push({
                type: error_issue_type_enum_1.ErrorIssueType.Empty,
                expected: 'NON_EMPTY_STRING',
                actual: this.value == null ? typeof this.value : '',
            });
        }
        return this;
    }
}
exports.StringValidator = StringValidator;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorHandler = void 0;
const error_issue_handler_class_1 = __webpack_require__(7);
const error_issue_type_enum_1 = __webpack_require__(9);
const error_object_class_1 = __webpack_require__(12);
class ErrorHandler {
    constructor(process) {
        this.process = process;
        this.attrIssues = new Map();
    }
    attr(name) {
        var _a;
        const issues = (_a = this.attrIssues.get(name)) !== null && _a !== void 0 ? _a : [];
        this.attrIssues.set(name, issues);
        return new error_issue_handler_class_1.ErrorIssueHandler(issues, this);
    }
    throw(httpStatus = 500) {
        const issues = Array.from(this.attrIssues.entries());
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const issuesWithValues = issues.filter(([_, issues]) => issues.length > 0);
        if (issuesWithValues.length > 0) {
            throw new error_object_class_1.ErrorObject(this.process, Object.fromEntries(issuesWithValues), httpStatus);
        }
    }
    static catch(error) {
        if (error instanceof error_object_class_1.ErrorObject) {
            return error;
        }
        return {
            httpStatus: 500,
            process: 'Unknown',
            issues: {
                stack: [
                    {
                        type: error_issue_type_enum_1.ErrorIssueType.Internal,
                        expected: 'null',
                        actual: error.stack,
                    },
                ],
            },
            message: error.message,
        };
    }
}
exports.ErrorHandler = ErrorHandler;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorObject = void 0;
class ErrorObject {
    constructor(process, issues, httpStatus, message) {
        this.process = process;
        this.issues = issues;
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
exports.ErrorObject = ErrorObject;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEntryByIDProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function getEntryByIDProcess({ id }, { entryDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('get_entry_by_id');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        return yield entryDataAccess.getByID(id);
    });
}
exports.getEntryByIDProcess = getEntryByIDProcess;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listEntryProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function listEntryProcess({ userID, notebookID, offset }, { entryDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const limit = 100;
        const errorHandler = new error_handler_1.ErrorHandler('list_entry');
        errorHandler.attr('notebookID').string(notebookID).notEmpty();
        errorHandler.throw();
        return yield entryDataAccess.list({ userID, notebookID, offset, limit });
    });
}
exports.listEntryProcess = listEntryProcess;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveEntryProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const entites_1 = __webpack_require__(17);
function saveEntryProcess({ userID, notebookID, text, endFixed }, { entryDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('save_entry');
        errorHandler.attr('notebookID').string(notebookID).notEmpty();
        errorHandler.attr('text').string(text).notEmpty().maxLength(100);
        errorHandler.attr('endFixed').string(endFixed).notEmpty();
        errorHandler.throw();
        const entry = entites_1.Entry.buildForInsert({
            userID,
            notebookID,
            text,
            endFixed,
        });
        const id = yield entryDataAccess.save(entry.values);
        return { id };
    });
}
exports.saveEntryProcess = saveEntryProcess;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entry = void 0;
class Entry {
    constructor(values) {
        this.values = values;
    }
    // Factories
    static buildForInsert(values) {
        return new Entry(Object.assign(Object.assign({}, values), { start: new Date(), startFixed: null, end: new Date(values.endFixed), includesTime: false }));
    }
    // Helper functions
    static generateLocalDateTimeString(date) {
        return Entry.generateLocalDate(date).toISOString().split('.')[0];
    }
    static generateLocalDate(date) {
        const offset = new Date().getTimezoneOffset() * 60 * 1000;
        return new Date(date.getTime() - offset);
    }
    static generateDate(date = new Date()) {
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const year = `${date.getFullYear()}`;
        return `${year}-${month}-${day}`;
    }
    static genearteReadableDate(date) {
        const todayDateString = Entry.generateLocalDateTimeString(new Date()).split('T')[0];
        const dateString = date.toISOString().split('T')[0];
        const isToday = todayDateString === dateString;
        const weekday = isToday
            ? 'Today'
            : date.toLocaleDateString('en-US', { weekday: 'long' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        const year = date.toLocaleDateString('en-US', { year: 'numeric' });
        return `${weekday} - ${month} ${day}, ${year}`;
    }
    static generateTime() {
        const now = new Date();
        const hours = `0${now.getHours()}`.slice(-2);
        const minutes = `0${now.getMinutes()}`.slice(-2);
        return `${hours}:${minutes}`;
    }
    static groupByDate(entries) {
        var _a;
        // Transform end date to local time
        const localEntries = entries.map((entry) => {
            if (entry.endFixed == null) {
                entry.endFixed = Entry.generateLocalDateTimeString(new Date(entry.end));
            }
            return entry;
        });
        const map = new Map();
        let key = null;
        for (const entry of localEntries) {
            const dateString = entry.endFixed.split('T')[0];
            if (key != dateString) {
                key = dateString;
                map.set(key, []);
            }
            const group = (_a = map.get(key)) !== null && _a !== void 0 ? _a : [];
            group.push(entry);
        }
        return [...map.entries()].map(([key, value]) => ({ key, value }));
    }
    static parse(entry) {
        if (entry.start != null) {
            entry.start = new Date(entry.start);
        }
        entry.end = new Date(entry.end);
        return entry;
    }
}
exports.Entry = Entry;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notebook = void 0;
class Notebook {
    constructor(values) {
        this.values = values;
    }
    set name(value) {
        this.values.name = value;
    }
    validateName(issueHanlder) {
        issueHanlder.string(this.values.name).notEmpty().maxLength(50);
    }
}
exports.Notebook = Notebook;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
class User {
    constructor(values) {
        this.values = values;
    }
}
exports.User = User;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateEntryProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function updateEntryProcess({ id, text, end, endFixed }, { entryDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('update_entry');
        errorHandler.attr('text').string(text).notEmpty().maxLength(100);
        errorHandler.attr('end').date(end).required().max(new Date());
        errorHandler.attr('endFixed').string(endFixed).notEmpty();
        errorHandler.throw();
        yield entryDataAccess.update(id, {
            text,
            end,
            endFixed,
        });
    });
}
exports.updateEntryProcess = updateEntryProcess;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntryDataAccess = void 0;
const tslib_1 = __webpack_require__(1);
const data_access_1 = __webpack_require__(29);
class EntryDataAccess {
    constructor(dbConnection) {
        this.dataAccess = new data_access_1.MongooseDataAccess(dbConnection, 'Entry', [
            {
                field: '_id',
                key: 'id',
            },
        ]);
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.deleteOne(this.dataAccess.toDocument({ id }));
        });
    }
    getByID(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .findOne(this.dataAccess.toDocument({ id }))
                .then((data) => this.dataAccess.toData(data));
        });
    }
    list({ userID, notebookID, offset, limit, }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .find({ userID, notebookID })
                .skip(offset)
                .sort({ end: -1, start: -1 })
                .limit(limit)
                .then((value) => this.dataAccess.toDataArray(value));
        });
    }
    save(values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.insert(values);
        });
    }
    update(id, { text, end, endFixed }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.updateOne(this.dataAccess.toDocument({ id }), this.dataAccess.toDocument({
                text,
                end,
                endFixed,
            }));
        });
    }
}
exports.EntryDataAccess = EntryDataAccess;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MongooseDataAccess = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(31);
class MongooseDataAccess {
    constructor(dbConnection, modelName, fieldsMap = []) {
        this.dbConnection = dbConnection;
        this.modelName = modelName;
        this.fieldsMap = fieldsMap;
        this.model = this.dbConnection.model(modelName);
    }
    static createConnection({ host, name }) {
        const connectionString = `mongodb://${host}/${name}`;
        const connection = (0, mongoose_1.createConnection)(connectionString);
        const print = (message) => {
            console.log(message, name, '@', host);
        };
        connection.on('connected', () => {
            print('💿 Connected to database:');
        });
        connection.on('error', () => {
            print('❌ Failed connecting to database:');
        });
        return connection;
    }
    static createConnectionWithString(connectionString) {
        const connection = (0, mongoose_1.createConnection)(connectionString);
        const print = (message) => {
            console.log(message, connection.name, '@', connection.host);
        };
        connection.on('connected', () => {
            print('💿 Connected to database:');
        });
        connection.on('error', () => {
            print('❌ Failed connecting to database:');
        });
        return connection;
    }
    static toObjectID(value) {
        return new mongoose_1.Types.ObjectId(value);
    }
    static generateID() {
        return new mongoose_1.Types.ObjectId().toString();
    }
    insert(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = new this.model(this.toDocument(data));
            yield model.save();
            return model._id;
        });
    }
    select(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.toDocument(filter);
            const documents = yield this.model.find(query);
            return documents.map((document) => this.toData(document));
        });
    }
    selectOne(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.toDocument(filter);
            const document = yield this.model.findOne(query);
            return document == null ? null : this.toData(document);
        });
    }
    toDocument(data) {
        if (data === null)
            return {};
        const document = Object.assign({}, data);
        for (const { key, field } of this.fieldsMap) {
            if (key !== field) {
                if (Object.prototype.hasOwnProperty.call(document, key)) {
                    document[field] = document[key];
                    delete document[key];
                }
            }
        }
        return document;
    }
    toData(document) {
        const dataObject = Object.assign({}, document.toJSON());
        for (const { key, field } of this.fieldsMap) {
            if (key !== field) {
                if (Object.prototype.hasOwnProperty.call(dataObject, field)) {
                    dataObject[key] = dataObject[field];
                    delete dataObject[field];
                }
            }
        }
        return dataObject;
    }
    toDataArray(documents) {
        return documents.map((doc) => this.toData(doc));
    }
}
exports.MongooseDataAccess = MongooseDataAccess;


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entryRouter = void 0;
const express_1 = __webpack_require__(2);
const delete_entry_controller_1 = __webpack_require__(34);
const get_entry_by_id_controller_1 = __webpack_require__(45);
const list_entry_controller_1 = __webpack_require__(52);
const save_entry_controller_1 = __webpack_require__(53);
const update_entry_controller_1 = __webpack_require__(54);
const verify_session_middle_1 = __webpack_require__(55);
exports.entryRouter = (0, express_1.Router)();
exports.entryRouter.use('/', verify_session_middle_1.verifyRequestSession);
exports.entryRouter.route('/').get(list_entry_controller_1.listEntryController).post(save_entry_controller_1.saveEntryController);
exports.entryRouter
    .route('/:id')
    .get(get_entry_by_id_controller_1.getEntryByIDController)
    .patch(update_entry_controller_1.updateEntryController)
    .delete(delete_entry_controller_1.deleteEntryController);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteEntryController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const delete_entry_process_1 = __webpack_require__(5);
const entry_data_access_class_1 = __webpack_require__(28);
function deleteEntryController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, delete_entry_process_1.deleteEntryProcess)({ id: req.params.id }, {
                entryDataAccess: new entry_data_access_class_1.EntryDataAccess(undefined),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.deleteEntryController = deleteEntryController;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Response = void 0;
const tslib_1 = __webpack_require__(1);
var express_1 = __webpack_require__(2);
Object.defineProperty(exports, "Response", ({ enumerable: true, get: function () { return express_1.Response; } }));
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
// export * from './hanlder-error.function';
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIResponse = void 0;
const tslib_1 = __webpack_require__(1);
const express_1 = __webpack_require__(2);
const http_error_class_1 = __webpack_require__(37);
const issue_handler_class_1 = __webpack_require__(39);
const issue_type_enum_1 = __webpack_require__(40);
class APIResponse {
    constructor(response) {
        this.response = response;
    }
    sendData(data = null) {
        this.response.status(200).send({ data });
    }
    asyncData(promise) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield promise;
            this.sendData(data);
        });
    }
    tryAsyncData(promise) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.sendData(yield promise);
            }
            catch (error) {
                this.sendError_DEPRECATED(error);
            }
        });
    }
    sendError_DEPRECATED(error) {
        if (error instanceof http_error_class_1.HTTPAppError) {
            this.sendResponse(error.status, null, error);
        }
        const issueHanlder = error instanceof issue_handler_class_1.IssueHanlder
            ? error
            : new issue_handler_class_1.IssueHanlder().add('__Process__', 'execution', {
                type: issue_type_enum_1.EIssueType.Exception,
            });
        this.sendResponse(issueHanlder.httpStatus, null, {
            message: issueHanlder.message,
            issues: issueHanlder.toClassIssues(),
        });
    }
    sendResponse(status = 200, data, error) {
        this.response.status(status).send({
            data,
            error,
        });
    }
    sendError_DEPRECATE_2(status, error) {
        this.response.status(status).send({ error });
    }
    sendError(error, status = 500) {
        this.response.status(status).send({ error });
    }
    notImplemented() {
        const issue = new issue_handler_class_1.IssueHanlder();
        issue.add('Router', 'endpiont', { type: issue_type_enum_1.EIssueType.NotImplemented });
        this.sendError_DEPRECATED(issue);
    }
}
exports.APIResponse = APIResponse;
APIResponse.Base = express_1.Response;


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTPAppError = void 0;
const app_error_class_1 = __webpack_require__(38);
class HTTPAppError extends app_error_class_1.AppProcess {
    constructor(status, process, message, issues) {
        super(process, issues);
        this.status = status;
    }
}
exports.HTTPAppError = HTTPAppError;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppProcess = void 0;
// export interface IAppError extends Error {
//   process: string;
//   message: string;
//   httpStatus: number | null;
//   issues: ProcessIssues;
// }
class AppProcess extends Error {
    constructor(process, issues = new Map()) {
        super(`Error while running process ${process}`);
        this.httpStatus = null;
        this.process = process;
        this.issues = issues;
    }
    addIssues(issues) {
        issues.forEach((issue, key) => this.issues.set(key, issue));
    }
    throw(httpStatus = null) {
        if (this.issues.size > 0) {
            this.httpStatus = httpStatus;
            throw this;
        }
    }
}
exports.AppProcess = AppProcess;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IssueHanlder = void 0;
class IssueHanlder {
    constructor() {
        this.classes = new Map();
        this.httpStatus = 500;
        this.message = 'Error while running the process.';
    }
    add(className, fieldName, issue) {
        var _a;
        const fields = this.getFields(className);
        const issues = (_a = fields.get(fieldName)) !== null && _a !== void 0 ? _a : [];
        issues.push(issue);
        if (!this.classes.has(className)) {
            this.classes.set(className, fields);
        }
        if (!fields.has(fieldName)) {
            fields.set(fieldName, issues);
        }
        return this;
    }
    getFields(className) {
        var _a;
        return (_a = this.classes.get(className)) !== null && _a !== void 0 ? _a : new Map();
    }
    throw(message, httpStatus) {
        if (message) {
            this.message = message;
        }
        if (httpStatus) {
            this.httpStatus = httpStatus;
        }
        if (this.classes.size > 0) {
            throw this;
        }
    }
    toClassIssues() {
        const classIssues = {};
        this.classes.forEach((fields, fieldName) => {
            const fieldIssues = {};
            fields.forEach((issues, fieldName) => {
                fieldIssues[fieldName] = issues;
            });
            classIssues[fieldName] = fieldIssues;
        });
        return classIssues;
    }
}
exports.IssueHanlder = IssueHanlder;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EIssueType = void 0;
var EIssueType;
(function (EIssueType) {
    EIssueType["Auth"] = "auth";
    EIssueType["Duplicate"] = "duplicate";
    EIssueType["Emtpy"] = "empty";
    EIssueType["Exception"] = "exception";
    EIssueType["MaxLength"] = "max_length";
    EIssueType["MinLength"] = "min_length";
    EIssueType["MaxValue"] = "max_value";
    EIssueType["MinValue"] = "min_value";
    EIssueType["NoValue"] = "no_value";
    EIssueType["NotImplemented"] = "not_implemented";
    EIssueType["Type"] = "type";
})(EIssueType || (exports.EIssueType = EIssueType = {}));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHanlder = void 0;
const api_response_class_1 = __webpack_require__(36);
class ResponseHanlder extends api_response_class_1.APIResponse {
}
exports.ResponseHanlder = ResponseHanlder;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRequestHanlder = void 0;
const response_handler_class_1 = __webpack_require__(42);
function createRequestHanlder(callback) {
    return (req, res) => {
        callback(req, new response_handler_class_1.ResponseHanlder(res));
    };
}
exports.createRequestHanlder = createRequestHanlder;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEntryByIDController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const get_entry_by_id_process_1 = __webpack_require__(14);
const entry_data_access_class_1 = __webpack_require__(28);
const journal_db_connection_1 = __webpack_require__(46);
function getEntryByIDController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, get_entry_by_id_process_1.getEntryByIDProcess)({ id: req.params.id }, {
                entryDataAccess: new entry_data_access_class_1.EntryDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.getEntryByIDController = getEntryByIDController;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.journalDBConnection = void 0;
const data_models_1 = __webpack_require__(47);
const data_models_2 = __webpack_require__(47);
const app_env_1 = __webpack_require__(51);
const data_access_1 = __webpack_require__(29);
exports.journalDBConnection = data_access_1.MongooseDataAccess.createConnectionWithString(app_env_1.appEnv.databases.journal);
exports.journalDBConnection.model(data_models_1.entryMongooseDataModel.name, data_models_1.entryMongooseDataModel.schema);
exports.journalDBConnection.model(data_models_2.notebookMongooseDataModel.name, data_models_2.notebookMongooseDataModel.schema);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entryMongooseDataModel = void 0;
const mongoose_1 = __webpack_require__(31);
exports.entryMongooseDataModel = {
    name: 'Entry',
    schema: new mongoose_1.Schema({
        userID: mongoose_1.Schema.Types.ObjectId,
        notebookID: mongoose_1.Schema.Types.ObjectId,
        text: mongoose_1.Schema.Types.String,
        start: {
            type: mongoose_1.Schema.Types.Date,
            default: null,
        },
        startFixed: {
            type: mongoose_1.Schema.Types.String,
            default: null,
        },
        end: mongoose_1.Schema.Types.Date,
        endFixed: {
            type: mongoose_1.Schema.Types.String,
            default: null,
        },
        includesTime: mongoose_1.Schema.Types.Boolean,
    }, { collection: 'entries' }),
};


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.notebookMongooseDataModel = void 0;
const mongoose_1 = __webpack_require__(31);
exports.notebookMongooseDataModel = {
    name: 'Notebook',
    schema: new mongoose_1.Schema({
        userID: mongoose_1.Schema.Types.ObjectId,
        name: mongoose_1.Schema.Types.String,
    }, { collection: 'notebooks' }),
};


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userMongooseDataModel = void 0;
const mongoose_1 = __webpack_require__(31);
exports.userMongooseDataModel = {
    name: 'User',
    schema: new mongoose_1.Schema({
        name: mongoose_1.Schema.Types.String,
        surname: mongoose_1.Schema.Types.String,
        email: mongoose_1.Schema.Types.String,
    }, { collection: 'users' }),
};


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appEnv = void 0;
exports.appEnv = {
    httpPort: (_a = process.env.http_port) !== null && _a !== void 0 ? _a : 7504,
    jwtSecret: (_b = process.env.jwt_key) !== null && _b !== void 0 ? _b : 'thisisasecret',
    databases: {
        users: (_c = process.env.database_users) !== null && _c !== void 0 ? _c : 'mongodb://localhost/duxco_users',
        journal: (_d = process.env.database_journal) !== null && _d !== void 0 ? _d : 'mongodb://localhost/duxco_journal',
    },
};


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listEntryController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const list_entry_process_1 = __webpack_require__(15);
const entry_data_access_class_1 = __webpack_require__(28);
const journal_db_connection_1 = __webpack_require__(46);
function listEntryController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, list_entry_process_1.listEntryProcess)({
                userID: req.session.userID,
                notebookID: req.query.notebookID,
                offset: +req.query.offset,
            }, {
                entryDataAccess: new entry_data_access_class_1.EntryDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.listEntryController = listEntryController;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveEntryController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const save_entry_process_1 = __webpack_require__(16);
const entry_data_access_class_1 = __webpack_require__(28);
const journal_db_connection_1 = __webpack_require__(46);
function saveEntryController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, save_entry_process_1.saveEntryProcess)({
                userID: req.session.userID,
                notebookID: req.body.notebookID,
                text: req.body.text,
                endFixed: req.body.endFixed,
                includesTime: req.body.includesTime,
            }, {
                entryDataAccess: new entry_data_access_class_1.EntryDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.saveEntryController = saveEntryController;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateEntryController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const update_entry_process_1 = __webpack_require__(27);
const entry_data_access_class_1 = __webpack_require__(28);
const journal_db_connection_1 = __webpack_require__(46);
function updateEntryController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, update_entry_process_1.updateEntryProcess)({
                id: req.params.id,
                text: req.body.text,
                end: req.body.end,
                endFixed: req.body.endFixed,
            }, {
                entryDataAccess: new entry_data_access_class_1.EntryDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.updateEntryController = updateEntryController;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyRequestSession = void 0;
const tslib_1 = __webpack_require__(1);
const express_1 = __webpack_require__(35);
const error_handler_1 = __webpack_require__(6);
const app_env_1 = __webpack_require__(51);
const session_class_1 = __webpack_require__(56);
function verifyRequestSession(req, res, next) {
    const responseHanlder = new express_1.ResponseHanlder(res);
    const errorHandler = new error_handler_1.ErrorHandler('verifyRequestSession');
    try {
        const token = req.headers['authorization'];
        errorHandler.attr('authorization_header').string(token).notEmpty();
        errorHandler.throw(401);
        const session = new session_class_1.Session(app_env_1.appEnv.jwtSecret).verifySession(token);
        if (session == null) {
            errorHandler.attr('token').add(error_handler_1.ErrorIssueType.Validity).throw(401);
        }
        req.session = session;
        next();
    }
    catch (error) {
        const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
        responseHanlder.sendError(rest, httpStatus);
    }
}
exports.verifyRequestSession = verifyRequestSession;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Session = void 0;
const jsonwebtoken_1 = __webpack_require__(57);
class Session {
    constructor(secret) {
        this.secret = secret;
    }
    createToken(payload) {
        const date = new Date();
        const hours = date.getHours();
        date.setHours(hours + 24);
        const time = date.getTime();
        return (0, jsonwebtoken_1.sign)({ payload }, this.secret, { expiresIn: time });
    }
    verifySession(token) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, this.secret);
            return decoded.payload;
        }
        catch (error) {
            return null;
        }
    }
}
exports.Session = Session;


/***/ }),
/* 57 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteNotebookProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function deleteNotebookProcess({ id }, { notebookDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('delete_notebook');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        yield notebookDataAccess.delete(id);
        return;
    });
}
exports.deleteNotebookProcess = deleteNotebookProcess;


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNotebookByIDProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function getNotebookByIDProcess({ id }, { notebookDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('get_notebook_by_id');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        return yield notebookDataAccess.getByID(id);
    });
}
exports.getNotebookByIDProcess = getNotebookByIDProcess;


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listNotebookProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function listNotebookProcess({ userID }, { notebookDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('list_notebook');
        errorHandler.throw();
        return yield notebookDataAccess.list({ userID });
    });
}
exports.listNotebookProcess = listNotebookProcess;


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveNotebookProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function saveNotebookProcess({ userID, name }, { notebookDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('save_notebook');
        errorHandler.attr('name').string(name).length(1, 50);
        errorHandler.throw();
        const id = yield notebookDataAccess.save({ userID, name });
        return { id };
    });
}
exports.saveNotebookProcess = saveNotebookProcess;


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateNotebookProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const entites_1 = __webpack_require__(17);
function updateNotebookProcess({ id, userID, name }, { notebookDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('update_notebook');
        const notebookValues = yield notebookDataAccess.getByID(id);
        const notebook = new entites_1.Notebook(notebookValues);
        if (notebookValues.userID !== userID) {
            errorHandler.attr('userID').add(error_handler_1.ErrorIssueType.Access).throw();
        }
        notebook.name = name;
        notebook.validateName(errorHandler.attr('name'));
        errorHandler.throw();
        yield notebookDataAccess.update(id, { name });
    });
}
exports.updateNotebookProcess = updateNotebookProcess;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotebookDataAccess = void 0;
const tslib_1 = __webpack_require__(1);
const data_access_1 = __webpack_require__(29);
class NotebookDataAccess {
    constructor(dbConnection) {
        this.dataAccess = new data_access_1.MongooseDataAccess(dbConnection, 'Notebook', [
            {
                field: '_id',
                key: 'id',
            },
        ]);
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.deleteOne(this.dataAccess.toDocument({ id }));
        });
    }
    getByID(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .findOne(this.dataAccess.toDocument({ id }))
                .then((value) => this.dataAccess.toData(value));
        });
    }
    list({ userID }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .find({ userID })
                .then((value) => this.dataAccess.toDataArray(value));
        });
    }
    save(values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.insert(values);
        });
    }
    update(id, values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.updateOne(this.dataAccess.toDocument({ id }), this.dataAccess.toDocument(values));
        });
    }
}
exports.NotebookDataAccess = NotebookDataAccess;


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.notebookRouter = void 0;
const express_1 = __webpack_require__(2);
const delete_notebook_controller_1 = __webpack_require__(67);
const get_notebook_by_id_controller_1 = __webpack_require__(68);
const list_notebook_controller_1 = __webpack_require__(69);
const save_notebook_controller_1 = __webpack_require__(70);
const update_notebook_controller_1 = __webpack_require__(71);
const verify_session_middle_1 = __webpack_require__(55);
exports.notebookRouter = (0, express_1.Router)();
exports.notebookRouter
    .route('/')
    .get(verify_session_middle_1.verifyRequestSession, list_notebook_controller_1.listNotebookController)
    .post(verify_session_middle_1.verifyRequestSession, save_notebook_controller_1.saveNotebookController);
exports.notebookRouter
    .route('/:id')
    .get(get_notebook_by_id_controller_1.getNotebookByIDController)
    .patch(update_notebook_controller_1.updateNotebookController)
    .delete(delete_notebook_controller_1.deleteNotebookController);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteNotebookController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const delete_notebook_process_1 = __webpack_require__(59);
const notebook_data_access_class_1 = __webpack_require__(64);
function deleteNotebookController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, delete_notebook_process_1.deleteNotebookProcess)({ id: req.params.id }, {
                notebookDataAccess: new notebook_data_access_class_1.NotebookDataAccess(undefined),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.deleteNotebookController = deleteNotebookController;


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNotebookByIDController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const get_notebook_by_id_process_1 = __webpack_require__(60);
const notebook_data_access_class_1 = __webpack_require__(64);
const journal_db_connection_1 = __webpack_require__(46);
function getNotebookByIDController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, get_notebook_by_id_process_1.getNotebookByIDProcess)({ id: req.params.id }, {
                notebookDataAccess: new notebook_data_access_class_1.NotebookDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.getNotebookByIDController = getNotebookByIDController;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listNotebookController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const list_notebook_process_1 = __webpack_require__(61);
const notebook_data_access_class_1 = __webpack_require__(64);
const journal_db_connection_1 = __webpack_require__(46);
function listNotebookController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, list_notebook_process_1.listNotebookProcess)({ userID: req.session.userID }, {
                notebookDataAccess: new notebook_data_access_class_1.NotebookDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.listNotebookController = listNotebookController;


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveNotebookController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const save_notebook_process_1 = __webpack_require__(62);
const notebook_data_access_class_1 = __webpack_require__(64);
const journal_db_connection_1 = __webpack_require__(46);
function saveNotebookController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, save_notebook_process_1.saveNotebookProcess)({
                userID: req.session.userID,
                name: req.body.name,
            }, {
                notebookDataAccess: new notebook_data_access_class_1.NotebookDataAccess(journal_db_connection_1.journalDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.saveNotebookController = saveNotebookController;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateNotebookController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const update_notebook_process_1 = __webpack_require__(63);
const notebook_data_access_class_1 = __webpack_require__(64);
function updateNotebookController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, update_notebook_process_1.updateNotebookProcess)({ id: req.params.id, userID: req.session.userID, name: req.body.name }, {
                notebookDataAccess: new notebook_data_access_class_1.NotebookDataAccess(undefined),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError_DEPRECATE_2(httpStatus, rest);
        }
    });
}
exports.updateNotebookController = updateNotebookController;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(77), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteUserProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function deleteUserProcess({ id }, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('delete_user');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        yield userDataAccess.delete(id);
        return;
    });
}
exports.deleteUserProcess = deleteUserProcess;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserByIDProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function getUserByIDProcess({ id }, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('get_user_by_id');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        return yield userDataAccess.getByID(id);
    });
}
exports.getUserByIDProcess = getUserByIDProcess;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listUserProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function listUserProcess(_, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('list_user');
        errorHandler.throw();
        return yield userDataAccess.list();
    });
}
exports.listUserProcess = listUserProcess;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveUserProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function saveUserProcess({ firstName, lastName, email }, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('save_user');
        errorHandler.throw();
        const id = yield userDataAccess.save({
            name: firstName,
            surname: lastName,
            email,
        });
        return { id };
    });
}
exports.saveUserProcess = saveUserProcess;


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateUserProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function updateUserProcess({ id }, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('update_user');
        errorHandler.throw();
        // DO NOT PASS INPUT DIRECTLY
        yield userDataAccess.update(id, undefined);
    });
}
exports.updateUserProcess = updateUserProcess;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDataAccess = void 0;
const tslib_1 = __webpack_require__(1);
const data_access_1 = __webpack_require__(29);
class UserDataAccess {
    constructor(dbConnection) {
        this.dataAccess = new data_access_1.MongooseDataAccess(dbConnection, 'User', [
            {
                field: '_id',
                key: 'id',
            },
        ]);
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.deleteOne(this.dataAccess.toDocument({ id }));
        });
    }
    getByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const document = yield this.dataAccess.model.findOne(this.dataAccess.toDocument({ email }));
            const some = this.dataAccess.toData(document);
            return some;
        });
    }
    getByID(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .findOne(this.dataAccess.toDocument({ id }))
                .then((value) => this.dataAccess.toData(value));
        });
    }
    list() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.model
                .find()
                .then((data) => this.dataAccess.toDataArray(data));
        });
    }
    save(values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.insert(values);
        });
    }
    update(id, values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.dataAccess.model.updateOne(this.dataAccess.toDocument({ id }), this.dataAccess.toDocument(values));
        });
    }
}
exports.UserDataAccess = UserDataAccess;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userRouter = void 0;
const express_1 = __webpack_require__(2);
// import { deleteUserController } from './controllers/delete-user.controller';
// import { getUserByIDController } from './controllers/get-user-by-id.controller';
const list_user_controller_1 = __webpack_require__(81);
const save_user_controller_1 = __webpack_require__(83);
// import { updateUserController } from './controllers/update-user.controller';
exports.userRouter = (0, express_1.Router)();
exports.userRouter.route('/').get(list_user_controller_1.listUserController).post(save_user_controller_1.saveUserController);
// userRouter
//   .route('/:id')
//   .get(getUserByIDController)
//   .patch(updateUserController)
//   .delete(deleteUserController);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listUserController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const list_user_process_1 = __webpack_require__(75);
const user_data_access_class_1 = __webpack_require__(78);
const user_db_connection_1 = __webpack_require__(82);
function listUserController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, list_user_process_1.listUserProcess)(null, {
                userDataAccess: new user_data_access_class_1.UserDataAccess(user_db_connection_1.duxcoUsersDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.listUserController = listUserController;


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.duxcoUsersDBConnection = void 0;
const data_models_1 = __webpack_require__(47);
const app_env_1 = __webpack_require__(51);
const data_access_1 = __webpack_require__(29);
exports.duxcoUsersDBConnection = data_access_1.MongooseDataAccess.createConnectionWithString(app_env_1.appEnv.databases.users);
exports.duxcoUsersDBConnection.model(data_models_1.userMongooseDataModel.name, data_models_1.userMongooseDataModel.schema);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveUserController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const save_user_process_1 = __webpack_require__(76);
const user_data_access_class_1 = __webpack_require__(78);
const user_db_connection_1 = __webpack_require__(82);
function saveUserController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, save_user_process_1.saveUserProcess)({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }, {
                userDataAccess: new user_data_access_class_1.UserDataAccess(user_db_connection_1.duxcoUsersDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.saveUserController = saveUserController;


/***/ }),
/* 84 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(86), exports);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(93), exports);
tslib_1.__exportStar(__webpack_require__(94), exports);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteAuthProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function deleteAuthProcess({ id }, { authDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('delete_auth');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        return;
    });
}
exports.deleteAuthProcess = deleteAuthProcess;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAuthByIDProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function getAuthByIDProcess({ id }, { authDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('get_auth_by_id');
        errorHandler.attr('id').string(id).notEmpty();
        errorHandler.throw();
        return null;
    });
}
exports.getAuthByIDProcess = getAuthByIDProcess;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listAuthProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function listAuthProcess(_input, { authDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('list_auth');
        errorHandler.throw();
        return [];
    });
}
exports.listAuthProcess = listAuthProcess;


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signInProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function signInProcess({ userID }, { authService }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('save_auth');
        errorHandler.throw();
        const token = authService.sign({ userID });
        return { token };
    });
}
exports.signInProcess = signInProcess;


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateAuthProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function updateAuthProcess({ id }, { authDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('update_auth');
        errorHandler.throw();
        return;
    });
}
exports.updateAuthProcess = updateAuthProcess;


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const googleapis_1 = __webpack_require__(92);
const session_class_1 = __webpack_require__(56);
class AuthService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    googleAuth(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oauth2Client = new googleapis_1.Auth.OAuth2Client();
            oauth2Client.setCredentials({
                access_token: accessToken,
            });
            const oauth2 = googleapis_1.google.oauth2({
                auth: oauth2Client,
                version: 'v2',
            });
            const userInfoGetResponse = yield oauth2.userinfo.get();
            const userInfo = userInfoGetResponse.data;
            return {
                email: userInfo.email,
                name: userInfo.given_name,
                surname: userInfo.family_name,
            };
        });
    }
    sign(payload) {
        return new session_class_1.Session(this.secretKey).createToken(payload);
    }
}
exports.AuthService = AuthService;


/***/ }),
/* 92 */
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authRouter = void 0;
const express_1 = __webpack_require__(2);
const sign_in_controller_1 = __webpack_require__(95);
const google_auth_controller_1 = __webpack_require__(96);
const verify_session_middle_1 = __webpack_require__(55);
const get_session_controller_1 = __webpack_require__(99);
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    .route('/')
    .get(verify_session_middle_1.verifyRequestSession, get_session_controller_1.getSession)
    .post(sign_in_controller_1.signInController);
exports.authRouter.route('/google').post(google_auth_controller_1.googleAuthController);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signInController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const sign_in_process_1 = __webpack_require__(89);
const auth_serivce_class_1 = __webpack_require__(91);
const app_env_1 = __webpack_require__(51);
function signInController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, sign_in_process_1.signInProcess)({ userID: req.body.userID }, { authService: new auth_serivce_class_1.AuthService(app_env_1.appEnv.jwtSecret) });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.signInController = signInController;


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.googleAuthController = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
const auth_serivce_class_1 = __webpack_require__(91);
const google_auth_process_1 = __webpack_require__(97);
const user_1 = __webpack_require__(72);
const user_db_connection_1 = __webpack_require__(82);
const app_env_1 = __webpack_require__(51);
function googleAuthController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            const result = yield (0, google_auth_process_1.googleAuthProcess)({ accessToken: req.body.accessToken }, {
                authService: new auth_serivce_class_1.AuthService(app_env_1.appEnv.jwtSecret),
                userDataAccess: new user_1.UserDataAccess(user_db_connection_1.duxcoUsersDBConnection),
            });
            response.sendData(result);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.googleAuthController = googleAuthController;


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.googleAuthProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const register_user_process_1 = __webpack_require__(98);
function googleAuthProcess({ accessToken }, { authService, userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('delete_auth');
        errorHandler.attr('id').string(accessToken).notEmpty();
        errorHandler.throw();
        const { email, name, surname } = yield authService.googleAuth(accessToken);
        const { id: userID } = yield (0, register_user_process_1.registerUserProcess)({ email, name, surname }, { userDataAccess });
        const token = authService.sign({ userID });
        return { token };
    });
}
exports.googleAuthProcess = googleAuthProcess;


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerUserProcess = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
function registerUserProcess({ email, name, surname }, { userDataAccess }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler('register_user');
        errorHandler.throw();
        const user = yield userDataAccess.getByEmail(email);
        let id = null;
        if (user == null) {
            id = yield userDataAccess.save({ email, name, surname });
        }
        else {
            id = user.id;
        }
        return { id };
    });
}
exports.registerUserProcess = registerUserProcess;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSession = void 0;
const tslib_1 = __webpack_require__(1);
const error_handler_1 = __webpack_require__(6);
const express_1 = __webpack_require__(35);
function getSession(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = new express_1.ResponseHanlder(res);
        try {
            response.sendData(undefined);
        }
        catch (error) {
            const _a = error_handler_1.ErrorHandler.catch(error), { httpStatus } = _a, rest = tslib_1.__rest(_a, ["httpStatus"]);
            response.sendError(rest, httpStatus);
        }
    });
}
exports.getSession = getSession;


/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const app_router_1 = __webpack_require__(3);
const app_env_1 = __webpack_require__(51);
const app = (0, express_1.default)();
app.use(app_router_1.appRouter);
const port = app_env_1.appEnv.httpPort;
const server = app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;