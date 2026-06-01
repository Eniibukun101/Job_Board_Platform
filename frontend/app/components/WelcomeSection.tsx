import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="relative hidden flex-col items-center justify-center bg-white px-12 md:flex md:w-[52%]">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Image
          src="/logo-removebg-preview.png"
          alt="Jobnest Logo"
          width={140}
          height={140}
          className="rounded-lg"
        />
      </div>

      {/* Welcome content */}
      <div className="text-center max-w-xl w-full flex flex-col items-center justify-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/HompageIllustration.jpeg"
            alt="Homepage illustration"
            width={720}
            height={720}
            className="rounded-2xl"
          />
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          Great to see you again! Log in to discover new opportunities, connect
          with employers, and keep growing your professional journey with
          JobNest.
        </p>
      </div>
    </div>
  );
}
