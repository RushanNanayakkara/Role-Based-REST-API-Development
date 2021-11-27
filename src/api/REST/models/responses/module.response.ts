import { ClassModule } from "../../util/constants";

export class ModuleResponse {
    constructor(private _modules: ClassModule[]) { }

    public get modules(): ClassModule[] {
        return this._modules;
    }


    public set modules(v: ClassModule[]) {
        this._modules = v;
    }

    public toJSON() {
        return {
            modules: this._modules 
        }
    }
}

export class ExecutedModule {
    constructor(private _executionResult: string) { }


    public get executionResult(): string {
        return this._executionResult;
    }


    public set executionResult(v: string) {
        this._executionResult = v;
    }

    public toJSON() {
        return {
            result: this._executionResult
        }
    }
}