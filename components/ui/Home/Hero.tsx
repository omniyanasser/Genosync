import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Badge/Tag */}
      <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold tracking-wide">
        نظام مطابقة الحمض النووي لدور الرعاية
      </div>
      
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
        Geno<span className="text-blue-600">Sync</span>
      </h1>
      
     {/* Description */}
      <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        نظام متطور للمطابقة الجينية يهدف إلى لم شمل العائلات والأطفال في دور الرعاية عبر تحليلات دقيقة للحمض النووي.
      </p>
      
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          {/* Route to Orphanage Portal */}
          <Link href="/orphanage" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 rounded-xl shadow-md">
              بوابة دور الرعاية
            </Button>
          </Link>
          
          {/* Route to Parents Portal */}
          <Link href="/parents" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-14 px-8 rounded-xl shadow-md">
              بوابة الأهالي
            </Button>
          </Link>
        </div>

        {/* Route to Admin Dashboard */}
        <Link href="/dashboard" className="w-full max-w-xs mt-2">
          <Button  size="lg" className="w-full bg-gray-600 border-gray-300 hover:bg-gray-700 text-white  text-lg h-12 rounded-xl ">
            لوحة الإدارة
          </Button>
        </Link>
      </div>
    </section>
  );
}