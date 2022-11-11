import { gql, useQuery } from '@apollo/client';
import { FoodDetailsSchema, FoodsSchema } from '../../graphql/types';

export interface FoodArray {
    getFood: FoodDetailsSchema;
}

export function GetFood(id: number) {
    const getFoodQuery = gql`
        query ($id: Int!) {
            getFood(id: $id) {
                id
                name
                photo
                comment
                information {
                    pv
                }
                ingredient {
                    amount
                    material
                }
                recipe {
                    photo
                    procedule
                }
            }
        }
    `;
    const { data, loading, error, refetch } = useQuery<FoodArray>(getFoodQuery, {
        variables: {
            id: id,
        },
    });
    return { data, loading, error, refetch };
}
