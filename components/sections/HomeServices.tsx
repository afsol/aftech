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
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

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
              
              {/* 💡 The CSS below handles list-styling AND forces fonts to match perfectly */}
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

                  /* 🌟 CRITICAL FIX: The !important flag strips away any sneaky database fonts */
                  .service-content-${service.id}, 
                  .service-content-${service.id} *, 
                  .service-content-${service.id} p, 
                  .service-content-${service.id} span, 
                  .service-content-${service.id} li {
                    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
                    font-size: 0.875rem !important; /* Forces uniform text-sm size */
                    color: #4B5563 !important;      /* Forces uniform slate-600 color */
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



// "use client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import * as LucideIcons from "lucide-react";

// type Service = {
//   id: number;
//   icon_name: keyof typeof LucideIcons;
//   icon_color: string;
//   short_discription: string | null;
//   tag_line: string;
//   heading: string;
// };

// export default function HomeServices() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [hovered, setHovered] = useState<number | null>(null);

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/services-home`, {
//         headers: {
//           "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
//         },
//       })
//       .then((res) => {
//         setServices(res.data.data);
//       })
//       .catch((err) => {
//         console.error("API error:", err);
//       });
//   }, []);

//   return (
//   <div className="grid md:grid-cols-2 gap-8">
//     {services.map((service) => {
//       const Icon =
//         LucideIcons[service.icon_name as keyof typeof LucideIcons] ||
//         LucideIcons.CircleHelp;
//       const color = service.icon_color || "#2196F3";
      
//       const isHovered = hovered === service.id;

//       return (
//         <Card
//           key={service.id}
//           onMouseEnter={() => setHovered(service.id)}
//           onMouseLeave={() => setHovered(null)}
//           className="transition-all duration-300 border-l-4 flex flex-col justify-between bg-white"
//           style={{ borderLeftColor: color }}
//         >
//           <CardHeader>
//             <div className="flex items-center space-x-4">
//               <div
//                 className="p-3 rounded-lg transition-colors flex-shrink-0"
//                 style={{
//                   backgroundColor: isHovered ? color : `${color}20`,
//                 }}
//               >
//                 <Icon
//                   className="h-8 w-8 transition-colors"
//                   style={{
//                     color: isHovered ? "#ffffff" : color,
//                   }}
//                 />
//               </div>
//               <div>
//                 {/* 💡 Explicitly declare font-sans to guarantee matching typography elements */}
//                 <CardTitle className="text-xl font-sans font-semibold text-slate-900">
//                   {service.heading}
//                 </CardTitle>
//                 <CardDescription className="font-sans text-xs text-slate-400 mt-0.5">
//                   {service.tag_line}
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>
          
//           <CardContent className="flex-1">
//             {/* 💡 Cleaned typography engine: handles child elements safely via tailwind configurations */}
//             <div
//               className="text-sm font-sans leading-relaxed text-slate-600 
//                 [&_p]:mb-2 
//                 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1.5
//                 [&_li]:text-slate-600 [&_li]:font-sans"
//               style={{
//                 // Explicitly tells custom list item bullets to adopt your theme database color icon natively
//                 ['--marker-color' as any]: color 
//               }}
//               dangerouslySetInnerHTML={{ __html: service.short_discription || "" }}
//             />
//           </CardContent>

//           {/* Hidden utility style block ensuring lists use the custom marker color natively without Times New Roman bugs */}
//           <style jsx global>{`
//             li::marker {
//               color: var(--marker-color, #4B5563);
//               font-size: 1.15em;
//             }
//           `}</style>
//         </Card>
//       );
//     })}
//   </div>
// );
// }
