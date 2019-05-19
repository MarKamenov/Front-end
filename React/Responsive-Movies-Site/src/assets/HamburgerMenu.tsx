import * as React from 'react';

interface ISvgIconProps {
	className?: string;
	color?: string;
}

const HamburgerMenu: React.SFC<ISvgIconProps> = ({ color }) => (
	<svg viewBox="0 0 17 12">
		<g id="Design" stroke={color} strokeWidth="1" fill={color} fillRule="evenodd">
			<g id="19.-Desktop-1440px-Users-Table-/-Snackbar" transform="translate(-15.973053, -18.000000)">
				<g id="Sidebar-expanded" transform="translate(-2.000000, 0.000000)">
					<g id="Navbar" transform="translate(1.000000, 0.000000)">
						<g id="hamburger_icon" transform="translate(13.000000, 11.000000)">
							<rect id="Bounding-Box" fillOpacity="0" fill={color} x="0.455078125" y="0.571289062" />
							<g
								id="Hamburger_icon"
								transform="translate(5.500000, 7.500000)"
								stroke={color}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							>
								<path d="M-3.64153152e-14,5 L14.08,5" id="Shape" />
								<path d="M-3.64153152e-14,0.64 L14.08,0.64" id="Shape" />
								<path d="M-3.64153152e-14,9.64 L14.08,9.64" id="Shape" />
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
);

export default HamburgerMenu;
