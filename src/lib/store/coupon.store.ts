import type { Coupon, CouponPublic, NewCoupon } from '$lib/models/coupon.model';
import { supabase } from '../../supabaseClient';
import { getSession } from './session.store';

export const addCoupon = async (coupon: NewCoupon): Promise<Coupon> => {
	try {
		const userId = getSession()?.user.id;
		if (userId != null) {
			const { error, data } = await supabase
				.from(Table.coupons)
				.insert({
					coupon_code: coupon.couponCode,
					business_name: coupon.businessName,
					coupon_title: coupon.couponTitle,
					coupon_description: coupon.couponDescription,
					metadata: btoa(JSON.stringify(coupon.metadata))
				})
				.select();
			if (error) {
				throw error;
			}
			return data?.[0] as Coupon;
		}
		throw 'No user id provided';
	} catch (error) {
		throw error;
	}
};

export const getCoupon = async (couponId: string): Promise<Coupon | undefined> => {
	try {
		const userId = getSession()?.user.id;
		if (userId != null) {
			const { error, data } = await supabase.from(Table.coupons).select('*').eq('id', couponId);
			if (error) {
				throw error;
			}
			if (data?.[0]) {
				const coupon = data?.[0];
				return {
					id: couponId,
					userId: coupon.user_id,
					createdAt: coupon.created_at,
					businessName: coupon.business_name,
					couponTitle: coupon.coupon_title,
					couponDescription: coupon.coupon_description,
					couponCode: coupon.coupon_code,
					metadata: JSON.parse(atob(coupon.metadata))
				};
			}
			return undefined;
		}
		throw 'No user id provided';
	} catch (error) {
		throw error;
	}
};

export const getCouponPublic = async (couponId: string): Promise<CouponPublic | undefined> => {
	try {
		const { error, data } = await supabase.from(Table.couponsPublic).select('*').eq('id', couponId);
		if (error) {
			throw error;
		}
		if (data?.[0]) {
			const coupon = data?.[0];
			return {
				id: couponId,
				businessName: coupon.business_name,
				couponTitle: coupon.coupon_title,
				couponDescription: coupon.coupon_description,
				couponCode: coupon.coupon_code
			};
		}
		return undefined;
	} catch (error) {
		throw error;
	}
};

const Table = {
	coupons: 'coupons',
	couponsPublic: 'coupons_public'
};
