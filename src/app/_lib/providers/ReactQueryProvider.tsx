'use client';

import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactNode} from 'react';
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

export default function ReactQueryProvider({
                                               children,
                                           }: {
    children: ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
