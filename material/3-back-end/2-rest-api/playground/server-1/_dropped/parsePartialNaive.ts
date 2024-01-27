// Using if else statements is not a good way to validate user input.
  // Apart from being verbose and repetitive, it is also
  // a poor separation of concerns. Now our controller must be aware
  // of fields of the article.
  // If we add a new field to the Article type, we would need to update
  // the controller file to validate it.
  // Ideally any change to the model should not require changes
  // to the controller.
  // We would like the model to define the shape of
  // the article, and the controller to be able to validate
  // the data against that shape.
  // We will learn a better way to validate data in the next
  // part.

export function parseUpdateable(object: Record<string, unknown>) {
  // naive object validation
  if (typeof object !== 'object' || object === null) {
    throw new Error('Article must be an object');
  }

  if ('title' in object && typeof object.title !== 'string') {
    throw new Error('Article title must be a string');
  }

  if ('content' in object && typeof object.content !== 'string') {
    throw new Error('Article content must be a string');
  }

  // we keep only the all other keys
  return pick(['title', 'content'], object) as Partial<Article>;
}

export function parseInsertable(object: Record<string, unknown>) {
  // naive object validation
  if (typeof object !== 'object' || object === null) {
    throw new Error('Article must be an object');
  }

  if ('title' in object && typeof object.title !== 'string') {
    throw new Error('Article title must be a string');
  }

  if ('content' in object && typeof object.content !== 'string') {
    throw new Error('Article content must be a string');
  }

  // we keep only the all other keys
  return pick(['title', 'content'], object) as Article;
}
