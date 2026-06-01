import Image from "next/image";

interface DoubleBannersProps {
  onNavigate?: (
    view:
      | "home"
      | "dashboard"
      | "employer"
      | "login"
      | "profile"
      | "job-details"
      | "notifications",
    mode?: "login" | "create",
  ) => void;
}

export default function DoubleBanners({ onNavigate }: DoubleBannersProps) {
  return (
    <section className="bg-[#f2f2f2] px-6 pb-16 pt-44">
      <div className="mx-auto grid max-w-[800px] gap-7 md:grid-cols-2">
        <article className="flex h-40 items-center justify-between overflow-hidden rounded-[10px] bg-[#20212b] px-8 text-white">
          <div>
            <h3 className="text-sm font-black">For Candidates</h3>
            <p className="mt-3 max-w-[150px] text-[11px] font-medium leading-4 text-gray-400">
              Build your professional profile, Find new job opportunities
            </p>
            <button
              type="button"
              onClick={() => document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-5 rounded-full border border-white px-5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#20212b]"
            >
              Apply for a job
            </button>
          </div>
          <Image
            src="/forcandidatesillustration.png"
            alt="Candidate illustration"
            width={140}
            height={120}
            className="mt-8 h-auto w-[130px] object-contain"
          />
        </article>

        <article className="flex h-40 items-center justify-between overflow-hidden rounded-[10px] bg-[#20212b] px-8 text-white">
          <div>
            <h3 className="text-sm font-black">For Employees</h3>
            <p className="mt-3 max-w-[150px] text-[11px] font-medium leading-4 text-gray-400">
              Find professional all around the world and access at ease
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.("employer")}
              className="mt-5 rounded-full border border-white px-5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#20212b]"
            >
              Post a job for free
            </button>
          </div>
          <Image
            src="/foremployeesillustartion.png"
            alt="Employees illustration"
            width={150}
            height={120}
            className="h-auto w-[145px] object-contain"
          />
        </article>
      </div>
    </section>
  );
}
