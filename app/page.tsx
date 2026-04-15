import Hero from "../components/ui/Home/Hero";
import Features from "../components/ui/Home/Features";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100">
      {/* Background decoration (optional gradient) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <Hero />
        <Features />
      </div>
      
      {/* Simple Footer */}
      <footer className="mt-auto py-8 text-center text-slate-500 text-sm relative z-10 border-t border-slate-200">
        <p>© 2026 GenoSync - نظام مطابقة حمض نووي للملاجئ. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}