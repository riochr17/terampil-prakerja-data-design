import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import ts from 'typescript';

interface ImportData {
  from: string
  elements: string[]
}

interface EnumData {
  name: string
  members: {
    name: string
    initializer: string
  }[]
}

interface ClassData {
  name: string
  members: {
    name: string
    type: string
    question: boolean
    exclamation: boolean
  }[]
}

interface ImportEnumClass {
  all_imports_data: ImportData[]
  all_enums_data: EnumData[]
  class_data: ClassData
}

interface OutData {
  result: string
  original: ImportEnumClass
}

function writeToFile(data: ImportEnumClass): string {
  return `${data.all_imports_data.filter((_import: ImportData) => _import.from.includes('.entity')).map((_import: ImportData) => `import { ${_import.elements.join(', ')} } from "${_import.from}";`).join('\n')}

${data.all_enums_data.map((_enum: EnumData) => `export enum ${_enum.name} {
${_enum.members.map(x => `  ${x.name} = '${x.initializer}'`).join(',\n')}
}`).join('\n')}

export class ${data.class_data.name} {
${data.class_data.members.map(x => `  ${x.name}${x.question ? '?' : ''}${x.exclamation ? '!' : ''}: ${x.type};`).join('\n')}
}`;
}

function getMemberType(type: any): string {
  switch (type.kind) {
    case ts.SyntaxKind.TypeReference:
      return type.typeName.escapedText;
    case ts.SyntaxKind.ArrayType:
      return `${getMemberType(type.elementType)}[]`;
    case ts.SyntaxKind.NumberKeyword:
      return 'number';
    case ts.SyntaxKind.StringKeyword:
      return 'string';
    case ts.SyntaxKind.BooleanKeyword:
      return 'boolean';
    default:
      return 'unknown';
  }
}

export function transformToSimpleInterface(filepath: string): OutData {
  try {
    const node = ts.createSourceFile(
      'x.ts',
      readFileSync(filepath, 'utf-8'),
      ts.ScriptTarget.Latest
    );
    // console.log(node.statements);
    const all_imports: ts.Statement[] = node.statements.filter((statement: ts.Statement) => statement.kind === ts.SyntaxKind.ImportDeclaration);
    const all_class: ts.Statement[] = node.statements.filter((statement: ts.Statement) => statement.kind === ts.SyntaxKind.ClassDeclaration);
    const all_enum: ts.Statement[] = node.statements.filter((statement: ts.Statement) => statement.kind === ts.SyntaxKind.EnumDeclaration);
    const single_class = all_class[0] as any;
    const all_members = single_class.members;

    const class_data = {
      name: single_class.name.escapedText,
      members: all_members.map((x: any) => ({
        name: x.name.escapedText,
        type: getMemberType(x.type),
        question: x.questionToken ? true : false,
        exclamation: x.exclamationToken ? true : false
      }))
    }
    const all_enums_data = all_enum.map((_enum: any) => ({
      name: _enum.name.escapedText,
      members: _enum.members.map((_member: any) => ({
        name: _member.name.escapedText,
        initializer: _member.initializer.text
      }))
    }));
    const all_imports_data = all_imports.map((_import: any) => ({
      from: _import.moduleSpecifier.text,
      elements: _import.importClause.namedBindings.elements.map((_element: any) => _element.name.escapedText)
    }));
    const original: ImportEnumClass = {
      all_imports_data,
      all_enums_data,
      class_data
    };
    const result = writeToFile(original);
    return {
      result,
      original
    };
  } catch (err: any) {
    throw err;
  }
}

const dir_resolved_name = resolve(__dirname + '/simple-interface');
const dir_resolved_original_entity = resolve(__dirname + '/entity');
rmSync(dir_resolved_name, { recursive: true, force: true });
mkdirSync(dir_resolved_name, { recursive: true });

const filenames: string[] = readdirSync(dir_resolved_original_entity);
for (const filename of filenames) {
  console.log(filename);
  const transformed_file = transformToSimpleInterface(`${dir_resolved_original_entity}/${filename}`);
  writeFileSync(`${dir_resolved_name}/${transformed_file.original.class_data.name}.entity.ts`, transformed_file.result);
}
