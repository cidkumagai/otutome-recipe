import { useRouter } from 'next/router';

export function pickUpFoodId() {
    const router = useRouter();
    const { foodId } = router.query;
    return { foodId };
}
