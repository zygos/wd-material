"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const exportSpreadsheet_1 = __importDefault(require("../src/exportSpreadsheet"));
const importSpreadsheet_1 = __importDefault(require("../src/importSpreadsheet"));
const fixture = (...paths) => (0, path_1.join)(__dirname, 'fixtures', ...paths);
(0, vitest_1.beforeEach)(async () => {
    // remove the previous temporary directory
    await (0, promises_1.rm)(fixture('$temp'), { force: true, recursive: true });
    // create a temporary directory for the database
    await (0, promises_1.mkdir)(fixture('$temp'));
});
// goes through the flow in its entirety, including real I/O
(0, vitest_1.it)('preserves the same file output as the input used for creating a database', async () => {
    const csvOriginal = await (0, promises_1.readFile)(fixture('data.csv'), 'utf-8');
    await (0, importSpreadsheet_1.default)(fixture('$temp/database.sqlite'), fixture('data.csv'));
    await (0, exportSpreadsheet_1.default)(fixture('$temp/database.sqlite'), fixture('$temp/exported.csv'));
    const csvExported = await (0, promises_1.readFile)(fixture('$temp/exported.csv'), 'utf-8');
    const csvOriginalLines = csvOriginal.split('\n');
    const csvExportedLines = csvExported.split('\n');
    (0, vitest_1.expect)(csvExportedLines.length).toBe(csvOriginalLines.length);
    // compare line-by-line for clearer error messages
    csvOriginalLines.forEach((line, index) => {
        (0, vitest_1.expect)(csvExportedLines[index]).toBe(line);
    });
    // compare the whole string
    (0, vitest_1.expect)(csvExported).toBe(csvOriginal);
});
