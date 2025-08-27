import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  return (
    <div className="min-h-svh flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md lg:max-w-lg border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="pb-8">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
