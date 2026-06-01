import { MapPin, Search, Star } from "lucide-react";

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  locationSearch: string;
  setLocationSearch: (val: string) => void;
  onSearchClick: () => void;
}

export default function Hero({
  searchTerm,
  setSearchTerm,
  locationSearch,
  setLocationSearch,
  onSearchClick,
}: HeroProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearchClick();
  };

  return (
    <section className="bg-[#20212b] px-6 pb-16 pt-4 text-white">
      <div className="mx-auto max-w-[1260px]">
        <div className="mx-auto flex h-14 max-w-[820px] items-center overflow-hidden rounded-2xl bg-white text-[#20212b] shadow-sm">
          <div className="flex h-full w-[26%] min-w-[140px] items-center gap-3 border-r border-gray-200 px-6">
            <MapPin className="h-4 w-4 text-[#20212b]" />
            <input
              value={locationSearch}
              onChange={(event) => setLocationSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Location"
              className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-gray-500"
            />
          </div>
          <div className="flex h-full flex-1 items-center gap-3 px-6">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h1 className="max-w-[460px] text-5xl font-black leading-[1.08] tracking-[-0.02em] md:text-6xl">
              Unlock your next career path
            </h1>
            <p className="mt-8 max-w-[520px] text-sm font-semibold leading-5 text-gray-300">
              Helping students, graduates, and professionals discover careers that match their ambitions.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-3">
                {["DA", "MO", "KI"].map((name, index) => (
                  <div
                    key={name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#20212b] bg-white text-xs font-black text-[#20212b]"
                    style={{ backgroundColor: ["#d9efff", "#ffd6c9", "#fff0bf"][index] }}
                  >
                    {name.slice(0, 1)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-[#ffd84d]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-[10px] font-bold text-gray-300">Good Reviews</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[400px] w-full max-w-[500px]">
            <div className="absolute right-2 top-12 h-[310px] w-[360px] rotate-[17deg] rounded-[22px] bg-[#292a34]" />
            <div className="absolute right-10 top-9 h-[320px] w-[400px] overflow-hidden rounded-[16px] bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop"
                alt="Workspace desk"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
