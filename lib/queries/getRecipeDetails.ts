import { gql, useQuery } from '@apollo/client';
import { RecipeSchema } from '../../graphql/types';

export interface RecipeArray {
    recipeDetails: RecipeSchema[];
}

export function GetRecipeDetails(foodId: number) {
    const getRecipeDetailsQuery = gql`
        query ($foodId: Int!) {
            recipeDetails(foodId: $foodId) {
                rank
                procedule
                photo
                foodId
            }
        }
    `;
    const { data, loading, error, refetch } = useQuery<RecipeArray>(getRecipeDetailsQuery, {
        variables: {
            foodId: foodId,
        },
    });
    return { data, loading, error, refetch };
}
