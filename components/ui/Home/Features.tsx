import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BrainCircuit, BellRing } from "lucide-react";

export default function Features() {
  // Array of features based on the project's core concepts
  const features = [
    {
      title: "قاعدة بيانات الحمض النووي",
      description: "الملاجئ بتسجل فيها الحمض النووي للأطفال ومعلوماتهم بشكل آمن جداً.",
      icon: <Database className="w-8 h-8 text-blue-500 mb-4" />,
    },
    {
      title: "مطابقة ذكية للحمض النووي",
      description: "بنستخدم الجوريزم يشبه تقنية STR نقارن حمض الأهالي مع الأطفال ونطلع نسبة التطابق الجيني.",
      icon: <BrainCircuit className="w-8 h-8 text-indigo-500 mb-4" />,
    },
    {
      title: "تنبيهات فورية",
      description: "بنبعت إشعارات سريعة للأهالي لما نلاقي تطابق محتمل مع تقارير مفصلة للحالة.",
      icon: <BellRing className="w-8 h-8 text-emerald-500 mb-4" />,
    }
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800">إزاي النظام بيشتغل</h2>
        <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full mt-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto flex justify-center">
                {feature.icon}
              </div>
              <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-600">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}