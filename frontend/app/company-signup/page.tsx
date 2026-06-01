import Image from "next/image";
import CompanySignUpForm from "../components/CompanySignUpForm";

export default function CompanySignUpPage() {
  return (
    <div className="relative flex min-h-screen items-stretch bg-white">
      <div className="flex min-h-screen w-full">
        {/* Left illustration / dark panel */}
        <div className="hidden min-h-screen items-center justify-center gap-8 overflow-hidden bg-[#f8fafc] p-12 text-[#11121c] lg:flex lg:w-[57%]">
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/compsnyregisterillustartion.jpeg"
              alt="Company register illustration"
              width={420}
              height={315}
              className="rounded-[18px] object-contain shadow-lg scale-95"
            />
          </div>

          <div className="flex-1 pr-6 mt-6">
            <h3 className="text-3xl font-bold mb-3">
              Find Exceptional Talent Faster
            </h3>
            <p className="max-w-md text-sm text-gray-600">
              Connect with skilled professionals, post job opportunities, and
              find the perfect candidates for your company faster and easier.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex min-h-screen w-full items-center bg-white p-6 md:p-10 lg:relative lg:z-30 lg:-ml-8 lg:w-[40%] lg:rounded-bl-[48px] lg:rounded-tl-[48px] lg:shadow-xl">
          <div className="w-full lg:pl-6">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src="/logo-removebg-preview.png"
                alt="Jobnest Logo"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </div>

            <div className="mx-auto w-full max-w-lg rounded-[20px] bg-white px-6 py-8">
              <CompanySignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
