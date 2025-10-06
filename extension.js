const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('lyra.runFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active Lyra file found.');
            return;
        }

        const doc = editor.document;
        const ext = path.extname(doc.fileName).toLowerCase();
        if (ext !== '.lyra' && ext !== '.lyra.txt') {
            vscode.window.showErrorMessage('Please open a .lyra or .lyra.txt file.');
            return;
        }

        const filePath = doc.fileName;
        const config = vscode.workspace.getConfiguration('lyra');
        const apiKey = config.get('apiKey');

        if (!apiKey || apiKey.trim() === '') {
            vscode.window.showErrorMessage(
                'GROQ API key not configured. Go to Settings -> Extensions -> Lyra -> API Key and enter your key.'
            );
            return;
        }

        // Ejecutar intérprete
        const interpreterPath = path.join(context.extensionPath, 'src', 'lyra_interpreter.py');
        const cmd = `python "${interpreterPath}" "${filePath}" "${apiKey}"`;

        vscode.window.withProgress(
            { location: vscode.ProgressLocation.Notification, title: 'Running Lyra file...' },
            (progress) => {
                return new Promise((resolve) => {
                    exec(cmd, (error, stdout, stderr) => {
                        if (error) {
                            vscode.window.showErrorMessage(`Error running Lyra file: ${stderr || error.message}`);
                        } else {
                            vscode.window.showInformationMessage('Lyra file executed successfully.');
                            const outputChannel = vscode.window.createOutputChannel('Lyra');
                            outputChannel.show(true);
                            outputChannel.appendLine(stdout);
                        }
                        resolve();
                    });
                });
            }
        );
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
