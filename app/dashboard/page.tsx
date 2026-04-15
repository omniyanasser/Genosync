"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { calculateDNAMatch, MatchResult } from "@/utils/dnaMatching";

type MatchedCase = {
  parent: any;
  child: any;
  result: MatchResult;
};

export default function AdminDashboard() {
  const [matches, setMatches] = useState<MatchedCase[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchedCase | null>(null);
  const [stats, setStats] = useState({ children: 0, parents: 0 });
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const runScanning = useCallback(async () => {
    setIsScanning(true);
    setExecutionTime(null);
    const startTime = performance.now();

    try {
      // 1. Fetch all children data from Firebase
      const childrenSnapshot = await getDocs(collection(db, "children"));
      const childrenData = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // 2. Fetch all parents data from Firebase
      const parentsSnapshot = await getDocs(collection(db, "parents"));
      const parentsData = parentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setStats({ children: childrenData.length, parents: parentsData.length });

      // 3. Matching algorithm between every parent and child
      const foundMatches: MatchedCase[] = [];

      parentsData.forEach(parent => {
        childrenData.forEach(child => {
          // Ensure DNA file exists
          if (parent.dna_profile && child.dna_profile) {
            const matchResult = calculateDNAMatch(child.dna_profile, parent.dna_profile);
            if (matchResult.isMatch) {
              foundMatches.push({ parent, child, result: matchResult });
            }
          }
        });
      });

      setMatches(foundMatches);
      toast.success("تم الانتهاء من فحص قواعد البيانات بنجاح!");

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("حدث خطأ أثناء جلب البيانات من السحابة.");
    }

    const endTime = performance.now();
    setExecutionTime(Number((endTime - startTime).toFixed(2)));
    setIsScanning(false);
  }, []);

  useEffect(() => {
    runScanning();
  }, [runScanning]);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-10" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back to Home button */}
        <div className="flex justify-start">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900">
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center text-center space-y-2">
          <div className="text-start">
            <h1 className="text-3xl font-bold text-slate-900">لوحة تحكم الإدارة (Admin Dashboard)</h1>
            <p className="text-slate-600">نظام الاكتشاف التلقائي لحالات التطابق المربوط بالسحابة</p>
          </div>
          <Button onClick={runScanning} disabled={isScanning} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            تحديث وبحث
          </Button>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-100 shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-blue-900">إجمالي الأطفال بالملجأ</h3>
              <p className="text-3xl font-extrabold text-blue-600">
                {isScanning ? "..." : stats.children}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-emerald-900">إجمالي الأهالي</h3>
              <p className="text-3xl font-extrabold text-emerald-600">
                {isScanning ? "..." : stats.parents}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-100 shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-purple-900">التطابقات المكتشفة</h3>
              <p className="text-3xl font-extrabold text-purple-600">
                {isScanning ? "..." : matches.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {executionTime !== null && (
          <div className="text-center p-2 bg-slate-100 rounded-md border text-sm text-slate-700">
            ⏱️ تم فحص جميع السجلات السحابية في: <span className="font-bold text-blue-600">{executionTime} مللي ثانية</span>
          </div>
        )}

        {/* Matches table */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>التطابقات الإيجابية المؤكدة</CardTitle>
            <CardDescription>هذه الحالات حققت نسبة تطابق جيني عالية وتتطلب المراجعة لإصدار التقرير النهائي.</CardDescription>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="text-center py-10 text-slate-500 animate-pulse">
                جاري مسح قواعد البيانات السحابية ومطابقة الحمض النووي...
              </div>
            ) : matches.length === 0 ? (
              <div className="text-center py-10 text-slate-500 font-medium">
                لم يتم العثور على أي حالات تطابق حتى الآن.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="font-bold text-start">اسم الأب</TableHead>
                      <TableHead className="font-bold text-start">اسم الطفل (الملجأ)</TableHead>
                      <TableHead className="font-bold text-center">نسبة التطابق</TableHead>
                      <TableHead className="font-bold text-center">الإجراء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match, index) => (
                      <TableRow key={index} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-800">{match.parent.name}</TableCell>
                        <TableCell className="text-slate-600">{match.child.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1 text-sm">
                            {match.result.matchPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            onClick={() => setSelectedMatch(match)}
                          >
                            عرض التفاصيل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed report */}
        {selectedMatch && (
          <Card className="shadow-sm border-blue-200 mt-8" id="details-section">
            <CardHeader className="bg-slate-900 text-white rounded-t-xl flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-xl">تقرير المطابقة المفصل</CardTitle>
                <CardDescription className="text-slate-300">
                  بين الأب ({selectedMatch.parent.name}) والطفل ({selectedMatch.child.name})
                </CardDescription>
              </div>
              <Button variant="ghost" className="text-white hover:bg-slate-800" onClick={() => setSelectedMatch(null)}>
                إغلاق
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="text-center font-bold">الموقع الجيني (Locus)</TableHead>
                      <TableHead className="text-center font-bold">تكرارات الطفل</TableHead>
                      <TableHead className="text-center font-bold">تكرارات الأب</TableHead>
                      <TableHead className="text-center font-bold">حالة التطابق</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedMatch.result.details.map((detail, idx) => (
                      <TableRow key={idx} className="hover:bg-slate-50">
                        <TableCell className="text-center font-semibold text-slate-700" dir="ltr">{detail.locus}</TableCell>
                        <TableCell className="text-center" dir="ltr">{detail.childRepeats.join(" , ")}</TableCell>
                        <TableCell className="text-center" dir="ltr">{detail.parentRepeats.join(" , ")}</TableCell>
                        <TableCell className="text-center">
                          {detail.isMatched ? (
                            <Badge className="bg-green-500">نعم ✅</Badge>
                          ) : (
                            <Badge variant="destructive">لا ❌</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}