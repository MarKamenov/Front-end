import React from 'react'

export const WithLoader = Component => props => 
	props.isLoading ?  (<p>Loading...</p>) : (<Component {...props} />);
	

