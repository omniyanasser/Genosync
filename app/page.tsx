export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="text-center space-y-6 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
          GenoSync: نظام مطابقة الحمض النووي
        </h1>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
          منصة متطورة لتحليل ومطابقة بيانات الـ DNA لدعم الملاجئ والمؤسسات.
        </p>
        <div className="animate-pulse text-sm font-medium text-blue-400">
          جاري تجهيز بيئة العمل...
        </div>
      </div>
    </main>
  );
}