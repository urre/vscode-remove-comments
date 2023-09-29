const vscode = require('vscode');

function removeComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

function removeCommentsInActiveEditor() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const text = document.getText();

    const newText = removeComments(text);

    editor.edit(editBuilder => {
      editBuilder.replace(
        new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        ),
        newText
      );
    });
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.removeComments',
    removeCommentsInActiveEditor
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;
