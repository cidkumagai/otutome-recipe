import { gql, useMutation, useQuery } from '@apollo/client';
import { FoodsSchema } from '../../graphql/types';

export interface AddFoodArray {
    getFood: FoodsSchema;
}

export function AddFood() {
    const addFoodMutation = gql`
        mutation (
            $name: String!
            $photo: String!
            $comment: String!
            $recipe: [String!]
            $material: [String!]
            $amount: [String!]
        ) {
            createFood(
                name: $name
                photo: $photo
                comment: $comment
                recipe: $recipe
                material: $material
                amount: $amount
            ) {
                id
                name
                photo
                comment
            }
        }
    `;
    const [sendData, { data, loading, error }] = useMutation(addFoodMutation);
    const addFood = async function (
        name: string,
        photo: string,
        comment: string,
        recipe: string[],
        material: string[],
        amount: string[],
    ) {
        await sendData({
            variables: {
                name: name,
                photo: photo,
                comment: comment,
                recipe: recipe,
                material: material,
                amount: amount,
            },
        });
    };
    return { addFood, data, loading, error };
}
