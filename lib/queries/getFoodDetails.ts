import { gql ,useQuery } from "@apollo/client";
import { FoodsSchema } from "../../graphql/types";

export interface FoodArray {
    foodDetails: FoodsSchema[];
}
export function GetFoodDetails(id: number) {
    const getFoodDetailsQuery = gql`
        query($id: Int!) {
            foodDetails(id: $id) {
                name
                photo
                comment
                information {
                    pv
                }
            }
        }
    `;
    const { data, loading, error, refetch } = useQuery<FoodArray>(getFoodDetailsQuery, {
        variables: {
            id: id
        }
    });
    return { data, loading, error, refetch };
}
