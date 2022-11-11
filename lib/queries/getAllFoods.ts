import { gql, useQuery } from '@apollo/client';
import { FoodsSchema } from '../../graphql/types';

export interface FoodArray {
    allFoods: FoodsSchema[];
}

export function GetAllFoods() {
    const getAllFoodsQuery = gql`
        query {
            allFoods {
                id
                name
                photo
                comment
                information {
                    pv
                    created_at
                }
            }
        }
    `;
    const { data, loading, error, refetch } = useQuery<FoodArray>(getAllFoodsQuery);
    return { data, loading, error, refetch };
}
