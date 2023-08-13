<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { supabase } from '../supabaseClient';
	import { setSession, session } from '$lib/store/session.store';
	import { goto } from '$app/navigation';

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			setSession(_session);
		});
	});

	const logout = () => {
		supabase.auth.signOut();
		goto('/');
	};
</script>

<div class="bg-gradient-to-tr from-cyan-100/90 via-purple-100/50 to-white">
	<!-- navbar -->
	<div class="sticky top-0 w-full flex flex-row items-center justify-between py-4 px-6 bg-white">
		<a href="/" class="font-medium">Store<span class="text-purple-800 font-semibold">Buddy</span></a
		>
		<div class="flex flex-row items-center gap-3">
			{#if !$session}
				<a
					href="/login"
					class="px-6 py-2 rounded-lg border border-purple-800 font-medium text-purple-800 transition hover:opacity-70 duration-300"
					>Login</a
				>
				<a
					href="/login"
					class="px-6 py-2 rounded-lg bg-purple-800 border border-purple-800 font-medium text-white transition hover:opacity-70 duration-300 flex flex-row items-center gap-1"
					>Register<span class="hidden md:block"> for Free</span></a
				>
			{:else}
				<a
					href="/dashboard"
					class="py-2 px-4 font-medium text-purple-800 transition hover:opacity-70 duration-300"
					>Dashboard</a
				>
				<button
					on:click={logout}
					class="px-6 py-2 rounded-lg border border-purple-800 font-medium text-purple-800 transition hover:opacity-70 duration-300"
					>Logout</button
				>
			{/if}
		</div>
	</div>

	<slot />
</div>
