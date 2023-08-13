<script lang="ts">
	import type { Coupon } from '$lib/models/coupon.model';
	import { getCoupon } from '$lib/store/coupon.store';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { session } from '$lib/store/session.store';

	let status: 'idle' | 'loading' | 'scanning' | 'success' | 'error' = 'idle';

	let html5Qrcode: Html5Qrcode;
	let coupon: Coupon | undefined = undefined;

	onMount(() => {
		if (!$session) {
			goto('/login', {
				replaceState: true
			});
			return;
		}
		html5Qrcode = new Html5Qrcode('reader');
	});

	const start = () => {
		status = 'loading';
		html5Qrcode
			.start(
				{ facingMode: 'environment' },
				{
					fps: 10, // Optional, frame per seconds for qr code scanning
					qrbox: { width: 250, height: 250 } // Optional, if you want bounded box UI
				},
				onScanSuccess,
				onScanFailure
			)
			.then(() => {
				// Scanning
				status = 'scanning';
			})
			.catch((err) => {
				// Start failed, handle it.
				status = 'error';
			});
	};

	const stop = () => {
		status = 'idle';
		html5Qrcode.stop();
	};

	const onScanSuccess = (decodedText: string, decodedResult: any) => {
		if (decodedText) {
		}
		getCouponDetails(decodedText).then(() => {
			status = 'success';
			html5Qrcode.stop();
		});
	};

	const onScanFailure = (error: string) => {
		console.warn(`Code scan error = ${error}`);
		// don't stop the scanner here, this gets emitted on every frame it doesn't find a qr code
	};
	const closeBottomsheet = () => {
		status = 'idle';
	};

	const getCouponDetails = (couponId: string) => {
		return getCoupon(couponId).then((_coupon) => {
			coupon = _coupon;
			console.log('coupon', coupon);
			return Promise.resolve();
		});
	};
</script>

<div class="flex flex-col items-center justify-center min-fill">
	<div class="grid grid-rows-1 grid-cols-1 items-center w-full h-full">
		{#if status === 'idle'}
			<span class="col-start-1 col-span-1 row-start-1 row-span-1 font-medium text-center p-5"
				>Click on the button below to start scanning</span
			>
		{/if}
		<div
			class="col-start-1 col-span-1 row-start-1 row-span-1 p-5 h-full w-full rounded-xl min-h-[500px]"
		>
			<div class="h-[500px] h-full w-full overflow-hidden">
				<div id="reader" />
			</div>
		</div>
	</div>
	<div class="p-5 fixed bottom-0 bg-white w-full z-0">
		{#if status === 'scanning'}
			<button
				class="bg-white w-full py-4 font-semibold text-purple-800 border border-purple-800 rounded-lg"
				on:click={stop}>Stop</button
			>
		{:else if status === 'idle'}
			<button
				class="bg-purple-800 w-full py-4 font-semibold text-white border border-purple-800 rounded-lg"
				on:click={start}>Start Scanning</button
			>
		{:else if status === 'loading'}
			<div
				class="bg-purple-800 w-full py-4 font-semibold text-white border border-purple-800 rounded-lg flex flex-row items-center justify-center"
			>
				Loading Scanner...
			</div>
		{/if}
	</div>
</div>
{#if status === 'success' && coupon}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="fixed top-0 w-full h-screen bg-black opacity-50 z-10" on:click={closeBottomsheet} />
{/if}
<div
	class="fixed bottom-0 w-full transition duration-300 z-20"
	class:translate-y-full={status !== 'success'}
	class:translate-y-0={status === 'success'}
>
	<div class="bg-white shadow-lg p-4 rounded-xl border border-purple-200 flex flex-col gap-4">
		<h2 class="text-2xl font-semibold">Scanned Coupon</h2>
		<div class="flex flex-col gap-1">
			<span class="text-sm">Business</span>
			<span class="font-medium">{coupon?.businessName}</span>
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-sm">Name</span>
			<span class="font-medium">{coupon?.couponTitle}</span>
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-sm">Description</span>
			<span class="font-medium">{coupon?.couponDescription}</span>
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-sm">Coupon Code</span>
			<span class="font-medium text-purple-800">{coupon?.couponCode}</span>
		</div>
		{#if coupon?.metadata?.additionalNotes}
			<div class="flex flex-col gap-1">
				<span class="text-sm">Internal Notes</span>
				<span class="font-semibold">{coupon.metadata?.additionalNotes}</span>
			</div>
		{/if}
	</div>
</div>
