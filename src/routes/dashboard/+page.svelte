<script lang="ts">
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
</script>

<svelte:head>
	<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</svelte:head>

<div class="flex flex-col items-center min-fill">
	<div class="max-w-5xl flex flex-col gap-3 px-5 py-10 w-full">
		<h1 class="text-3xl font-semibold">Dashboard</h1>

		<div class="flex flex-row flex-wrap gap-3">
			<a
				href="/generate"
				class="flex flex-col items-center grow w-1/3 p-6 border border-purple-200 rounded-lg gap-2 transition duration-300 group hover:bg-purple-200 bg-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-14 h-14 stroke-purple-800 transtion group-hover:translate-y-[-5px] duration-300"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>

				<span class="text-xl font-semibold">Generate</span>
			</a>
			<a
				href="/scan"
				class="flex flex-col items-center grow w-1/3 p-6 border border-purple-200 rounded-lg gap-2 transition duration-300 group hover:bg-purple-200 bg-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-14 h-14 stroke-purple-800 transtion group-hover:translate-y-[-5px] duration-300"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
					/>
				</svg>

				<span class="text-xl font-semibold">Scan</span>
			</a>
			<a
				href="/"
				class="flex flex-col items-center grow w-1/3 p-6 border border-purple-200 rounded-lg gap-2 transition duration-300 group hover:bg-purple-200 opacity-50 bg-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-14 h-14 stroke-purple-800 transtion group-hover:translate-y-[-5px] duration-300"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
					/>
				</svg>

				<span class="text-xl font-semibold">Analytics</span>
				<span class="text-gray-400">Coming Soon!</span>
			</a>
		</div>
	</div>
</div>
