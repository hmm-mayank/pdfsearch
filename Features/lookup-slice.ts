import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IphoneLookup {
  callerName: string;
  countryCode: string;
  phoneNumber: string;
  nationalFormat: string;
  carrier: IphoneCarrier;
}

interface IphoneCarrier {
  mobile_country_code: string;
  mobile_network_code: string;
  name: string;
  type: string;
  error_code: string;
}

export const lookupSlice = createApi({
  reducerPath: "lookupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders(headers) {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchLookup: builder.query<IphoneLookup, string | void>({
        query(phone = "en") {
          return `/phonelookup?phone=${phone}`;
        },
      }),
      fetchLookupList: builder.query<IphoneLookup[], string | void>({
        query(fileName) {
          return `/phonelookup?type=read&fileName=${fileName}`;
        },
      }),
    };
  },
});

export const { useFetchLookupQuery, useFetchLookupListQuery } = lookupSlice;
