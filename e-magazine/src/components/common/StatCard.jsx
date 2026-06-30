import { Card, CardContent } from "@/components/ui/card";

function StatCard({ title, value, icon, color }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <CardContent className="p-6 flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Updated today
          </p>

        </div>

        <div
          className={`h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </CardContent>

    </Card>
  );
}

export default StatCard;