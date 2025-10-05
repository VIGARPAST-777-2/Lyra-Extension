const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('lyra.runFile', function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No Lyra file open.");
            return;
        }

        let filePath = editor.document.fileName;
        if (!filePath.endsWith(".lyra")) {
            vscode.window.showErrorMessage("This is not a Lyra file.");
            return;
        }

        let apiKey = vscode.workspace.getConfiguration('lyra').get('apiKey');
        if (!apiKey) {
            vscode.window.showErrorMessage("Please configure your GROQ API key in settings.");
            return;
        }

        vscode.window.showInformationMessage("Running Lyra interpreter...");

        // Ejecutar el intérprete de Python
        let pyInterpreter = path.join(__dirname, 'src', 'lyra_interpreter.py');
        let command = `python "${pyInterpreter}" "${filePath}" "${apiKey}"`;

        cp.exec(command, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Error: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage("Lyra file executed successfully. See output console.");
            console.log(stdout);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
