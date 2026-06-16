import React, { useState, useRef, useEffect } from "react";
import FilterObj from "../types/FilterObj";

interface HeaderProps {
  toParent: (filters: FilterObj) => void;
  filtersFromParent: FilterObj;
}

export default function FilterHeader({
  toParent,
  filtersFromParent,
}: HeaderProps) {
  const [filters, setFilters] = useState<FilterObj>(filtersFromParent);

  async function handleFilterChange(type: string, value: any) {
    if (type === "price_range") {
      setFilters((prev) => ({
        ...prev,
        price_range: value,
      }));
    } else if (type === "game_category") {
      setFilters((prev) => ({
        ...prev,
        game_category: value,
      }));
    } else if (type === "format") {
      setFilters((prev) => ({
        ...prev,
        format: value,
      }));
    } else if (type === "console") {
      setFilters((prev) => ({
        ...prev,
        console: value,
      }));
    } else if (type === "availability") {
      setFilters((prev) => ({
        ...prev,
        availability: value,
      }));
    } else if (type === "demo") {
      setFilters((prev) => ({
        ...prev,
        demo: !prev.demo,
      }));
    } else if (type === "sales") {
      setFilters((prev) => ({
        ...prev,
        sales: !prev.sales,
      }));
    } else if (type === "coming_soon") {
      setFilters((prev) => ({
        ...prev,
        coming_soon: !prev.coming_soon,
      }));
    } else if (type === "pre_order") {
      setFilters((prev) => ({
        ...prev,
        pre_order: !prev.pre_order,
      }));
    } else {
      if (!value) {
        setFilters((prev) => ({
          ...prev,
          sort_by: "",
          sort_dir: "",
        }));

        return;
      }
      setFilters((prev) => ({
        ...prev,
        sort_by: type,
        sort_dir: value,
      }));
    }
  }

  useEffect(() => {
    toParent(filters);
  }, [filters]);

  return (
    <>
      <div className="m-auto container">
        <div className="grid grid-cols-1 gap-4 p-0">
          <div className="collapse bg-base-100 border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">Sort By</div>
            <div className="collapse-content text-sm flex flex-wrap gap-4">
              {/* Title... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-24 border p-4">
                <legend className="fieldset-legend">
                  Title
                  {filters?.sort_by == "title" && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("title", null)}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "title" &&
                      filters?.sort_dir === "asc"
                    }
                    onChange={() => {
                      handleFilterChange("title", "asc");
                    }}
                  />
                  A-Z
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "title" &&
                      filters?.sort_dir === "desc"
                    }
                    onChange={() => {
                      handleFilterChange("title", "desc");
                    }}
                  />
                  Z-A
                </label>
              </fieldset>
              {/* Price... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-24 border p-4">
                <legend className="fieldset-legend">
                  Price
                  {filters?.sort_by == "price" && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("title", null)}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "price" &&
                      filters?.sort_dir === "asc"
                    }
                    onChange={() => {
                      handleFilterChange("price", "asc");
                    }}
                  />
                  Low To High
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "price" &&
                      filters?.sort_dir === "desc"
                    }
                    onChange={() => {
                      handleFilterChange("price", "desc");
                    }}
                  />
                  High To Low
                </label>
              </fieldset>
              {/* Discount... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-24 border p-4">
                <legend className="fieldset-legend">
                  Discount
                  {filters?.sort_by == "discount" && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => {
                        handleFilterChange("title", null);
                        setFilters((prev) => ({
                          ...prev,
                          sales: false,
                        }));
                      }}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "discount" &&
                      filters?.sort_dir === "asc"
                    }
                    onChange={() => {
                      handleFilterChange("discount", "asc");
                      setFilters((prev) => ({
                        ...prev,
                        sales: true,
                      }));
                    }}
                  />
                  Low To High
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "discount" &&
                      filters?.sort_dir === "desc"
                    }
                    onChange={() => {
                      handleFilterChange("discount", "desc");
                      setFilters((prev) => ({
                        ...prev,
                        sales: true,
                      }));
                    }}
                  />
                  High To Low
                </label>
              </fieldset>
              {/* Release Date... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-24 border p-4">
                <legend className="fieldset-legend">
                  Release Date
                  {filters?.sort_by == "release_date" && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("title", null)}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "release_date" &&
                      filters?.sort_dir === "asc"
                    }
                    onChange={() => {
                      handleFilterChange("release_date", "asc");
                    }}
                  />
                  Ascending
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      filters?.sort_by === "release_date" &&
                      filters?.sort_dir === "desc"
                    }
                    onChange={() => {
                      handleFilterChange("release_date", "desc");
                    }}
                  />
                  Descending
                </label>
              </fieldset>
            </div>
          </div>

          <div className="collapse bg-base-100 border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">Filters</div>
            <div className="collapse-content text-sm flex flex-wrap gap-4">
              {/* Price Range... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">
                  Price Range
                  {filters?.price_range > 0 && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("price_range", 0)}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.price_range === 1}
                    onChange={() => {
                      handleFilterChange("price_range", 1);
                    }}
                  />
                  $0 - $9.99
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.price_range === 2}
                    onChange={() => {
                      handleFilterChange("price_range", 2);
                    }}
                  />
                  $10 - $19.99
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.price_range === 3}
                    onChange={() => {
                      handleFilterChange("price_range", 3);
                    }}
                  />
                  $20 - $39.99
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.price_range === 4}
                    onChange={() => {
                      handleFilterChange("price_range", 4);
                    }}
                  />
                  $40+
                </label>
              </fieldset>
              {/* Game Category... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">
                  Game Category
                  {filters?.game_category && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("game_category", "")}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.game_category == "featured"}
                    onChange={() => {
                      handleFilterChange("game_category", "featured");
                    }}
                  />
                  Featured
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.game_category.includes("games")}
                    onChange={() => {
                      handleFilterChange("game_category", "games");
                    }}
                  />
                  Full Games
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.game_category == "dlc"}
                    onChange={() => {
                      handleFilterChange("game_category", "dlc");
                    }}
                  />
                  DLC
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.game_category == "both"}
                    onChange={() => {
                      handleFilterChange("game_category", "both");
                    }}
                  />
                  Game + DLC Bundles
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.game_category == "upgrade"}
                    onChange={() => {
                      handleFilterChange("game_category", "upgrade");
                    }}
                  />
                  Upgrade Packs
                </label>
              </fieldset>
              {/* Format... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">
                  Format
                  {filters?.format && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("format", "")}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.format == "physical"}
                    onChange={() => {
                      handleFilterChange("format", "physical");
                    }}
                  />
                  Physical
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.format == "digital"}
                    onChange={() => {
                      handleFilterChange("format", "digital");
                    }}
                  />
                  Digital
                </label>
              </fieldset>
              {/* Console... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">
                  Console
                  {filters?.console && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("console", "")}
                    >
                      ✕
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.console == "switch1"}
                    onChange={() => {
                      handleFilterChange("console", "switch1");
                    }}
                  />
                  Switch
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.console == "switch2"}
                    onChange={() => {
                      handleFilterChange("console", "switch2");
                    }}
                  />
                  Switch 2
                </label>
              </fieldset>
              {/* Availability... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">
                  Availability
                  {filters?.availability > 0 && (
                    <span
                      className="cursor-pointer text-error text-xs"
                      onClick={() => handleFilterChange("availability", 0)}
                    >
                      X
                    </span>
                  )}
                </legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.availability == 1}
                    onChange={() => {
                      handleFilterChange("availability", 1);
                    }}
                  />
                  Available Now
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.availability == 2}
                    onChange={() => {
                      handleFilterChange("availability", 2);
                    }}
                  />
                  Coming Soon
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.availability == 3}
                    onChange={() => {
                      handleFilterChange("availability", 3);
                    }}
                  />
                  New Releases
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.availability == 4}
                    onChange={() => {
                      handleFilterChange("availability", 4);
                    }}
                  />
                  Pre-Order
                </label>
              </fieldset>
              {/* Booleans... */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-36 border p-4">
                <legend className="fieldset-legend">Other</legend>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.demo}
                    onChange={() => {
                      handleFilterChange("demo", 0);
                    }}
                  />
                  Has Demo
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.sales}
                    onChange={() => {
                      handleFilterChange("sales", 0);
                    }}
                  />
                  Has Sale
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.pre_order}
                    onChange={() => {
                      handleFilterChange("pre_order", 0);
                    }}
                  />
                  Has Pre-Order
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={filters?.coming_soon}
                    onChange={() => {
                      handleFilterChange("coming_soon", 0);
                    }}
                  />
                  Coming Soon
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
