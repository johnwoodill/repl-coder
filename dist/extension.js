"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable1 = vscode.commands.registerCommand('extension.sendLineToTerminal', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const line = editor.document.lineAt(editor.selection.active.line).text;
            vscode.window.terminals[0].sendText(line);
            const newPosition = new vscode.Position(editor.selection.active.line + 1, 0);
            const newSelection = new vscode.Selection(newPosition, newPosition);
            editor.selection = newSelection;
        }
    });
    context.subscriptions.push(disposable1);
    let disposable2 = vscode.commands.registerCommand('extension.sendIndentedToTerminal', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const startLine = selection.start.line;
            const endLine = selection.end.line;
            let text = document.lineAt(startLine).text.trim();
            const sendIndentedToTerminal = yield vscode.commands.executeCommand('getContext', 'sendIndentedToTerminal');
            if (Boolean(sendIndentedToTerminal)) {
                for (let i = startLine + 1; i <= endLine; i++) {
                    const line = document.lineAt(i).text;
                    if (line.trim().length > 0 && line.startsWith(text)) {
                        text += "\n" + line.trim();
                    }
                    else {
                        break;
                    }
                }
                if (text) {
                    vscode.window.terminals[0].sendText(text);
                    const newPosition = new vscode.Position(endLine + 1, 0);
                    const newSelection = new vscode.Selection(newPosition, newPosition);
                    editor.selection = newSelection;
                }
            }
        }
    }));
    context.subscriptions.push(disposable2);
    let disposable3 = vscode.commands.registerCommand('extension.sendLineAndIndentedToTerminal', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand('extension.sendLineToTerminal');
        vscode.commands.executeCommand('extension.sendIndentedToTerminal');
    }));
    context.subscriptions.push(disposable3);
    vscode.workspace.onDidChangeTextDocument((e) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && e.document === editor.document) {
            const document = editor.document;
            const selection = editor.selection;
            const startLine = selection.start.line;
            const endLine = selection.end.line;
            let isIndented = false;
            for (let i = startLine; i <= endLine; i++) {
                const line = document.lineAt(i).text;
                if (line.trim().length > 0 && line.startsWith("    ")) {
                    isIndented = true;
                    break;
                }
            }
            if (isIndented) {
                vscode.commands.executeCommand('setContext', 'sendIndentedToTerminal', true);
            }
            else {
                vscode.commands.executeCommand('setContext', 'sendIndentedToTerminal', false);
            }
        }
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map