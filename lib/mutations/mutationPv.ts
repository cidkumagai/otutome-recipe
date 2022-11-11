import { gql, useMutation } from "@apollo/client";

export function usePvUpdateMutation() {
    const getPvQuery = gql`
        mutation ($foodId: Int!) {
            pvIncrement(foodId: $foodId) {
                id
            }
        }
    `;
    const [sendData, { data, loading, error }] = useMutation(getPvQuery);
    const useUpdateByFoodId = async function (foodId: number) {
        await sendData({
            variables: {
                foodId: foodId,
            },
        });
    };
    return { useUpdateByFoodId, data, loading, error };
}
