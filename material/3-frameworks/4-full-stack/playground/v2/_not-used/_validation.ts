// MUST: remove utilities
import { type ZodObject, type ZodOptionalType, z } from 'zod'

// Source: https://github.com/colinhacks/zod/issues/372#issuecomment-1280054492
type OptionalSchema<T> = {
  [key in keyof T]: z.ZodOptionalType<z.ZodType<T[key]>>
}

type Validates<Model> =
  | {
      [key in keyof Model]-?: undefined extends Model[key]
        ? null extends Model[key]
          ? z.ZodNullableType<z.ZodOptionalType<z.ZodType<Model[key]>>>
          : z.ZodOptionalType<z.ZodType<Model[key]>>
        : null extends Model[key]
          ? z.ZodNullableType<z.ZodType<Model[key]>>
          : z.ZodType<Model[key]>
    }
  | OptionalSchema<Model>

/**
 * Performs type-checking on the schema.
 */
export function useSchema<Model>(
  schema:
    | ZodObject<Validates<Model>>
    | ZodOptionalType<ZodObject<Validates<Model>>>
) {
  return schema
}

// for type-checking only
type ZodTypeValue<Value, ZodType extends z.ZodType> = undefined extends Value
  ? null extends Value
    ? z.ZodNullableType<z.ZodOptionalType<ZodType>>
    : z.ZodOptionalType<ZodType> | z.ZodDefault<ZodType>
  : null extends Value
    ? z.ZodNullableType<ZodType>
    : ZodType

type SameOutputAndInputShape<Output> = {
  [K in keyof Output]: ZodTypeValue<Output[K], z.ZodType<Output[K]>>
}

type AnotherOutputAndInputShape<Output, Input> = {
  [K in keyof (Output | Input)]: ZodTypeValue<
    Input[K],
    z.ZodType<Output[K], z.ZodTypeDef, Input[K]>
  >
}

export const createSchema = <Output, Input = null>(
  shape: Input extends null
    ? Required<SameOutputAndInputShape<Output>>
    : Required<AnotherOutputAndInputShape<Output, Input>>
) => shape
