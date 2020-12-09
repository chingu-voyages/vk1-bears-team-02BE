import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext(null);

export const AuthenticationProvider = (props) => {
	const [authenticated, setAuth] = useState(false);
	const [details, setDetails] = useState([{

		username: "wewe",
		password: ""
	},
	{
		username: "wewewew",
		password: ""
	}])
	return (
		<AuthenticationContext.Provider value={{ authenticated, setAuth, details, setDetails }}>
			{props.children}
		</AuthenticationContext.Provider>
	);
};
