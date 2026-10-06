import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, blockContentType],
};
