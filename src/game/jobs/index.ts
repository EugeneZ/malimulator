import * as list from './list';

const programs = [list];

export function getProgram(name: string) {
  const cleanName = name.trim();
  for (const programExports of programs) {
    const { program, aliases, run } = programExports;
    const names = [...aliases, program];
    if (names.includes(cleanName)) {
      return programExports;
    }
  }
}