import { gql, useQuery } from '@apollo/client';
import { RecipeSchema } from '../../graphql/types';
import { RecipeArray } from './getRecipeDetails';

// export interface RecipeArray2 {
//     getRecipes: RecipeSchema[];
// }

export function GetRecipe(foodId: number) {
    const getRecipeDetailsQuery = gql`
        query ($foodId: Int!) {
            recipeDetails(foodId: $foodId) {
                rank
                photo
                procedule
            }
        }
    `;
    // console.log(foodId)
    const { data, loading, error, refetch } = useQuery<RecipeArray>(getRecipeDetailsQuery, {
        variables: {
            foodId: foodId,
        },
    });
    return { data, loading, error, refetch };
}
