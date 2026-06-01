import SignUpForm from "../components/SignUpForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen items-stretch bg-white transition-colors duration-300 dark:bg-[#11121c]">
      <div className="flex min-h-screen w-full">
        <div className="hidden min-h-screen items-center justify-center p-12 lg:flex lg:w-[57%]">
          <div className="w-full max-w-[520px]">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src="/logo.jpeg"
                alt="Jobnest Logo"
                width={140}
                height={140}
                className="rounded-2xl"
              />
            </div>

            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src="/Signuppageilllustration.jpeg"
                alt="Sign up illustration"
                width={640}
                height={440}
                className="rounded-[26px] shadow-[0_20px_60px_rgba(45,38,57,0.12)] object-contain"
              />
            </div>

            <div className="space-y-3 text-left">
              <p className="text-[15px] leading-7 text-neutral-700 dark:text-gray-300">
                Become part of a growing community of students, graduates, and
                professionals who trust JobNest to connect them with exciting
                job opportunities and career growth.
              </p>
              <p className="text-[15px] font-semibold leading-7 text-neutral-800 dark:text-white">
                Find roles, build your profile, and make your next move with
                confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center bg-white transition-colors duration-300 dark:bg-[#11121c] lg:w-[43%]">
          <div className="mx-auto w-full max-w-lg px-8 py-12">
            <div className="rounded-[20px] border border-gray-100 bg-white px-6 py-6 shadow-md transition-colors duration-300 dark:border-white/10 dark:bg-[#171824]">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
