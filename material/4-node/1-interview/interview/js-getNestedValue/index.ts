// poor solution, but still passing

function getNestedValue(obj: any, path: string): any {
  const properties = path.split('.');

  for (const property of properties) {
    if (typeof obj !== 'object' || obj === null) {
      return undefined;
    }

    obj = obj[property];
  }

  return obj;
}
