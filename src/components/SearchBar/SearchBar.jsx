'use client';

import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
        }
    };

    return (
        <form className="hero_content_search_bar_wrapper" onSubmit={handleSearch}>
            <FaMagnifyingGlass className="hero_content_search_icon" />
            <input
                type="search"
                className="hero_content_search_input"
                placeholder="Caută artist, album sau gen..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}

export default SearchBar;