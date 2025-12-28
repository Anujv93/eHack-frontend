'use client';

import './courses-filter.css';

interface FilterOption {
    id: number | string;
    name: string;
    slug: string;
    logo?: string;
    colorCode?: string;
}

interface CoursesFilterProps {
    partners: FilterOption[];
    categories: FilterOption[];
    selectedPartner: string | null;
    selectedCategory: string | null;
    onPartnerChange: (slug: string | null) => void;
    onCategoryChange: (slug: string | null) => void;
}

export default function CoursesFilter({
    partners,
    categories,
    selectedPartner,
    selectedCategory,
    onPartnerChange,
    onCategoryChange
}: CoursesFilterProps) {
    return (
        <div className="courses-filter">
            {/* Partners Filter */}
            <div className="filter-group">
                <label className="filter-label">Partner</label>
                <div className="filter-pills">
                    <button
                        className={`filter-pill ${selectedPartner === null ? 'active' : ''}`}
                        onClick={() => onPartnerChange(null)}
                    >
                        All Partners
                    </button>
                    {partners.map((partner) => (
                        <button
                            key={partner.id}
                            className={`filter-pill ${selectedPartner === partner.slug ? 'active' : ''}`}
                            onClick={() => onPartnerChange(partner.slug)}
                        >
                            {partner.logo && (
                                <img src={partner.logo} alt="" className="pill-logo" />
                            )}
                            {partner.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories Filter */}
            <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="filter-pills">
                    <button
                        className={`filter-pill ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => onCategoryChange(null)}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`filter-pill ${selectedCategory === category.slug ? 'active' : ''}`}
                            onClick={() => onCategoryChange(category.slug)}
                            style={{
                                '--category-color': category.colorCode || '#FF6B00'
                            } as React.CSSProperties}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
