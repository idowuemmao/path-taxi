import { NextResponse } from "next/server";

//api.mapbox.com/search/searchbox/v1/suggest?q=Onireke+Rd&language=en&country=ng&proximity=-73.990593,40.740121&types=address&session_token=02bfa2ed-3793-4fd1-88b5-cf4ee3908986&access_token=pk.eyJ1IjoiZW1teWdyZWF0IiwiYSI6ImNsbGR0aGYxbzBqMW0zZXAxN2tkOTZrb3oifQ.rHmnNMD5UYJa0P6vrEK1pw

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  const res = await fetch(
    `${BASE_URL}?q=${searchText}&language=en&navigation_profile=driving&country=ng&limit=2&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&proximity=3.8936630347481866,7.3841686732152425&origin=3.896910931815796,7.382298433653318&types=address,street&session_token=02bfa2ed-3793-4fd1-88b5-cf4ee3908986&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    { headers: { "Content-Type": "application/json" } }
  );

  const searchResult = await res.json();

  return NextResponse.json(searchResult);
}

//api.mapbox.com/search/searchbox/v1/suggest?q=oyo+&language=en&navigation_profile=driving&country=ng&proximity=3.8936630347481866,7.3841686732152425&origin=3.896910931815796,7.382298433653318&types=address,street&session_token=02bfa2ed-3793-4fd1-88b5-cf4ee3908986&access_token=pk.eyJ1IjoiZW1teWdyZWF0IiwiYSI6ImNsbGR0aGYxbzBqMW0zZXAxN2tkOTZrb3oifQ.rHmnNMD5UYJa0P6vrEK1pw
