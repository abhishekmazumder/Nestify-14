// "use client";
// import { useEffect, useState } from "react";
// import { setDefaults, fromAddress } from "react-geocode";
// import Map, { Marker } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// import Image from "next/image";
// import pin from "@/assets/images/pin.svg";
// import Spinner from "./Spinner";

// const PropertyMap = ({ property }) => {
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);
//   const [viewport, setViewport] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 12,
//     width: "100%",
//     height: "500px",
//   });
//   const [loading, setLoading] = useState(true);
//   const [geocodeError, setGeocodeError] = useState(false);

//   setDefaults({
//     key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//     language: "en",
//     region: "us",
//   });

//   useEffect(() => {
//     const fetchCoords = async () => {
//       try {
//         const res = await fromAddress(
//           `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
//         );
//         // Check geocode results
//         if (res.results.length === 0) {
//           setGeocodeError(true);
//           return;
//         }
//         const { lat, lng } = res.results[0].geometry.location;
//         setLat(lat);
//         setLng(lng);
//         setViewport({
//           ...viewport,
//           latitude: lat,
//           longitude: lng,
//         });
//       } catch (error) {
//         console.log(error);
//         setGeocodeError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoords();
//   }, []);

//   if (loading) return <Spinner />;

//   if (geocodeError)
//     return <div className="text-xl">No location data found!</div>;

//   return (
//     !loading && (
//       // <Map
//       //   {...viewport}
//       //   mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//       //   mapStyle="mapbox://styles/mapbox/streets-v11"
//       //   onViewportChange={(nextViewport) => setViewport(nextViewport)}
//       // />
//       // <Map
//       //   mapLib={import("maplibre-gl")}
//       //   initialViewState={{
//       //     longitude: -100,
//       //     latitude: 40,
//       //     zoom: 3.5,
//       //   }}
//       //   style={{ width: "600", height: "400px" }}
//       //   mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//       //   mapStyle="mapbox://styles/mapbox/streets-v11"
//       // />
//       <Map
//         mapLib={import("maplibre-gl")}
//         initialViewState={{
//           longitude: lng,
//           latitude: lat,
//           zoom: 15,
//         }}
//         style={{ width: "100%", height: "500px" }}
//         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <Marker longitude={lng} latitude={lat} anchor="bottom">
//           <Image
//             src={pin}
//             alt="Property Location"
//             width={30}
//             height={30}
//             className="w-8 h-8"
//           />
//         </Marker>
//       </Map>
//     )
//   );
// };

// export default PropertyMap;
