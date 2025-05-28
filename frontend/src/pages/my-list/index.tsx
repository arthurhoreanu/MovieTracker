import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Funnel, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Movie } from '@/types/Movie';

type FilterKey = 'type' | 'year' | 'platform';
type SortOption = {
    key: 'title' | 'year';
    order: 'asc' | 'desc';
};

export default function MyWatchedList() {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showAllValues, setShowAllValues] = useState<Record<string, boolean>>({});

    const router = useRouter();
    const searchParams = useSearchParams();
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

    const getFiltersAndSortFromURL = (): {
        filters: Record<`${FilterKey}s`, string[]>;
        sort: SortOption | null;
    } => {
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
                const watchedMovies = data.filter((m) => m.watched);
                setAllMovies(watchedMovies);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load watched movies', err);
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
            if (!isInsideFilter && showFilter) {
                setShowFilter(false);
            }
            if (!isInsideSort && showSort) {
                setShowSort(false);
            }
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

            return typeMatch && yearMatch && platformMatch;
        });
    };

    const applySorting = (data: Movie[]) => {
        const { key, order } = sortBy;
        return [...data].sort((a, b) => {
            if (key === "year") {
                const valA = Number(a[key]);
                const valB = Number(b[key]);
                return order === "asc" ? valA - valB : valB - valA;
            }
            // For title sorting
            const valA = a[key]?.toString().toLowerCase();
            const valB = b[key]?.toString().toLowerCase();
            if (valA < valB) {
                return order === "asc" ? -1 : 1;
            }
            if (valA > valB) {
                return order === "asc" ? 1 : -1;
            }
            return 0;
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
            setShowFilter(true);
            return newFilters;
        });
    };

    const getUnique = (key: 'type' | 'year' | 'platform'): string[] => {
        const values = [...new Set(allMovies.map((movie) => {
            if (key === 'year') return movie.year.toString();
            return movie[key];
        }))];

        if (key === "year") {
            return values.sort((a, b) => Number(b) - Number(a));
        }
        return values.sort((a, b) => a.localeCompare(b));
    };

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6 text-center">
                ✅ Watched Movies
            </h1>

            <div className="flex justify-start items-center mb-6 gap-4 relative">
                <button
                    ref={filterBtnRef}
                    onClick={() => {
                        if (showFilter) {
                            setShowFilter(false);
                        } else {
                            setShowFilter(true);
                            setShowSort(false);
                        }
                    }}
                    className={`hover:scale-110 transition-colors ${
                        showFilter
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                    aria-label="Toggle filters"
                >
                    <Funnel className="w-6 h-6" />
                </button>

                <button
                    ref={sortBtnRef}
                    onClick={() => {
                        if (showSort) {
                            setShowSort(false);
                        } else {
                            setShowSort(true);
                            setShowFilter(false);
                        }
                    }}
                    className={`hover:scale-110 transition-colors ${
                        showSort
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                    aria-label="Toggle sort"
                >
                    <ArrowUpDown className="w-6 h-6" />
                </button>

                {showFilter && (
                    <div
                        ref={filterRef}
                        className="absolute top-10 left-0 z-50 w-72 bg-[#1e1e1e] text-[#e5e5e5] dark:bg-[#121212] dark:text-[#e5e5e5] border border-[#2a2a2a] dark:border-[#2f2f2f] rounded-lg shadow-xl p-4 text-sm"
                    >
                        {(['type', 'year', 'platform'] as FilterKey[]).map((categoryKey) => {
                            const options = getUnique(categoryKey);
                            const showAll = showAllValues[categoryKey] || false;
                            const displayOptions = showAll ? options : options.slice(0, 6);
                            return (
                                <div key={categoryKey} className="mb-4">
                                    <p className="font-semibold capitalize mb-2">
                                        {categoryKey === 'type' ? 'Genres' : categoryKey === 'year' ? 'Years' : 'Streaming platforms'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {displayOptions.map((value) => (
                                            <button
                                                key={value}
                                                onClick={() => toggleFilter(`${categoryKey}s`, value)}
                                                className={`text-xs px-2 py-1 rounded font-medium transition ${
                                                    selectedFilters[`${categoryKey}s`].includes(value)
                                                        ? "bg-[#e1e1e1] text-[#121212] dark:bg-[#d4d4d4] dark:text-black"
                                                        : "bg-[#2e2e2e] hover:bg-[#444444] text-[#e5e5e5] dark:bg-[#2e2e2e] dark:hover:bg-[#3b3b3b]"
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
                                            className="flex items-center mt-2 text-xs text-gray-300 hover:text-white"
                                        >
                                            {showAll ? 'Show less' : 'Show all'}
                                            {showAll ? (
                                                <ChevronUp size={16} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={16} className="ml-1" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                        <button
                            onClick={() => {
                                setSelectedFilters(initialFilters);
                                const params = new URLSearchParams();
                                if (sortBy.key) {
                                    params.set("sortKey", sortBy.key);
                                    params.set("sortOrder", sortBy.order);
                                }
                                router.push(`?${params.toString()}`);
                            }}
                            className="w-full mt-2 text-xs font-semibold text-gray-300 hover:text-white"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {showSort && (
                    <div
                        ref={sortRef}
                        className="absolute top-10 left-0 z-50 w-72 bg-[#1e1e1e] text-[#e5e5e5] dark:bg-[#121212] dark:text-[#e5e5e5] border border-[#2a2a2a] dark:border-[#2f2f2f] rounded-lg shadow-xl p-4 text-sm"
                    >
                        {(['title', 'year'] as const).map((key) => (
                            <div key={key} className="flex justify-between items-center mb-3">
                                <span className="font-semibold capitalize mb-2">
                                    {key === 'title' ? 'Title' : 'Year'}
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            sortBy.key === key && sortBy.order === "asc"
                                                ? "bg-[#e1e1e1] text-[#121212] dark:bg-[#d4d4d4] dark:text-black"
                                                : "bg-[#2e2e2e] text-[#e5e5e5] hover:bg-[#444444] dark:hover:bg-[#3b3b3b]"
                                        }`}
                                        onClick={() => {
                                            const newSort: SortOption = { key, order: "asc" };
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
                                        {key === "year" ? 'Oldest First' : "A→Z"}
                                    </button>
                                    <button
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            sortBy.key === key && sortBy.order === "desc"
                                                ? "bg-[#e1e1e1] text-[#121212] dark:bg-[#d4d4d4] dark:text-black"
                                                : "bg-[#2e2e2e] text-[#e5e5e5] hover:bg-[#444444] dark:hover:bg-[#3b3b3b]"
                                        }`}
                                        onClick={() => {
                                            const newSort: SortOption = { key, order: "desc" };
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
                                        {key === "year" ? 'Latest First' : "Z→A"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : filteredMovies.length === 0 ? (
                <p className="text-center text-gray-400">
                    {allMovies.length === 0 ? "You haven't watched anything yet." : "No movies match your filters."}
                </p>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {filteredMovies.map((movie) => (
                        <div key={movie.title} className="w-40 text-center cursor-pointer">
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-60 object-cover shadow-md"
                            />
                            <p className="mt-2">{movie.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}