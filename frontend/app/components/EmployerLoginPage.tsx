import Image from "next/image";
import EmployerLoginForm from "./EmployerLoginForm";

export default function EmployerLoginPage() {
  return (
    <main className="relative min-h-screen bg-white p-4 transition-colors duration-300 dark:bg-[#11121c] md:p-7">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] overflow-hidden rounded-[18px] bg-[#f8fafc] transition-colors duration-300 dark:bg-[#20212b] md:min-h-[calc(100vh-3.5rem)]">
        <div className="flex w-full flex-col bg-white px-8 py-10 transition-colors duration-300 dark:bg-[#171824] sm:px-12 lg:w-[50%] lg:rounded-r-[64px] lg:px-10 xl:px-12">
          <EmployerLoginForm />
        </div>

        <div className="hidden flex-1 items-center justify-center bg-[#20212b] px-10 py-12 text-white lg:flex">
          <div className="w-full max-w-[600px]">
            <div className="flex justify-center">
              <Image
                src="/companysigninillustartion.png"
                alt="Company sign in illustration"
                width={560}
                height={560}
                priority
                className="h-auto w-full max-w-[560px] object-contain"
              />
            </div>
            <h1 className="mt-8 max-w-[410px] text-3xl font-extrabold leading-tight tracking-normal xl:text-4xl">
              Build The Team Your Company Deserves
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
