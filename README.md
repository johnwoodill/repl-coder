# REPL Coder

REPL Coder is a Visual Studio Code extension that lets you quickly send code snippets to a terminal window for testing or debugging. You can send a single line or a block of indented code to the terminal, and the extension will automatically detect the level of indentation and send the code with the correct formatting.

## Installation

You can install the extension in Visual Studio Code by following these steps:

1. Download the latest release from the [REPL Coder GitHub repository](https://github.com/johnwoodill/repl-coder/releases).
2. In Visual Studio Code, open the Extensions view by clicking on the Extensions icon in the left-hand sidebar or by using the `Ctrl+Shift+X` keyboard shortcut.
3. Click on the `...` button in the Extensions view header, and then click on "Install from VSIX..."
4. In the file picker dialog, select the `.vsix` file that you downloaded in step 1.
5. VS Code will install the extension and prompt you to restart the editor. After restarting, the extension will be active.

## Usage

REPL Coder provides the following commands:

* `REPL Coder: Send Line to Terminal` (`Ctrl+Enter`): Send the current line to the terminal.
* `REPL Coder: Send Indented Block to Terminal` (`Shift+Ctrl+Enter`): Send the current block of indented code to the terminal.
* `REPL Coder: Send Line and Indented Block to Terminal` (`Alt+Ctrl+Enter`): Send both the current line and the current block of indented code to the terminal.

When you execute one of these commands, the code is sent to the first terminal window in the list of open terminal windows. If there are no terminal windows open, a new one is created.

If you use the `Send Indented Block to Terminal` command, the extension will automatically detect the level of indentation of the selected code and send it to the terminal with the correct formatting. If you use the `Send Line and Indented Block to Terminal` command, both the current line and the current block of indented code will be sent to the terminal.

Note that when you use the `Send Indented Block to Terminal` or `Send Line and Indented Block to Terminal` commands, the cursor will move to the next non-indented line in the editor.

## License

This extension is licensed under the [MIT License](LICENSE).