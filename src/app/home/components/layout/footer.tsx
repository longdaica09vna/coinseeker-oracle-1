export default function Footer() {
  return (
    <div className="flex md:flex-row flex-col items-center md:items-start gap-2 justify-between border-t border-[#72787E26] px-9 py-8">
      <div className="text-xs text-dark4">
        <span className="">Copyright</span> © 2024 Coinseeker.co. All rights reserved.
      </div>
      <div className="flex gap-10">
        <a href="https://coinseeker.co/privacy-policy" className="text-xs text-dark4">
          Privacy Policy
        </a>
        <a href="https://coinseeker.co/terms-of-service" className="text-xs text-dark4">
          Terms of Service
        </a>
      </div>
    </div>
  )
}
