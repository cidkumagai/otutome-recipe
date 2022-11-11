import type { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';
import { objectType, extendType, nonNull, intArg, list, stringArg } from 'nexus';
import { Information, InformationSchema } from './Information';
import { Ingredient, IngredientSchema } from './Ingredient';
import { Recipe, RecipeSchema } from './Recipe';

const GRAPHQL_TYPE_FOOD = 'Food';
const GRAPHQL_QUERY_FIELD_ALL_FOODS = 'allFoods';
const GRAPHQL_QUERY_FIELD_GET_FOODS = 'getFood';
const GRAPHQL_QUERY_FIELD_FOOD_DETAILS = 'foodDetails';
const GRAPHQL_MUTATION_FIELD_FOOD_ADD = 'createFood';

export const Food = objectType({
    name: GRAPHQL_TYPE_FOOD,
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('photo');
        t.string('comment');
        t.field('information', { type: Information });
        t.int('recipeId');
        t.field('recipe', { type: list(Recipe) });
        t.int('ingredinetId');
        t.field('ingredient', { type: list(Ingredient) });
    },
});

export const foodsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field(GRAPHQL_QUERY_FIELD_ALL_FOODS, {
            type: GRAPHQL_TYPE_FOOD,
            resolve(_parent, _args, ctx) {
                return ctx.prisma.food.findMany({
                    orderBy: [{ id: 'desc' }],
                    include: {
                        information: {
                            select: {
                                pv: true,
                                created_at: true,
                            },
                        },
                    },
                });
            },
        });
    },
});

export const foodDetailsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field(GRAPHQL_QUERY_FIELD_FOOD_DETAILS, {
            type: GRAPHQL_TYPE_FOOD,
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.food.findMany({
                    where: {
                        id: args.id,
                    },
                    include: {
                        information: {
                            select: {
                                pv: true,
                            },
                        },
                    },
                });
            },
        });
    },
});

export const foodQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field(GRAPHQL_QUERY_FIELD_GET_FOODS, {
            type: GRAPHQL_TYPE_FOOD,
            args: {
                id: nonNull(intArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.food.findUnique({
                    where: {
                        id: args.id,
                    },
                    include: {
                        information: true,
                        ingredient: true,
                        recipe: {
                            select: {
                                rank: true,
                                procedule: true,
                                photo: true,
                            },
                            orderBy: [{ rank: 'asc' }],
                        },
                    },
                });
            },
        });
    },
});

// recipe: nonNull(list('String')),
//                 material: nonNull(list('String')),
//                 amount: nonNull(list('String')),
export const foodAddMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field(GRAPHQL_MUTATION_FIELD_FOOD_ADD, {
            type: GRAPHQL_TYPE_FOOD,
            args: {
                name: nonNull(stringArg()),
                photo: nonNull(stringArg()),
                comment: nonNull(stringArg()),
                recipe: list(nonNull('String')),
                material: list(nonNull('String')),
                amount: list(nonNull('String')),
            },
            async resolve(_parent, args, ctx, _info) {
                const result = await ctx.prisma.food.create({
                    data: {
                        name: args.name,
                        photo: args.photo,
                        comment: args.comment,
                    },
                });
                console.log(result);
                await ctx.prisma.information.create({
                    data: {
                        foodId: result.id,
                    },
                });
                // );
                if (args.recipe) {
                    for (let i = 0; i < args.recipe.length; i++) {
                        await ctx.prisma.recipe.create({
                            data: {
                                rank: i + 1,
                                procedule: args.recipe[i],
                                foodId: result.id,
                            },
                        });
                    }
                }
                if (args.material && args.amount) {
                    for (let i = 0; i < args.material.length; i++) {
                        await ctx.prisma.ingredient.create({
                            data: {
                                material: args.material[i],
                                amount: args.amount[i],
                                foodId: result.id,
                            },
                        });
                    }
                }
                return result;
            },
        });
    },
});

export interface FoodsSchema {
    id: number;
    name: string;
    photo: string;
    comment: string;
    information: InformationSchema;
    recipe: RecipeSchema[];
    ingredient: IngredientSchema[];
}

export interface FoodDetailsSchema {
    id: number;
    name: string;
    photo: string;
    comment: string;
    information: InformationSchema;
    recipe: RecipeSchema[];
    ingredient: IngredientSchema[];
}
