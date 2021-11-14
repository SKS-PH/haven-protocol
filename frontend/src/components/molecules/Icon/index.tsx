import { Component, JSX } from 'solid-js'

const ICONS = {
	settings: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	home: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path d="M3 9.5L12 4L21 9.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path
				d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	search: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path
				d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	github: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	wallet: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20Z"
				stroke="currentColor"
			/>
			<path
				d="M16.5 14C16.2239 14 16 13.7761 16 13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5C17 13.7761 16.7761 14 16.5 14Z"
				fill="currentColor"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M18 7V5.60322C18 4.28916 16.7544 3.33217 15.4847 3.67075L4.48467 6.60409C3.60917 6.83756 3 7.63046 3 8.53656V9"
				stroke="currentColor"
			/>
		</svg>
	),
	link: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	plus: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M6 12H12M18 12H12M12 12V6M12 12V18"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	),
	marketplace: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 24 24" fill="none">
			<path
				d="M20.485 3H16.4933L16.9933 8C16.9933 8 17.9933 9 19.4933 9C20.5703 9 21.3036 8.48445 21.6316 8.1937C21.7623 8.07782 21.8101 7.90091 21.7814 7.72861L21.0768 3.50136C21.0286 3.21205 20.7783 3 20.485 3Z"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M16.4933 3L16.9933 8C16.9933 8 15.9933 9 14.4933 9C12.9933 9 11.9933 8 11.9933 8V3H16.4933Z"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M11.9933 3V8C11.9933 8 10.9933 9 9.49329 9C7.99329 9 6.99329 8 6.99329 8L7.49329 3H11.9933Z"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M7.49331 3H3.50158C3.20828 3 2.95797 3.21205 2.90975 3.50136L2.2052 7.72862C2.17649 7.90091 2.22432 8.07782 2.35502 8.1937C2.68294 8.48445 3.41626 9 4.49329 9C5.99329 9 6.99331 8 6.99331 8L7.49331 3Z"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M3 9V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M14.8333 21V15C14.8333 13.8954 13.9379 13 12.8333 13H10.8333C9.72874 13 8.83331 13.8954 8.83331 15V21"
				stroke="currentColor"
				stroke-miterlimit="16"
			/>
		</svg>
	),
	metamask: (props: JSX.IntrinsicElements['svg']) => (
		<svg {...props} viewBox="0 0 318.6 318.6">
			<style type="text/css">
				{`
.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}
.st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}
.st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}
.st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}
.st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}
.st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}
.st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}
.st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}
.st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}
.st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}
  `}
			</style>
			<polygon class="st0" points="274.1,35.5 174.6,109.4 193,65.8 " />
			<g>
				<polygon class="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	" />
				<polygon class="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	" />
				<polygon class="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	" />
				<polygon class="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	" />
				<polygon class="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	" />
				<polygon class="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	" />
				<polygon class="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	" />
			</g>
			<g>
				<polygon class="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	" />
				<polygon class="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	" />
			</g>
			<polygon class="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 " />
			<polygon class="st3" points="179.7,193.5 188,176.1 208,185.2 " />
			<g>
				<polygon class="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	" />
				<polygon class="st4" points="207,206.8 211.8,247.4 238.3,207.7 	" />
				<polygon class="st4" points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	" />
				<polygon class="st4" points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	" />
			</g>
			<g>
				<polygon class="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	" />
				<polygon class="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	" />
				<polygon class="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	" />
				<polygon class="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	" />
			</g>
			<polygon class="st6" points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 " />
			<polygon class="st6" points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 " />
			<polygon
				class="st7"
				points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4
	140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "
			/>
			<polygon
				class="st8"
				points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "
			/>
			<g>
				<polygon
					class="st9"
					points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4
		281.8,129.1 275.6,124.3 283.6,118.2 	"
				/>
				<polygon
					class="st9"
					points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2
		140.6,106.9 44.4,35.5 	"
				/>
			</g>
			<polygon class="st6" points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 " />
			<polygon class="st6" points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 " />
			<polygon
				class="st6"
				points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6
	173.1,227.6 173.3,182.8 "
			/>
		</svg>
	),
}

export type IconName = keyof typeof ICONS

export type IconProps = JSX.IntrinsicElements['svg'] & {
	name: IconName;
}

export const Icon: Component<IconProps> = (props) => {
	const IconGraphic = ICONS[props.name]

	return <IconGraphic {...props} />
}
