import { ValidationErrors } from 'ngxs-forms';

/**
 * A validation function that requires the value to be `false`. Considers `null` and
 * `undefined` as valid. Combine this function with the `required` validation
 * function if `null` or `undefined` should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   required: {
 *     actual: boolean;
 *   };
 * }
 * ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 * ```typescript
 * updateGroup<MyFormValue>({
 *  disagreeWithTermsOfService: validate(requiredFalse),
 * })
 * ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function requiredFalse<T extends boolean | null | undefined>(value: T): ValidationErrors {
  if (value === null || value === undefined) {
    return {};
  }

  if (!value) {
    return {};
  }

  return {
    required: {
      actual: value,
    },
  };
}
