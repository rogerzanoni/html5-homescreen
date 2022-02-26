export function current_weather() {
    return new Promise((resolve, reject) => {
        resolve({
            weather: [
                {
                    icon: "01d",
                    description: "clear sky"
                },
            ],
            wind: {
                speed: 7.56
            },
            main: {
                temp: 46,
                humidity: 53
            },
            name: "Mountain View",
        });
    });
}