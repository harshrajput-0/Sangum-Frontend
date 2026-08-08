export default function AboutSection() {
  return (
    <section className="relative border-t-0 py-16 ">
      <div className="relative z-2 mx-auto max-w-170 px-6 text-center">
        <p className="mb-5 text-[17px] leading-[1.75] text-dtext-secondary">
          Most platforms make you pick one thing — a feed, a forum, a course site, a
          professional network.{' '}
          <strong className="font-semibold text-dtext">
            Sangum brings the useful parts of all of them into one place.
          </strong>
        </p>
        <p className="text-[17px] leading-[1.75] text-dtext-secondary">
          It&apos;s built for people who want to actually participate, not just scroll —
          contribute what you know, build alongside others, learn from people further along,
          and grow a community around what you actually care about. Not a replacement for the
          tools you use — just the best parts of community, networking, and learning, brought
          together.
        </p>
      </div>
    </section>
  );
}