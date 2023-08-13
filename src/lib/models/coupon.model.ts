export interface Coupon extends NewCoupon {
	id: string;
	userId: string;
	createdAt: string;
}

export interface NewCoupon {
	businessName: string;
	couponTitle: string;
	couponDescription: string;
	couponCode: string;
	metadata: Record<string, string>;
}

export interface CouponPublic {
	id: string;
	businessName: string;
	couponCode: string;
	couponTitle: string;
	couponDescription: string;
}
