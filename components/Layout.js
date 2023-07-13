import React, { useEffect } from "react";

const Layout = ({ children }) => {

	return (
		<>
			<main aria-label="app-body"><div>{children}</div></main>
		</>
	);
};

export default Layout;
