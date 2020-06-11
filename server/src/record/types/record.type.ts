import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Record')
export class RecordType {
  @Field()
  title: string;
}