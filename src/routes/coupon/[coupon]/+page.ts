import type { PageLoad } from './$types';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async ({ params }) => {
	return {
		couponId: params.coupon
	};
};
