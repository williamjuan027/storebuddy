import type { AuthSession } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const session = writable<AuthSession | null>(null);
let _session: AuthSession | null = null;

export const setSession = (authSession: AuthSession | null) => {
	_session = authSession;
	session.set(authSession);
};

export const getSession = () => {
	return _session;
};
