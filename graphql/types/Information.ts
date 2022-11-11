import { objectType, extendType, intArg, nonNull } from 'nexus';
import { Food } from './Food';

const GRAPHQL_TYPE_INFORMATION = 'Information';
const GRAPHQL_MUTATION_FIELD_PV_INCREMENT = 'pvIncrement';
const GRAPHQL_QUERY_FIELD_ALL_INFORMATIONS = 'allInformations';
const GRAPHQL_MUTATION_FIELD_FOOD_ADD = 'createFoods';

export const Information = objectType({
    name: GRAPHQL_TYPE_INFORMATION,
    definition(t) {
        t.int('id');
        t.int('pv');
        t.string('created_at');
        t.int('foodId');
        t.field('food', { type: Food });
    },
});

export const informationUpdatePvMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field(GRAPHQL_MUTATION_FIELD_PV_INCREMENT, {
            type: GRAPHQL_TYPE_INFORMATION,
            args: {
                foodId: nonNull(intArg()),
            },
            async resolve(_parent, args, ctx) {
                const result = await ctx.prisma?.information.update({
                    where: {
                        foodId: args.foodId,
                    },
                    data: {
                        pv: {
                            increment: 1,
                        },
                    },
                });
                return result;
            },
        });
    },
});

export interface InformationSchema {
    pv: number;
    created_at: string;
    foodId: number;
}
