<script lang="ts">
	import type { CouponPublic } from '$lib/models/coupon.model';
	import { getCouponPublic } from '$lib/store/coupon.store';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { couponId } = data;

	export let qrContainer: HTMLElement;

	let coupon: CouponPublic | undefined = undefined;
	onMount(() => {
		if (couponId) {
			getCouponPublic(couponId).then((_coupon) => {
				coupon = _coupon;
				console.log('coupon', coupon);
				const qrGenerator = (<any>window).QRCode;
				if (qrGenerator) {
					new (<any>window).QRCode(qrContainer, {
						text: couponId,
						width: 128,
						height: 128,
						colorDark: '#000000',
						colorLight: '#ffffff',
						correctLevel: qrGenerator.CorrectLevel.H
					});
				}
			});
		}
	});
</script>

<svelte:head>
	<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</svelte:head>

<div class=" flex flex-col items-center min-fill">
	<div class="max-w-5xl flex flex-col gap-5 px-5 py-14 w-full">
		<div
			class="flex flex-col gap-5 rounded-lg p-10 shadow-lg w-full self-center max-w-xl border border-purple-100 bg-white"
		>
			<!-- text container -->
			{#if coupon}
				<div class="flex flex-col gap-2">
					<span class="text-sm font-medium text-green-700">{coupon?.businessName}</span>
					<span class="text-2xl font-semibold">{coupon?.couponTitle}</span>
					<span class="text-lg">{coupon?.couponDescription}</span>
				</div>
			{/if}
			<div class="flex flex-col gap-5 items-center">
				<!-- qr container -->
				<div class="p-2 rounded-lg bg-white" bind:this={qrContainer} />
				<span class="text-base text-center">or use coupon code below</span>
				<div class="px-4 py-2 bg-white rounded-lg border border-purple-200">
					{#if coupon}
						<span class="text-2xl font-bold uppercase text-purple-900">{coupon.couponCode}</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
