import { useEffect, useRef, useState } from "react";
import { Job } from "../types";

interface JobsHorizontalScrollProps {
  jobs: Job[];
  selectedCategoryId: string;
  onApplyClick: (job: Job) => void;
}

export default function JobsHorizontalScroll({
  jobs,
  onApplyClick,
}: JobsHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const visibleJobs = jobs.slice(0, 6);

  useEffect(() => {
    setScrollLeft(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [jobs]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setScrollLeft(max > 0 ? element.scrollLeft / max : 0);
  };

  return (
    <section className="bg-[#f2f2f2] px-6 py-20">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="text-4xl font-black tracking-[-0.02em] text-black">
          Jobs You May Me Interested in
        </h2>
        <p className="mx-auto mt-7 max-w-[560px] text-xl font-light leading-7 text-gray-500">
          We have a selection of jobs that match your profile and Experience level
        </p>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-20 grid grid-cols-1 gap-x-20 gap-y-9 md:grid-cols-2"
        >
          {visibleJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-[14px] bg-white px-10 py-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto max-w-[260px]">
                <h3 className="text-xl font-black text-[#20212b]">{job.title || "Product Designer"}</h3>
                <p className="mt-1 text-[11px] font-semibold text-gray-400">
                  {job.company || "Google"} - {job.applicants || 25} applications
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-[#eadbff] px-3 py-1 text-[9px] font-bold text-[#8b5cf6]">
                    Design
                  </span>
                  <span className="rounded-full bg-[#d8f7e8] px-3 py-1 text-[9px] font-bold text-[#27a96b]">
                    Full time
                  </span>
                  <span className="rounded-full bg-[#fff0be] px-3 py-1 text-[9px] font-bold text-[#d79f1e]">
                    remote
                  </span>
                </div>

                <p className="mt-9 text-[11px] font-semibold leading-4 text-gray-500">
                  NexaTech Solutions is a fast-growing tech company focused on building modern web and mobile applications for startups and small businesses
                </p>

                <div className="mt-9 flex items-center justify-between">
                  <p className="text-sm font-black text-black">$120/hr</p>
                  <button
                    type="button"
                    onClick={() => onApplyClick(job)}
                    className="text-[10px] font-bold text-gray-400 transition-colors hover:text-[#20212b]"
                  >
                    Posted 14 days ago
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-24 h-4 max-w-[960px] rounded-full bg-gray-300">
          <div
            className="h-4 w-10 rounded-full bg-white transition-transform"
            style={{ transform: `translateX(${scrollLeft * 820}px)` }}
          />
        </div>
      </div>
    </section>
  );
}
