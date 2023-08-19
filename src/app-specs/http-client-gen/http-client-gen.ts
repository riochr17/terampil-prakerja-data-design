import { readFileSync } from "fs";
import Handlebars from "handlebars";

export namespace HttpClientGen {
  interface HBAPICallTemplate {
    import_dependencies: string[]
    functions: string[]
  }

  interface HBAPICallParameterTemplate {
    classname: string
    query: boolean
    header: boolean
    body: boolean
  }

  interface HBAPICallRequestOptionTemplate {
    query: boolean
    header: boolean
  }

  interface HBAPICallGetRequestTemplate {
    classname: string
    function_name: string
    function_parameters: string
    request_options: string
  }

  interface HBAPICallPostRequestTemplate {
    classname: string
    function_name: string
    function_parameters: string
    request_options: string
    body: boolean
  }

  type HBAPICallPutRequestTemplate = HBAPICallPostRequestTemplate;
  type HBAPICallDeleteRequestTemplate = HBAPICallGetRequestTemplate;

  interface ImportDependencyParam {
    classname: string
    relative_path: string
  }

  interface GetFunctionTemplateParam {
    query: boolean
    header: boolean
    classname: string
    function_name: string
  }

  interface PostFunctionTemplateParam {
    query: boolean
    header: boolean
    body: boolean
    classname: string
    function_name: string
  }

  type PutFunctionTemplateParam = PostFunctionTemplateParam;
  type DeleteFunctionTemplateParam = GetFunctionTemplateParam;

  export interface GetParam {
    type: 'get'
    data: GetFunctionTemplateParam
    relative_path: string
  }

  export interface PostParam {
    type: 'post'
    data: PostFunctionTemplateParam
    relative_path: string
  }

  export interface PutParam {
    type: 'put'
    data: PutFunctionTemplateParam
    relative_path: string
  }

  export interface DeleteParam {
    type: 'delete'
    data: DeleteFunctionTemplateParam
    relative_path: string
  }

  export type GenericItem = GetParam | PostParam | PutParam | DeleteParam;

  export class Main {
    private api_call_compiled: HandlebarsTemplateDelegate<HBAPICallTemplate>;
    private parameters_compiled: HandlebarsTemplateDelegate<HBAPICallParameterTemplate>;
    private request_options_compiled: HandlebarsTemplateDelegate<HBAPICallRequestOptionTemplate>;

    private request_get_compiled: HandlebarsTemplateDelegate<HBAPICallGetRequestTemplate>;
    private request_post_compiled: HandlebarsTemplateDelegate<HBAPICallPostRequestTemplate>;
    private request_put_compiled: HandlebarsTemplateDelegate<HBAPICallPutRequestTemplate>;
    private request_delete_compiled: HandlebarsTemplateDelegate<HBAPICallDeleteRequestTemplate>;

    private import_dependency_compiled: HandlebarsTemplateDelegate<ImportDependencyParam>;

    public constructor() {
      const api_call_file = readFileSync(__dirname + `/template/api-call.template`, 'utf-8');
      const file_parameters = readFileSync(__dirname + `/template/api-call.parameters.template`, 'utf-8');
      const file_request_options = readFileSync(__dirname + `/template/api-call.options.template`, 'utf-8');
      const file_request_get = readFileSync(__dirname + `/template/api-call.get.template`, 'utf-8');
      const file_request_post = readFileSync(__dirname + `/template/api-call.post.template`, 'utf-8');
      const file_request_put = readFileSync(__dirname + `/template/api-call.put.template`, 'utf-8');
      const file_request_delete = readFileSync(__dirname + `/template/api-call.delete.template`, 'utf-8');
      const file_import_dependency = readFileSync(__dirname + `/template/api-call.import-dependency.template`, 'utf-8');
      
      this.api_call_compiled = Handlebars.compile(api_call_file, { noEscape: true });
      this.parameters_compiled = Handlebars.compile<HBAPICallParameterTemplate>(file_parameters, { noEscape: true });
      this.request_options_compiled = Handlebars.compile<HBAPICallRequestOptionTemplate>(file_request_options, { noEscape: true });
      this.request_get_compiled = Handlebars.compile<HBAPICallGetRequestTemplate>(file_request_get, { noEscape: true });
      this.request_post_compiled = Handlebars.compile<HBAPICallPostRequestTemplate>(file_request_post, { noEscape: true });
      this.request_put_compiled = Handlebars.compile<HBAPICallPutRequestTemplate>(file_request_put, { noEscape: true });
      this.request_delete_compiled = Handlebars.compile<HBAPICallDeleteRequestTemplate>(file_request_delete, { noEscape: true });
      this.import_dependency_compiled = Handlebars.compile<ImportDependencyParam>(file_import_dependency, { noEscape: true });
    }

    public compile(data: GenericItem[]) {
      return this.api_call_compiled({
        import_dependencies: data.map((gi: GenericItem) => this.import_dependency({
          classname: gi.data.classname,
          relative_path: gi.relative_path
        })),
        functions: data.map((gi: GenericItem) => {
          switch (gi.type) {
            case 'get': return this.get_functions(gi.data);
            case 'post': return this.post_functions(gi.data);
            case 'put': return this.put_functions(gi.data);
            case 'delete': return this.delete_functions(gi.data);
          }
        })
      });
    }

    private get_functions(param: GetFunctionTemplateParam): string {
      return this.request_get_compiled({
        classname: param.classname,
        function_name: param.function_name,
        function_parameters: this.parameters_compiled({
          classname: param.classname,
          query: param.query,
          header: param.header,
          body: false
        }),
        request_options: this.request_options_compiled({
          query: param.query,
          header: param.header
        })
      });
    }

    private post_functions(param: PostFunctionTemplateParam): string {
      return this.request_post_compiled({
        classname: param.classname,
        function_name: param.function_name,
        function_parameters: this.parameters_compiled({
          classname: param.classname,
          query: param.query,
          header: param.header,
          body: param.body
        }),
        request_options: this.request_options_compiled({
          query: param.query,
          header: param.header
        }),
        body: param.body
      });
    }

    private put_functions(param: PutFunctionTemplateParam): string {
      return this.request_put_compiled({
        classname: param.classname,
        function_name: param.function_name,
        function_parameters: this.parameters_compiled({
          classname: param.classname,
          query: param.query,
          header: param.header,
          body: param.body
        }),
        request_options: this.request_options_compiled({
          query: param.query,
          header: param.header
        }),
        body: param.body
      });
    }

    private delete_functions(param: DeleteFunctionTemplateParam): string {
      return this.request_delete_compiled({
        classname: param.classname,
        function_name: param.function_name,
        function_parameters: this.parameters_compiled({
          classname: param.classname,
          query: param.query,
          header: param.header,
          body: false
        }),
        request_options: this.request_options_compiled({
          query: param.query,
          header: param.header
        })
      });
    }

    private import_dependency(param: ImportDependencyParam): string {
      return this.import_dependency_compiled(param);
    }
  }
}
