import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 2500);
  };

  return (
    <section id="newsletter-section" className="bg-[#f2f2f2] px-6 pb-56 pt-24">
      <div className="mx-auto max-w-[840px] overflow-hidden rounded-[14px] bg-[#20212b] px-12 py-12 text-white shadow-sm">
        <div className="relative min-h-[220px]">
          <div className="absolute left-0 top-0 h-px w-full rotate-[20deg] bg-white/20" />
          <div className="max-w-[370px]">
            <h3 className="text-2xl font-black leading-tight">
              Get weekly job alerts, career advice, and exclusive opportunities delivered straight to your inbox.
            </h3>
            <form onSubmit={handleSubmit} className="mt-8 flex max-w-[270px] overflow-hidden rounded-full bg-gray-300">
              <button
                type="submit"
                className="bg-white px-4 py-2 text-[11px] font-black text-[#20212b] transition-colors hover:bg-gray-100"
              >
                Subscribe
              </button>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={subscribed ? "Subscribed" : "Enter email address"}
                className="min-w-0 flex-1 bg-transparent px-3 text-[10px] font-semibold text-[#20212b] outline-none placeholder:text-gray-500"
              />
            </form>
          </div>

          <div className="absolute bottom-2 right-8 flex h-24 w-24 rotate-[-25deg] items-center justify-center rounded-full border-4 border-gray-300 text-[11px] font-black uppercase text-gray-300">
            <span className="rotate-[25deg]">Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}
