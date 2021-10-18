import React from "react";

type Loader = {
	message?: string;
};

export const Loader = ({ message }: Loader) => {
	return <div className="loader">{message || "Loading..."}</div>;
};
