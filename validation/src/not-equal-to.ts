import { ValidationErrors } from 'ngxs-forms';

export interface NotEqualToValidationError<T> {
  comparand: T;
  actual: T;
}

// @ts-ignore
declare module 'ngxs-forms/src/state' {
  export interface ValidationErrors {
    notEqualTo?: NotEqualToValidationError<any>;
  }
}

/**
 * A validation function that requires the value to be strictly not equal (i.e. `!==`)
 * to another value.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   notEqualTo: {
 *     comparand: T;
 *     actual: T;
 *   };
 * }
 * ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 * ```typescript
 * updateGroup<MyFormValue>({
 *  name: validate(notEqualTo('John Doe')),
 * })
 * ```
 */
export function notEqualTo<T>(comparand: T) {
  return (value: T): ValidationErrors => {
    if (value !== comparand) {
      return {};
    }

    return {
      notEqualTo: {
        comparand,
        actual: value,
      },
    };
  };
}
