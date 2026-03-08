import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtext: React.ReactNode;
}

export default function AnalyticsCard({
  title,
  value,
  icon,
  subtext,
}: CardProps) {
  return (
    <Card className="flex gap-0">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-200">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-700">{icon}</div>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between gap-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {value}
          </h3>
        </div>
        <div className="dark:text-gray-300">{subtext}</div>
      </CardContent>
    </Card>
  );
}
