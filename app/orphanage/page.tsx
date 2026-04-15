"use client";

import { useState } from "react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function OrphanageDataEntry() {
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
    
    // Read uploaded file content
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const childNameInput = document.getElementById("childName") as HTMLInputElement;
        const ageInput = document.getElementById("age") as HTMLInputElement;
        const locationInput = document.getElementById("location") as HTMLInputElement;
        
        // Prepare child data
        const childData = {
          name: childNameInput.value,
          age_estimate: parseInt(ageInput.value, 10) || 0,
          found_location: locationInput.value,
          dna_profile: jsonData.dna_profile || jsonData, // Support direct profile array or nested object
          createdAt: serverTimestamp()
        };

        localStorage.removeItem("uploadedChild"); // Clean up old child data
        
        // Save data to Firebase (instead of localStorage)
        await addDoc(collection(db, "children"), childData);
        
        setIsSubmitting(false);
        toast.success("تم بنجاح!", {
          description: "تم رفع بيانات الطفل وحفظها بنجاح! تقدر دلوقتي تروح لوحة التحكم.",
          className: "border-green-500 bg-green-50 text-green-900"
        });
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error saving to Firebase: ", error);
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
          <h1 className="text-3xl font-bold text-blue-900">بوابة الملاجئ</h1>
          <p className="text-slate-600">سجل الأطفال المجهولين وارفع ملفات الحمض النووي الخاصة بهم</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>البيانات الأساسية للطفل</CardTitle>
              <CardDescription>من فضلك ادخّل تفاصيل دقيقة لتحسين نتايج التطابق.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">اسم أو كود مؤقت</Label>
                  <Input id="childName" placeholder="مثال: طفل #105" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">العمر التقريبي (بالسنين)</Label>
                  <Input id="age" type="number" placeholder="مثال: 5" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">مكان العثور عليه</Label>
                  <Input id="location" placeholder="مثال: القاهرة - مدينة نصر" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mt-6 border-slate-200">
            <CardHeader>
              <CardTitle>رفع ملف الحمض النووي</CardTitle>
              <CardDescription>ارفع ملف تحليل الحمض النووي (بصيغة .json).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="dna-upload" className="font-semibold text-blue-800">
                  اختار ملف الحمض النووي
                </Label>
                <Input 
                  id="dna-upload" 
                  type="file" 
                  accept=".json"
                  onChange={(e) => setDnaFile(e.target.files?.[0] || null)}
                  required 
                  className="cursor-pointer file:cursor-pointer file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-blue-100"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "جاري الرفع..." : "حفظ بيانات الطفل"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}