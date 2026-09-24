import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function currentTheme(): Theme {
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
	// null until mounted, so the server render and first client render match.
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		setTheme(currentTheme());
	}, []);

	function toggle() {
		const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Storage can be unavailable (private mode); the toggle still works for this page view.
		}
		setTheme(next);
	}

	const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={label}
			title={label}
			className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-accent"
		>
			{theme === 'light' ? (
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
					<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
				</svg>
			) : (
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
				</svg>
			)}
		</button>
	);
}
