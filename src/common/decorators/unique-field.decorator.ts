import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ObjectType, EntityManager } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'Unique', async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;
    const found = await this.entityManager.findOne(entityClass, {
      where: { [property]: value },
    });
    return !found;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} já está em uso.`;
  }
}

export function Unique(
  entity: ObjectType<any>,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, property],
      validator: UniqueConstraint,
    });
  };
}
