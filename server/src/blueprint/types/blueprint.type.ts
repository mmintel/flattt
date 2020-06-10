import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Blueprint')
export class BlueprintType {
  @Field()
  title: string;
}