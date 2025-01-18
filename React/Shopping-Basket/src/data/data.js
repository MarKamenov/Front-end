

const furniture = [
	{
		"id": 1,
		"make": "Ikea",
		"model": "Sofa",
		"year": 2005,
		"description": "It is very good sofa",
		"price": 10,
		"image": "http://www.ikea.com/us/en/images/products/knislinge-sofa-white__0119786_PE276232_S4.JPG"
	},
	{
		"id": 2,
		"make": "Ikea",
		"model": "Chair",
		"year": 2007,
		"description": "Comfy chair",
		"price": 20,
		"image": "https://images.lowes.ca/images/articles/wk21_furniture_accent.jpg"
	},
	{
		"id": 3,
		"make": "Ikea",
		"model": "Table",
		"year": 2006,
		"description": "Dining table",
		"price": 30,
		"image": "https://standardfurniture.azureedge.net/libraries/media/content-assets/carousel-images/couture-elegance_10560.jpg?ext=.jpg"
	},
	{
		"id": 4,
		"make": "Ikea",
		"model": "Chess table",
		"year": 2002,
		"description": "Chess table",
		"price": 40,
		"image": "https://i.pinimg.com/originals/e1/d6/ff/e1d6ffdaa186a2cc18006d4c2729b086.jpg"
	}
]

export const furnitureResponse = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(furniture)
		}, 350)
	})
}
