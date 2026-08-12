import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Membership() {
  const benefits = [
    "Unlimited access to premium stories",
    "Read without advertisements",
    "Support independent writers",
    "Exclusive member-only articles",
    "Early access to new features",
    "Bookmark and organize your favorite blogs",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
          Become an OpenPages Member
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
          Support writers, unlock premium content, and enjoy a better reading
          experience. Join a growing community of developers, creators, and
          lifelong learners.
        </p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">
          

          <Link
            to="/"
            className="border border-gray-400 px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Continue Reading
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Membership Benefits
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 border rounded-xl hover:shadow-md transition"
            >
              <FaCheckCircle className="text-green-600 text-xl" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      
      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold">
          Read. Learn. Share.
        </h2>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Join thousands of readers and writers who use OpenPages every day to
          discover ideas, improve skills, and share knowledge with the world.
        </p>

        
      </section>
    </main>
  );
}