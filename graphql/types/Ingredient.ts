import { objectType, extendType, nonNull, intArg } from 'nexus';
import { Food } from './Food';

const GRAPHQL_TYPE_INGREDIENT = 'Ingredient';
const GRAPHQL_QUERY_FIELD_INGREDIENT_DETAILS = 'ingredientDetails';

export const Ingredient = objectType({
    name: GRAPHQL_TYPE_INGREDIENT,
    definition(t) {
        t.int('id');
        t.string('material');
        t.string('amount');
        t.int('foodId');
        t.field('food', { type: Food });
    },
});

export const ingredientsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field(GRAPHQL_QUERY_FIELD_INGREDIENT_DETAILS, {
            type: GRAPHQL_TYPE_INGREDIENT,
            args: {
                foodId: nonNull(intArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.ingredient.findMany({
                    where: {
                        foodId: args.foodId,
                    },
                });
            },
        });
    },
});

export interface IngredientSchema {
    amount: string;
    material: string;
}
