import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductInputs {
    @Field()
    title: string;
}