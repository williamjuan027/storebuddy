<script lang="ts">
	import { addCoupon } from '$lib/store/coupon.store';
	import { goto } from '$app/navigation';
	import { session } from '$lib/store/session.store';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$session) {
			goto('/login', {
				replaceState: true
			});
		}
	});
	let additionalNotes = '';

	const couponData = {
		couponTitle: '1 Free Coffee ☕ ',
		couponDescription: 'Visit us at any of our stores to redeem your free coffee',
		couponCode: 'SUPABASE8',
		businessName: 'Supabase Cafe'
	};

	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let couponUrl: string | undefined = undefined;

	const generateCoupon = () => {
		if (!couponData.couponTitle || !couponData.couponDescription || !couponData.couponCode) {
			status = 'error';
			return;
		}
		status = 'loading';
		addCoupon({
			...couponData,
			metadata: {
				additionalNotes
			}
		}).then((res) => {
			if (res) {
				status = 'success';
				couponUrl = `http://localhost:5173/coupon/${res.id}`;
			}
		});
	};
	const reset = () => {
		couponUrl = undefined;
		status = 'idle';
	};

	const copy = () => {
		if (couponUrl) {
			navigator.clipboard.writeText(couponUrl);
		}
	};
</script>

<svelte:head>
	<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</svelte:head>

<div class="flex flex-col items-center min-fill">
	<div class="max-w-5xl flex flex-col gap-3 px-5 py-10 w-full">
		<h1 class="text-3xl font-semibold">Generate Coupon</h1>
		{#if !couponUrl}
			<!-- form -->
			<form class="flex flex-col gap-4">
				<div class="flex flex-col w-full gap-1">
					<div class="flex flex-col w-full gap-1">
						<label for="business" class="font-medium">Business Name</label>
						<textarea
							id="business"
							placeholder="Visit us at any of our stores to redeem your free coffee."
							class="border rounded-lg px-3 py-2"
							bind:value={couponData.businessName}
						/>
					</div>

					<label for="title" class="font-medium">Title</label>
					<input
						id="title"
						placeholder="1 Free Coffee"
						class="border rounded-lg px-3 py-2"
						bind:value={couponData.couponTitle}
					/>
				</div>

				<div class="flex flex-col w-full gap-1">
					<label for="description" class="font-medium">Description</label>
					<textarea
						id="description"
						placeholder="Visit us at any of our stores to redeem your free coffee."
						class="border rounded-lg px-3 py-2"
						bind:value={couponData.couponDescription}
					/>
				</div>

				<div class="flex flex-col w-full gap-1">
					<label for="couponCode" class="font-medium">Coupon Code</label>
					<input
						id="couponCode"
						placeholder="SUPABASE8"
						class="border rounded-lg px-3 py-2"
						bind:value={couponData.couponCode}
					/>
				</div>

				<div class="flex flex-col w-full gap-1">
					<label for="metadata" class="font-medium">Metadata</label>
					<span>This won't be displayed to the users, for your internal reference only</span>
					<textarea
						id="metadata"
						placeholder="Provide free coffee (small size) with any purchase, not available for takeaway or deliveries"
						class="border rounded-lg px-3 py-2 h-64"
						bind:value={additionalNotes}
					/>
				</div>

				<button
					class="w-full py-4 rounded-lg bg-purple-900 font-medium text-white"
					on:click={generateCoupon}>Generate Coupon</button
				>
			</form>
		{:else}
			<div class="flex flex-col p-4 rounded-lg bg-purple-100 gap-5 items-center shadow-lg">
				<span class="text-xl font-semibold">Coupon Url</span>
				<div class="flex flex-row">
					<div class="self-center px-4 py-2 rounded-lg border border-purple-400 bg-white">
						<span>{couponUrl}</span>
					</div>
				</div>
				<div class="flex flex-row gap-3">
					<button
						class="self-center w-auto px-8 py-3 rounded-lg font-medium text-purple-800 border border-purple-200 bg-white flex flex-row items-center justify-center gap-2"
						on:click={copy}
						>Copy
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
							/>
						</svg>
					</button>
					<a
						href={couponUrl}
						class="self-center w-auto px-8 py-3 rounded-lg bg-purple-900 font-medium text-white flex flex-row items-center justify-center gap-2"
						>View Coupon
					</a>
				</div>
				<button on:click={reset} class="self-center px-8 font-medium text-purple-800"
					>Generate New Coupon
				</button>
			</div>
		{/if}
	</div>
</div>
