import SignUpForm from '../components/SignUpForm'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex items-stretch bg-white">
      <div className="w-full h-screen flex">
        <div className="hidden lg:flex lg:w-[57%] h-full p-12 items-center justify-center">
          <div className="w-full max-w-[520px]">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image src="/logo.jpeg" alt="Jobnest Logo" width={140} height={140} className="rounded-2xl" />
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
              <p className="text-[15px] leading-7 text-neutral-700">
                Become part of a growing community of students, graduates, and professionals who trust JobNest to connect them with exciting job opportunities and career growth.
              </p>
              <p className="text-[15px] leading-7 text-neutral-800 font-semibold">
                Find roles, build your profile, and make your next move with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[43%] bg-white flex items-center">
          <div className="w-full max-w-lg mx-auto px-8 py-12">
            <div className="bg-white rounded-[20px] px-6 py-6 shadow-md border border-gray-100">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
