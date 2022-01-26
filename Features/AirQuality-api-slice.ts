import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AIR_QUALITY_RESOURCE_ID, API_KEY, BASE_URL } from "../utils/constants";

interface IAirQuality {
  index_name: string;
  title: string;
  org_type: string;
  created_date: string;
  updated_date: string;
  records: IAirQualityCityData[];
}

interface IAirQualityCityData {
  id: string;
  country: string;
  state: string;
  city: string;
  station: string;
  last_update: string;
  pollutant_id: string;
  pollutant_min: string;
  pollutant_max: string;
  pollutant_avg: string;
  pollutant_unit: string;
}

export const airQuailtySlice = createApi({
  reducerPath: "airQualityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchCityRecords: builder.query<IAirQuality, string | void>({
        query(name = "Delhi") {
          return `/${AIR_QUALITY_RESOURCE_ID}?api-key=${API_KEY}&format=json&offset=0&limit=50&filters[city]=${capitalize(
            name
          )}`;
        },
      }),
    };
  },
});

export const { useFetchCityRecordsQuery } = airQuailtySlice; // this contcatination happens because of

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
