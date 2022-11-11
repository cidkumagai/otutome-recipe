import { gql, useQuery } from '@apollo/client';
import { IngredientSchema } from '../../graphql/types';

export interface IngredientArray {
    ingredientDetails: IngredientSchema[];
}

export function GetIngredientDetails(foodId: number) {
    const getIngredientDetailsQuery = gql`
        query ($foodId: Int!) {
            ingredientDetails(foodId: $foodId) {
                amount
                material
            }
        }
    `;
    const { data, loading, error, refetch } = useQuery<IngredientArray>(getIngredientDetailsQuery, {
        variables: {
            foodId: foodId,
        },
    });
    return { data, loading, error, refetch };
}
