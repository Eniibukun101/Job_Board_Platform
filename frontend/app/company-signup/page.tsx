import Image from 'next/image'
import CompanySignUpForm from '../components/CompanySignUpForm'

export default function CompanySignUpPage() {
  return (
    <div className="relative min-h-screen flex items-stretch bg-white">
      <div className="w-full h-screen flex">
        {/* Left illustration / dark panel */}
        <div className="hidden lg:flex lg:w-[57%] h-full bg-[#1f2026] text-white p-12 items-center justify-center gap-8 overflow-hidden">
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
            <h3 className="text-3xl font-bold mb-3">Find Exceptional Talent Faster</h3>
            <p className="text-sm text-gray-200 max-w-md">
              Connect with skilled professionals, post job opportunities, and find the perfect candidates for your company faster and easier.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full lg:w-[40%] bg-white p-6 md:p-10 h-full flex items-center lg:relative lg:z-30 lg:rounded-tl-[48px] lg:rounded-bl-[48px] lg:-ml-8 lg:shadow-xl">
          <div className="w-full lg:pl-6">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image src="/logo.jpeg" alt="Jobnest Logo" width={80} height={80} className="rounded-xl" />
            </div>

            <div className="w-full max-w-lg mx-auto px-6 py-8 bg-white">
              <CompanySignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
