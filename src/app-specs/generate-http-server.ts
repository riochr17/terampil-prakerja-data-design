import { readFileSync, readdir, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';
import { HttpServerGen } from './http-server-gen/http-server-gen';

export interface AppSpecification {
  filename: string
  relative_path: string
  fullpath: string
  module_names: string[]
  body: boolean
  query: boolean
  header: boolean
}

function consume(specification: AppSpecification): HttpServerGen.GenericItem[] {
  const toCamelCase = function(str: string){
    return str.replace(/(?:^.|[A-Z]|\b.)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  return specification.module_names.map((module_name: string) => ({
    relative_path: specification.relative_path,
    data: {
      classname: module_name,
      query: specification.query,
      header: specification.header,
      body: specification.body,
      function_name: toCamelCase(module_name)
    }
  }));
}

function getAppSpecs(): HttpServerGen.GenericItem[] {
  const specification_dir = 'backend-specs';
  const filenames: string[] = readdirSync(path.resolve(__dirname + `/${specification_dir}`));
  const temp: HttpServerGen.GenericItem[] = [];
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

    const module_declaration_names: string[] = module_declaration_statements.map((s: any) => s.name.escapedText);
    const module_body_statements: string[] = (module_declaration_statements[0] as any).body.statements.map((s: any) => s.name.escapedText);
    const app_specification: AppSpecification = {
      filename,
      relative_path: `./${specification_dir}/` + filename.replace(/\.[^/.]+$/, ''),
      fullpath: filepath,
      module_names: module_declaration_names,
      body: module_body_statements.includes('Body'),
      query: module_body_statements.includes('Query'),
      header: module_body_statements.includes('Header')
    };
    temp.push(...consume(app_specification));
  }

  return temp;
}

const source_file: string = new HttpServerGen.Main().compile(getAppSpecs());
writeFileSync(path.resolve(__dirname + '/backend-system.generated.ts'), source_file, { flag: 'w' });
console.log('••• http server api generated successfully •••');
