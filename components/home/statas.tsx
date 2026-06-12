import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">
              {inView && <CountUp end={500} duration={2} />}+
            </div>
            <p className="text-gray-600">Projects Completed</p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">
              {inView && <CountUp end={5} duration={2} />}+
            </div>
            <p className="text-gray-600">Years Experience</p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">
              {inView && <CountUp end={24} duration={2} />}/7
            </div>
            <p className="text-gray-600">Support Available</p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">
              {inView && <CountUp end={100} duration={2} />}%
            </div>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
