import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Funnel, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Movie } from '@/types/Movie';
import MovieModal from '@/components/MovieModal';

type FilterKey = 'type' | 'year' | 'platform';
type SortOption = {
    key: 'title' | 'year';
    order: 'asc' | 'desc';
};

export default function MovieCatalog() {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showAllValues, setShowAllValues] = useState<Record<string, boolean>>({});

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const filterBtnRef = useRef<HTMLButtonElement>(null);
    const sortBtnRef = useRef<HTMLButtonElement>(null);

    const initialFilters: Record<`${FilterKey}s`, string[]> = {
        types: [],
        years: [],
        platforms: []
    };

    const [selectedFilters, setSelectedFilters] = useState(initialFilters);
    const [sortBy, setSortBy] = useState<SortOption>({
        key: "year",
        order: "desc",
    });

    const getFiltersAndSortFromURL = () => {
        const url = new URLSearchParams(searchParams.toString());

        const filters = {
            types: url.getAll("types"),
            years: url.getAll("years"),
            platforms: url.getAll("platforms"),
        };

        const sortKey = url.get("sortKey") as 'title' | 'year' | null;
        const rawOrder = url.get("sortOrder");
        const sortOrder: "asc" | "desc" = rawOrder === "desc" ? "desc" : "asc";

        const sort = sortKey ? { key: sortKey, order: sortOrder } : null;

        return { filters, sort };
    };

    useEffect(() => {
        const { filters, sort } = getFiltersAndSortFromURL();
        setSelectedFilters(filters);
        if (sort) setSortBy(sort);

        setLoading(true);
        fetch('http://localhost:8080/movie')
            .then((res) => res.json())
            .then((data: Movie[]) => {
                setAllMovies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load movies', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const { filters, sort } = getFiltersAndSortFromURL();
        setSelectedFilters(filters);
        if (sort) setSortBy(sort);
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const isInsideFilter =
                filterRef.current?.contains(target) || filterBtnRef.current?.contains(target);
            const isInsideSort =
                sortRef.current?.contains(target) || sortBtnRef.current?.contains(target);
            if (!isInsideFilter && showFilter) setShowFilter(false);
            if (!isInsideSort && showSort) setShowSort(false);
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [showFilter, showSort]);

    const applyFilters = (
        data: Movie[],
        filters: Record<`${FilterKey}s`, string[]>
    ) => {
        return data.filter((movie) => {
            const typeMatch = filters.types.length === 0 || filters.types.includes(movie.type);
            const yearMatch = filters.years.length === 0 || filters.years.includes(movie.year.toString());
            const platformMatch = filters.platforms.length === 0 || filters.platforms.includes(movie.platform);
            const searchMatch = movie.title.toLowerCase().includes(searchQuery);

            return typeMatch && yearMatch && platformMatch && searchMatch;
        });
    };

    const applySorting = (data: Movie[]) => {
        const { key, order } = sortBy;
        return [...data].sort((a, b) => {
            if (key === "year") {
                return order === "asc" ? a.year - b.year : b.year - a.year;
            }
            const valA = a[key]?.toString().toLowerCase();
            const valB = b[key]?.toString().toLowerCase();
            return order === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        });
    };

    useEffect(() => {
        const filtered = applyFilters(allMovies, selectedFilters);
        setFilteredMovies(applySorting(filtered));
    }, [selectedFilters, allMovies, sortBy]);

    const toggleFilter = (category: `${FilterKey}s`, value: string) => {
        setSelectedFilters((prev) => {
            const exists = prev[category].includes(value);
            const updated = exists
                ? prev[category].filter((v) => v !== value)
                : [...prev[category], value];
            const newFilters = { ...prev, [category]: updated };

            const params = new URLSearchParams();
            Object.entries(newFilters).forEach(([k, values]) => {
                values.forEach((v) => params.append(k, v));
            });
            if (sortBy.key) {
                params.set("sortKey", sortBy.key);
                params.set("sortOrder", sortBy.order);
            }
            router.push(`?${params.toString()}`);
            return newFilters;
        });
    };

    const getUnique = (key: FilterKey): string[] => {
        const values = [...new Set(allMovies.map((movie) =>
            key === 'year' ? movie.year.toString() : movie[key]
        ))];

        return key === "year"
            ? values.sort((a, b) => Number(b) - Number(a))
            : values.sort((a, b) => a.localeCompare(b));
    };

    const handleToggleWatched = async (title: string) => {
        const movie = allMovies.find((m) => m.title === title);
        if (!movie) return;

        const newWatchedStatus = !movie.watched;

        try {
            const response = await fetch(`http://localhost:8080/movie/${encodeURIComponent(title)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ watched: newWatchedStatus }),
            });

            if (response.ok) {
                setAllMovies((prev) =>
                    prev.map((m) =>
                        m.title === title ? { ...m, watched: newWatchedStatus } : m
                    )
                );
                setSelectedMovie((prev) =>
                    prev && prev.title === title
                        ? { ...prev, watched: newWatchedStatus }
                        : prev
                );
            } else {
                alert("Failed to update movie.");
            }
        } catch (error) {
            alert("Network error updating movie.");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6 text-center">🎬 Movie Catalog</h1>

            <div className="flex justify-start items-center mb-6 gap-4 relative">
                <button
                    ref={filterBtnRef}
                    onClick={() => {
                        setShowFilter(!showFilter);
                        if (!showFilter) setShowSort(false);
                    }}
                    className={`hover:scale-110 transition-colors ${
                        showFilter
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    <Funnel />
                </button>

                <button
                    ref={sortBtnRef}
                    onClick={() => {
                        setShowSort(!showSort);
                        if (!showSort) setShowFilter(false);
                    }}
                    className={`hover:scale-110 transition-colors ${
                        showSort
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    <ArrowUpDown />
                </button>


                {showFilter && (
                    <div ref={filterRef} className="absolute top-10 left-0 z-50 w-72 p-4 rounded-lg shadow-xl bg-[#1e1e1e] text-[#e5e5e5] border border-[#2a2a2a]">
                        {(['type', 'year', 'platform'] as FilterKey[]).map((categoryKey) => {
                            const options = getUnique(categoryKey);
                            const showAll = showAllValues[categoryKey] || false;
                            const displayOptions = showAll ? options : options.slice(0, 6);
                            return (
                                <div key={categoryKey} className="mb-4">
                                    <p className="font-semibold capitalize mb-2">
                                        {categoryKey === 'type' ? 'Genres' : categoryKey === 'year' ? 'Years' : 'Platforms'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {displayOptions.map((value) => (
                                            <button
                                                key={value}
                                                onClick={() => toggleFilter(`${categoryKey}s`, value)}
                                                className={`text-xs px-2 py-1 rounded font-medium transition ${
                                                    selectedFilters[`${categoryKey}s`].includes(value)
                                                        ? "bg-white text-black"
                                                        : "bg-[#2e2e2e] text-white"
                                                }`}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                    {options.length > 6 && (
                                        <button
                                            onClick={() =>
                                                setShowAllValues((prev) => ({
                                                    ...prev,
                                                    [categoryKey]: !prev[categoryKey],
                                                }))
                                            }
                                            className="text-xs text-gray-300 hover:text-white mt-2"
                                        >
                                            {showAll ? 'Show less' : 'Show all'} {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {showSort && (
                    <div ref={sortRef} className="absolute top-10 left-16 z-50 w-72 p-4 rounded-lg shadow-xl bg-[#1e1e1e] text-[#e5e5e5] border border-[#2a2a2a]">
                        {(['title', 'year'] as const).map((key) => (
                            <div key={key} className="flex justify-between items-center mb-3">
                                <span className="font-semibold capitalize mb-2">
                                    {key === 'title' ? 'Title' : 'Year'}
                                </span>
                                <div className="flex gap-1">
                                    {(['asc', 'desc'] as const).map((order) => (
                                        <button
                                            key={order}
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                sortBy.key === key && sortBy.order === order
                                                    ? "bg-white text-black"
                                                    : "bg-[#2e2e2e] text-white"
                                            }`}
                                            onClick={() => {
                                                const newSort: SortOption = { key, order };
                                                setSortBy(newSort);
                                                const params = new URLSearchParams();
                                                Object.entries(selectedFilters).forEach(([k, values]) => {
                                                    values.forEach((v) => params.append(k, v));
                                                });
                                                params.set("sortKey", newSort.key);
                                                params.set("sortOrder", newSort.order);
                                                router.push(`?${params.toString()}`);
                                            }}
                                        >
                                            {order === 'asc'
                                                ? key === 'year' ? 'Oldest First' : 'A→Z'
                                                : key === 'year' ? 'Latest First' : 'Z→A'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : filteredMovies.length === 0 ? (
                <p className="text-center text-gray-400">No movies found.</p>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.title}
                            className="w-40 text-center cursor-pointer transform transition duration-200 hover:scale-105 hover:shadow-xl"
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-60 object-cover rounded-lg shadow-md"
                            />
                            <p className="mt-2">{movie.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onToggleWatched={handleToggleWatched}
                />
            )}
        </div>
    );
}
