<script lang="ts">
	import { supabase } from '../../supabaseClient';

	let loading = false;
	let email = '';
	let message = '';

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			message = 'Check your email for login link!';
		} catch (error) {
			if (error instanceof Error) {
				message = error.message;
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex flex-col items-center min-fill">
	<div
		class="max-w-5xl flex flex-row flex-wrap-reverse justify-center items-center gap-10 px-5 py-10 md:py-32 w-full items-cente"
	>
		<div class="flex flex-col gap-4 w-full md:w-1/3 grow">
			<div class="flex flex-col gap-1">
				<span class="font-medium"
					>Store<span class="text-purple-800 font-semibold">Buddy</span></span
				>
				<span class="description">Sign in via magic link with your email below</span>
			</div>
			<form class="flex flex-col gap-3" on:submit|preventDefault={handleLogin}>
				<div class="flex flex-col w-full gap-1">
					<label for="email" class="font-medium">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Your email"
						class="border rounded-lg px-3 py-2"
						bind:value={email}
					/>
				</div>
				<button
					type="submit"
					class="w-full py-4 rounded-lg bg-purple-900 font-medium text-white"
					disabled={loading}
				>
					<span>{loading ? 'Loading' : 'Send magic link'}</span>
				</button>
				{#if message}
					<span class="text-base font-medium">{message}</span>
				{/if}
			</form>
		</div>
		<div class="flex flex-col gap-4 w-full md:w-1/2 grow h-64 md:h-96 bg-purple-200">
			<img
				src="/store-outdoors.jpg"
				alt="store front"
				class="h-full w-full object-cover rounded-lg"
			/>
		</div>
	</div>
</div>
