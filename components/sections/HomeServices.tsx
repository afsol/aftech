"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import * as LucideIcons from "lucide-react";

type Service = {
  id: number;
  icon_name: keyof typeof LucideIcons;
  icon_color: string;
  short_discription: string | null;
  tag_line: string;
  heading: string;
};

export default function HomeServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 👈 Added loading state
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/services-home`, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      })
      .then((res) => {
        setServices(res.data.data);
        setLoading(false); // 👈 Turn off loading when data arrives
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false); // 👈 Turn off loading even if it fails
      });
  }, []);

  // 💡 Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((n) => (
          <div
            key={n}
            className="h-64 rounded-xl border border-gray-200 bg-gray-50 animate-pulse p-6 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {services.map((service) => {
        const Icon =
          LucideIcons[service.icon_name as keyof typeof LucideIcons] ||
          LucideIcons.CircleHelp;
        const color = service.icon_color || "#2196F3";
        const isHovered = hovered === service.id;

        return (
          <Card
            key={service.id}
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
            className="transition-all duration-300 border-l-4 bg-white"
            style={{ borderLeftColor: color }}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div
                  className="p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isHovered ? color : `${color}20`,
                  }}
                >
                  <Icon
                    className="h-8 w-8 transition-colors"
                    style={{
                      color: isHovered ? "#ffffff" : color,
                    }}
                  />
                </div>
                <div>
                  <CardTitle className="text-xl font-sans">{service.heading}</CardTitle>
                  <CardDescription className="font-sans">{service.tag_line}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <style>
                {`
                  .service-content-${service.id} ul {
                    list-style-type: disc !important;
                    margin-left: 1.25rem !important;
                    padding-left: 0 !important;
                  }

                  .service-content-${service.id} li::marker {
                    color: ${color} !important;
                    font-size: 1.25rem !important;
                  }

                  .service-content-${service.id}, 
                  .service-content-${service.id} *, 
                  .service-content-${service.id} p, 
                  .service-content-${service.id} span, 
                  .service-content-${service.id} li {
                    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
                    font-size: 0.875rem !important;
                    color: #4B5563 !important;
                    line-height: 1.625 !important;
                  }

                  .service-content-${service.id} li {
                    margin-bottom: 0.5rem !important;
                  }
                `}
              </style>

              <div
                className={`leading-relaxed service-content-${service.id}`}
                dangerouslySetInnerHTML={{ __html: service.short_discription || "" }}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

