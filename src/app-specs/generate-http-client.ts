import "reflect-metadata";
import { readFileSync, readdir, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';
import { HttpClientGen } from './http-client-gen/http-client-gen';

export interface ModuleSpecification {
  name: string
  body: boolean
  query: boolean
  header: boolean
}

export interface AppSpecification {
  filename: string
  relative_path: string
  fullpath: string
  modules: ModuleSpecification[]
}

function consume(specification: AppSpecification): HttpClientGen.GenericItem[] {
  const toCamelCase = function(str: string){
    return str.replace(/(?:^.|[A-Z]|\b.)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  const file_instance = require(specification.fullpath);
  return specification.modules.map((_module: ModuleSpecification) => ({
    type: file_instance[_module.name].Endpoint.method,
    relative_path: specification.relative_path,
    data: {
      classname: _module.name,
      query: _module.query,
      header: _module.header,
      body: _module.body,
      function_name: toCamelCase(_module.name)
    }
  }));
}

function getAppSpecs(): HttpClientGen.GenericItem[] {
  const specification_dir = 'backend-specs';
  const filenames: string[] = readdirSync(path.resolve(__dirname + `/${specification_dir}`));
  const temp: HttpClientGen.GenericItem[] = [];
  for (const filename of filenames) {
    const filepath = path.resolve(__dirname + `/${specification_dir}/` + filename);
    const source_file: ts.SourceFile = ts.createSourceFile(
      filenames[0], 
      readFileSync(filepath, 'utf-8'), 
      ts.ScriptTarget.Latest
    );
    const module_declaration_statements: ts.Statement[] = source_file.statements.filter((s: ts.Statement) => s.kind === ts.SyntaxKind.ModuleDeclaration);
    if (module_declaration_statements.length === 0) {
      continue;
    }

    const modules: ModuleSpecification[] = module_declaration_statements.map((s: any) => {
      const module_body_statements: string[] = s.body.statements.map((r: any) => r.name.escapedText);
      return {
        name: s.name.escapedText,
        body: module_body_statements.includes('Body'),
        query: module_body_statements.includes('Query'),
        header: module_body_statements.includes('Header')
      }
    });

    const app_specification: AppSpecification = {
      filename,
      relative_path: `./${specification_dir}/` + filename.replace(/\.[^/.]+$/, ''),
      fullpath: filepath,
      modules
    };
    temp.push(...consume(app_specification));
  }

  return temp;
}

const source_file: string = new HttpClientGen.Main().compile(getAppSpecs());
writeFileSync(path.resolve(__dirname + '/api-call.generated.ts'), source_file, { flag: 'w' });
console.log('••• http client api generated successfully •••');
