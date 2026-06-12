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

export default function ServicesHero() {
  const [services, setServices] = useState<Service[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      })
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <section id="services" className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From security surveillance to renewable energy solutions, we provide
            comprehensive installation and maintenance services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon =
              LucideIcons[service.icon_name as keyof typeof LucideIcons] ||
              LucideIcons.CircleHelp;
            const color = service.icon_color || "#2196F3";
            const slug =
              service.heading?.toLowerCase().replace(/\s+/g, "-") || "";

            const isHovered = hovered === service.id;

            return (
              <Card
                key={service.id}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className="transition-all duration-300 border-l-4"
                style={{ borderLeftColor: color }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-3 rounded-lg transition-colors"
                      style={{
                        backgroundColor: isHovered
                          ? color
                          : `${color}20`, // lighter background
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
                      <CardTitle className="text-xl">{service.heading}</CardTitle>
                      <CardDescription>{service.tag_line}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Inline style to update ::marker */}
                  <style>
                    {`
                      .service-content-${service.id} ul {
                        list-style-type: disc;
                        margin-left: 1.25rem;
                      }

                      .service-content-${service.id} li::marker {
                        color: ${service.icon_color}; /* dynamic color */
                        font-size: 16pt;
                      }

                      .service-content-${service.id} li {
                        font-size: 12pt;
                        color: #4B5563;
                        margin-bottom: 0.5rem;
                      }
                    `}
                  </style>

                  <div
                    className={`text-sm leading-relaxed service-content-${service.id}`}
                    dangerouslySetInnerHTML={{ __html: service.short_discription || "" }}
                  />
                </CardContent>

                {/* <CardContent className="space-y-4">
                  <div
                    className="text-gray-600 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:ml-5 [&>p]:mb-2"
                    dangerouslySetInnerHTML={{ __html: service.short_discription || "" }}
                  />
                </CardContent> */}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
