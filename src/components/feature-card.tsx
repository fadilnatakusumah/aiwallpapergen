import type { ReactNode } from "react";

import { Card, CardHeader, CardContent } from "./ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-2">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
