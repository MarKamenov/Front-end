import * as React from 'react';
import styled from 'styled-components';
import * as photo from "../assets/photo.png"

export interface IPhotoViewerProps {
	className?: string;
}

class UnstyledPhotoViewer extends React.Component<IPhotoViewerProps> {
	constructor(props: IPhotoViewerProps) {
		super(props);
	}

	public render() {
		return (
		<div className={this.props.className}>
		<div className="content"><img role="img" src={photo} alt="landing-page-photo"/></div>
	</div>
		)
	}
}

const PhotoView = styled(UnstyledPhotoViewer)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	
	.content {
		margin: 5px;
		overflow: auto;
		position: relative;
		max-width: 100%;
	}
`;

export default PhotoView;
