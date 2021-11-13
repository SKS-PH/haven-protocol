module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		maxWidth: {
			160: "40rem",
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
				sidebar: "var(--size-sidebar)",
			},
			colors: {
				bg: "var(--color-bg)",
				fg: "var(--color-fg)",
				"fg-inverse": "var(--color-fg-inverse)",
				primary: "var(--color-primary)",
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
		extend: {},
	},
	plugins: [],
};
