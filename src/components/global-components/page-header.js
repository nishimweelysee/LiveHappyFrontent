import React from 'react';
import {Link} from 'react-router-dom';

function Page_header(props) {

	let HeaderTitle = props.headertitle;
	let ParentTitle = props.parenttitle;
	let ParentLink = props.parentlink;
	let publicUrl = process.env.PUBLIC_URL + '/'
	let Subheader = props.subheader ? props.subheader : HeaderTitle

	return (

		<div className="breadcrumb-area bg-overlay-2"
			 style={{backgroundImage: 'url("' + publicUrl + 'assets/img/other/7.png")'}}>
			<div className="container">
				<div className="breadcrumb-inner">
					<div className="section-title text-center">
						<h2 className="page-title">{HeaderTitle}</h2>
						<ul className="page-list">
							<li><Link to={ParentLink?ParentLink:"/"}>{ParentTitle?ParentTitle:"Home"}</Link></li>
							<li>{Subheader}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>


	)
}


export default Page_header
