import React, { ReactChild, ReactElement, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MapApp from "./Map";

type pokemon = { name: string; url: string };

const queryClient = new QueryClient();

function App() {
    return (
        <div>
            <MapApp />
            <QueryClientProvider client={queryClient}>
                {/* <Component /> */}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </div>
    );
}

const Component = () => {
    const queryClient = useQueryClient();

    const queryInfo = useQuery({
        queryKey: ["pokemon"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return axios
                .get("https://pokeapi.co/api/v2/pokemon")
                .then(res => res.data.results);
        },
        refetchOnWindowFocus: false,
        staleTime: 5000,
    });

    if (queryInfo.isLoading) {
        return <div>Loading...</div>;
    } else if (queryInfo.isError) {
        if (queryInfo.error instanceof Error) {
            return <div>{queryInfo.error.message}</div>;
        }
    } else {
        return (
            <div>
                {queryInfo.data.map((result: pokemon) => (
                    <div key={result.name}>{result.name}</div>
                ))}
                <br />
                {queryInfo.isFetching ? "Updating..." : null}
            </div>
        );
    }
    return <></>;
};

export default App;
