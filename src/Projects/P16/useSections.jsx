import { useMemo } from "react";
import useFetchHook from "../P13/useFetchHook";

const useSections = () => {
    const options = useMemo(() => ({}), []);

    const { data, isLoading, errorMsg } = useFetchHook({
        url: "https://rickandmortyapi.com/api/episode",
        options: options,
    });

    // useEffect(() => {
    //     console.log(data, isLoading, errorMsg);
    // }, [data, isLoading, errorMsg]);

    const sections = useMemo(() => {
        if (!data) return [];

        return data.results.map((character) => {
            return {
                name: character.name,
                date: character.air_date,
            };
        });
    }, [data]);

    return { sections, isLoading, errorMsg };
};

export default useSections;
