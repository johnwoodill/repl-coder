import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

    let disposable2 = vscode.commands.registerCommand('extension.sendIndentedToTerminal', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const startLine = selection.start.line;
            const endLine = selection.end.line;
            let text = document.lineAt(startLine).text.trim();
            const sendIndentedToTerminal = await vscode.commands.executeCommand('getContext', 'sendIndentedToTerminal');
            if (Boolean(sendIndentedToTerminal)) {
                for (let i = startLine + 1; i <= endLine; i++) {
                    const line = document.lineAt(i).text;
                    if (line.trim().length > 0 && line.startsWith(text)) {
                        text += "\n" + line.trim();
                    } else {
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
    });
    context.subscriptions.push(disposable2);

    let disposable3 = vscode.commands.registerCommand('extension.sendLineAndIndentedToTerminal', async () => {
        vscode.commands.executeCommand('extension.sendLineToTerminal');
        vscode.commands.executeCommand('extension.sendIndentedToTerminal');
    });
    context.subscriptions.push(disposable3);

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
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
            } else {
                vscode.commands.executeCommand('setContext', 'sendIndentedToTerminal', false);
            }
        }
    });
}

export function deactivate() {}