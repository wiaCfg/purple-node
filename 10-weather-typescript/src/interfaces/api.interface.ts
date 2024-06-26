export interface IWeather {
	name: string;
    weather: { 
		icon: string,  
		description: string, 
		main: string
	}[];
	main: {
		temp: string,
		feels_like: string,
		humidity: string,
	};
	wind: {
		speed: string
	};
}