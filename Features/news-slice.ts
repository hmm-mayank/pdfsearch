import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface INewsFormat {
  creator?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  author?: string;
  content?: string;
  guid?: string;
  contentSnippet?: string;
  isoDate?: string;
}
interface INewsImage {
  link?: string;
  url?: string;
  title?: string;
}
interface INewsListFormat {
  items: INewsFormat[];
  title?: string;
  description?: string;
  link?: string;
  language?: string;
  copyright?: string;
  image?: INewsImage;
}
interface INewsDetail {
  title?: string;
  text?: string;
  topImage?: string;
  description?: string;
  author?: string;
}

export const newsSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders(headers) {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchNews: builder.query<INewsListFormat[], string | void>({
        query(lang = "en") {
          return `/news?lang=${lang}`;
        },
      }),
      fetchNewsDetail: builder.query<INewsDetail, string | void>({
        query(lang = "en") {
          return `/api/detailNews?news=${lang}`;
        },
      }),
    };
  },
});

export const { useFetchNewsQuery, useFetchNewsDetailQuery } = newsSlice;
