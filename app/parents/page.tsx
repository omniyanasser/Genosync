"use client";

import { useState } from "react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ParentsDataEntry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dnaFile, setDnaFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dnaFile) {
      toast.error("خطأ", {
        description: "من فضلك اختار ملف الحمض النووي الأول.",
        className: "border-red-500 bg-red-50 text-red-900"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const parentNameInput = document.getElementById("parentName") as HTMLInputElement;
        const expectedAgeInput = document.getElementById("expectedAge") as HTMLInputElement;
        const lostLocationInput = document.getElementById("lostLocation") as HTMLInputElement;
        
        const parentData = {
          name: parentNameInput.value,
          expected_age: parseInt(expectedAgeInput.value, 10) || 0,
          lost_location: lostLocationInput.value,
          dna_profile: jsonData.dna_profile || jsonData,
          createdAt: serverTimestamp()
        };

        localStorage.removeItem("uploadedParent"); // Clean up old parent data

        // Save data to Firebase
        await addDoc(collection(db, "parents"), parentData);
        
        setIsSubmitting(false);
        toast.success("تم بنجاح!", {
          description: "تم رفع بيانات الأب بنجاح! تقدر دلوقتي تروح تراجع لوحة التحكم.",
          className: "border-emerald-500 bg-emerald-50 text-emerald-900"
        });
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error saving to Firebase:", error);
        toast.error("حدث خطأ!", {
          description: "حصل خطأ! ياريت تتأكد إن الملف بصيغة JSON صحيحة وتتأكد من الاتصال بالإنترنت.",
          className: "border-red-500 bg-red-50 text-red-900"
        });
      }
    };
    reader.readAsText(dnaFile);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900 px-0">
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-900">بوابة الأهالي</h1>
          <p className="text-slate-600">سجل بياناتك وارفع ملف الحمض النووي الخاصة بك  </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>بيانات الأب أو الأم</CardTitle>
              <CardDescription>ادخل تفاصيل 
                 عن طفلك المفقود .</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">الاسم بالكامل</Label>
                  <Input id="parentName" placeholder="مثال: أحمد محمد" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedAge">عمر الطفل المتوقع</Label>
                  <Input id="expectedAge" type="number" placeholder="مثال: 5" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="lostLocation">المكان اللي الطفل ضاع فيه</Label>
                  <Input id="lostLocation" placeholder="مثال: القاهرة - محطة رمسيس" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mt-6 border-slate-200">
            <CardHeader>
              <CardTitle>رفع ملف الحمض النووي</CardTitle>
              <CardDescription>ارفع ملف تحليل الحمض النووي الخاص ب الأب أو الأم  (بصيغة .json).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="dna-upload" className="font-semibold text-emerald-800">
                  اختار ملف الحمض النووي
                </Label>
                <Input 
                  id="dna-upload" 
                  type="file" 
                  accept=".json"
                  onChange={(e) => setDnaFile(e.target.files?.[0] || null)}
                  required 
                  className="cursor-pointer file:cursor-pointer file:bg-emerald-50 file:text-emerald-700 file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-emerald-100"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "جاري الرفع..." : "حفظ بيانات الأب"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}