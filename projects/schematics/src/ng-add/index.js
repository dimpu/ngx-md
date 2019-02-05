"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_utilities_1 = require("schematics-utilities");
function addPackageJsonDependencies() {
    return (host, context) => {
        const dependencies = [
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^0.5.0', name: 'marked' },
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^1.15.0', name: 'prismjs' },
        ];
        dependencies.forEach(dependency => {
            schematics_utilities_1.addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });
        return host;
    };
}
function installPackageJsonDependencies() {
    return (host, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);
        return host;
    };
}
function addModuleToImports(options) {
    return (host, context) => {
        const workspace = schematics_utilities_1.getWorkspace(host);
        const project = schematics_utilities_1.getProjectFromWorkspace(workspace, 
        // Takes the first project in case it's not provided by CLI
        options.project ? options.project : Object.keys(workspace['projects'])[0]);
        const moduleName = 'NgxMdModule.forRoot()';
        schematics_utilities_1.addModuleImportToRootModule(host, moduleName, 'ngx-md', project);
        context.logger.log('info', `✅️ "${moduleName}" is imported`);
        return host;
    };
}
function default_1(options) {
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addPackageJsonDependencies(),
        options && options.skipPackageJson ? schematics_1.noop() : installPackageJsonDependencies(),
        options && options.skipModuleImport ? schematics_1.noop() : addModuleToImports(options)
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map