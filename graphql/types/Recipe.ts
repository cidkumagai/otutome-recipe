import { objectType, extendType, nonNull, intArg } from 'nexus';
import { Food, FoodsSchema } from './Food';

const GRAPHQL_TYPE_RECIPE = 'Recipe';
const GRAPHQL_QUERY_FIELD_RECIPE_DETAILS = 'recipeDetails';

export const Recipe = objectType({
    name: GRAPHQL_TYPE_RECIPE,
    definition(t) {
        t.int('id');
        t.int('rank');
        t.string('procedule');
        t.string('photo');
        t.int('foodId');
        t.field('food', { type: Food });
    },
});

export const recipesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field(GRAPHQL_QUERY_FIELD_RECIPE_DETAILS, {
            type: GRAPHQL_TYPE_RECIPE,
            args: {
                foodId: nonNull(intArg())
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.recipe.findMany({
                    where: {
                        foodId: Number(args.foodId),
                    }
                });
            },
        });
    },
});

export interface RecipeSchema {
    rank: number;
    procedule: string;
    photo: string;
    foodId: number;
    food: FoodsSchema[];
}
