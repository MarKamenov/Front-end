 
	
		const user = 	{	"name": "John Pesho"	}

		export const userResponse = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(user)
				},300)
			})
		}