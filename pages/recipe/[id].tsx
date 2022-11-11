import { useRouter } from 'next/router';

export function usePickUpFoodId() {
    const router = useRouter();
    const { foodId } = router.query;
    return { foodId };
}
