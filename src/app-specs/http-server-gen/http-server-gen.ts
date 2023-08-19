import { readFileSync } from "fs";
import Handlebars from "handlebars";

export namespace HttpServerGen {
  interface HBBackendSystemTemplate {
    import_dependencies: string[]
    logic_types: string[]
    modules: string[]
  }

  interface ImportDependencyParam {
    classname: string
    relative_path: string
  }

  interface HBBackendSystemLogicTypeTemplate {
    classname: string
    query: boolean
    body: boolean
    header: boolean
  }

  export interface HBBackendSystemModuleTemplate {
    classname: string
    query: boolean
    body: boolean
    header: boolean
    function_name: string
  }

  export interface GenericItem {
    data: HBBackendSystemModuleTemplate
    relative_path: string
  }

  export class Main {
    private backend_system_compiled: HandlebarsTemplateDelegate<HBBackendSystemTemplate>;
    private logic_type_compiled: HandlebarsTemplateDelegate<HBBackendSystemLogicTypeTemplate>;
    private module_compiled: HandlebarsTemplateDelegate<HBBackendSystemModuleTemplate>;
    private import_dependency_compiled: HandlebarsTemplateDelegate<ImportDependencyParam>;

    public constructor() {
      const backend_system_file = readFileSync(__dirname + `/template/backend-system.template`, 'utf-8');
      const file_logic_type = readFileSync(__dirname + `/template/backend-system.logic-type.template`, 'utf-8');
      const file_module = readFileSync(__dirname + `/template/backend-system.module.template`, 'utf-8');
      const file_import_dependency = readFileSync(__dirname + `/template/backend-system.import-dependency.template`, 'utf-8');
      
      this.backend_system_compiled = Handlebars.compile<HBBackendSystemTemplate>(backend_system_file, { noEscape: true });
      this.logic_type_compiled = Handlebars.compile<HBBackendSystemLogicTypeTemplate>(file_logic_type, { noEscape: true });
      this.module_compiled = Handlebars.compile<HBBackendSystemModuleTemplate>(file_module, { noEscape: true });
      this.import_dependency_compiled = Handlebars.compile<ImportDependencyParam>(file_import_dependency, { noEscape: true });
    }

    public compile(data: GenericItem[]) {
      return this.backend_system_compiled({
        import_dependencies: data.map((gi: GenericItem) => this.import_dependency_compiled({
          classname: gi.data.classname,
          relative_path: gi.relative_path
        })),
        logic_types: data.map((gi: GenericItem) => this.logic_type_compiled({
          classname: gi.data.classname,
          body: gi.data.body,
          query: gi.data.query,
          header: gi.data.header
        })),
        modules: data.map((gi: GenericItem) => this.module_compiled(gi.data)),
      });
    }
  }
}
