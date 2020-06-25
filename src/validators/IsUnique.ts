import { ValidationOptions, registerDecorator } from 'class-validator'
import { getRepository } from 'typeorm'

/**
 * Check field value is unique.
 *
 * @param entity Entity class.
 * @param property Target field.
 * @param validationOptions Validation options.
 */
export const IsUnique = <T>(
  entity: new () => T,
  property?: keyof T,
  validationOptions?: ValidationOptions
) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        async validate(value: unknown) {
          const repository = getRepository(entity)
          const count = await repository.count({
            [property || propertyName]: value,
          })

          return count < 1
        },
      },
    })
  }
}
