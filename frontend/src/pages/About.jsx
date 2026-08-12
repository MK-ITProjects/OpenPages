import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
          Our Story
        </h1>

        <p className="mt-6 text-xl text-gray-600 leading-8">
          OpenPages was created with one simple goal:
          to make knowledge accessible, ideas shareable,
          and stories meaningful for everyone.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-gray-700 leading-8 text-lg">

        <p>
          Every great idea starts with a story. OpenPages is a modern blogging
          platform where developers, students, professionals, and creators can
          share their experiences, tutorials, and insights with the world.
        </p>

        <p>
          Whether you're writing about technology, artificial intelligence,
          travel, education, business, or personal experiences, OpenPages gives
          your ideas a place to grow and reach readers everywhere.
        </p>

        <p>
          Our mission is to encourage learning through open discussions,
          thoughtful articles, and a supportive community of writers and
          readers.
        </p>

      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-7">
              To inspire people through knowledge sharing and provide a platform
              where everyone can publish meaningful stories and discover new
              ideas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-4">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-7">
              To become one of the most trusted blogging communities where
              creators, learners, and innovators connect through quality
              content.
            </p>
          </div>

        </div>
      </section>

      
    </main>
  );
}