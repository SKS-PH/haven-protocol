module.exports = {
	purge: [],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		screens: {
			sm: "540px",
			md: "720px",
			lg: "1080px",
			xl: "1260px",
			"2xl": "1440px",
		},
		maxWidth: {
			160: "40rem",
			"screen-xs": "360px",
			"screen-md": "720px",
			"screen-lg": "1080px",
			"screen-xl": "1260px",
			"screen-2xl": "1440px",
			"container-lg": "720px",
			"container-xl": "900px",
			"container-2xl": "1080px",
			none: "none",
		},
		minWidth: {
			6: "1.5rem",
		},
		minHeight: {
			6: "1.5rem",
		},
		extend: {
			spacing: {
				0.25: "0.0625rem",
				112: "28rem",
				120: "30rem",
				128: "32rem",
				160: "40rem",
				header: "var(--size-header)",
				"sidebar-lg": "var(--size-sidebar-lg)",
				"sidebar-xl": "var(--size-sidebar-xl)",
				"sidebar-2xl": "var(--size-sidebar-2xl)",
			},
			colors: {
				inherit: "inherit",
				bg: "var(--color-bg)",
				fg: "var(--color-fg)",
				"fg-inverse": "var(--color-fg-inverse)",
				"bg-inverse": "var(--color-bg-inverse)",
				primary: "var(--color-primary)",
				"primary-fixed": "var(--color-primary-fixed)",
				secondary: "var(--color-secondary)",
				header: "var(--color-bg-header)",
			},
		},
		container: {
			padding: "1rem",
			center: true,
		},
	},
	variants: {
		extend: {
			opacity: ["dark"],
		},
	},
	plugins: [],
};
