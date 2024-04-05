type RouteParams = {
    location: string;
    apiKey: string;
}

export async function GET( { params }: { params: RouteParams } ): Promise<Response> {
    console.log("params", params);
    const { location, apiKey } = params; 
    console.log(location, apiKey);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    return response;
}