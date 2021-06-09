import * as vscode from 'vscode';

export class SimpleTaskProvider implements vscode.TaskProvider {
	static TaskType = 'simple task';
	public provideTasks(): Thenable<vscode.Task[]> | undefined {
		return Promise.resolve([
			new vscode.Task(
				{type: SimpleTaskProvider.TaskType},
				 vscode.TaskScope.Workspace,
				"sleep",
				SimpleTaskProvider.TaskType,
				new vscode.ShellExecution("echo 'start to sleep' && sleep 10000000"))
		]);
	}

	public resolveTask(task: vscode.Task): vscode.Task | undefined {
		return undefined;
	}
}

export function activate(_context: vscode.ExtensionContext): void {
	vscode.tasks.registerTaskProvider(SimpleTaskProvider.TaskType, new SimpleTaskProvider());
	_context.subscriptions.push(vscode.tasks.onDidEndTaskProcess(onDidEndTaskProcessHandler));
}

function onDidEndTaskProcessHandler(event: vscode.TaskProcessEndEvent): void {
	console.log(`task '${event.execution.task.name}' ends, exit code = '${event.exitCode}'`);
}