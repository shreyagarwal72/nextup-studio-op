const facts = [
  { term: "Based in", detail: "Agra, Uttar Pradesh, India" },
  { term: "Founder", detail: "Vanshu Agarwal" },
  { term: "Studying", detail: "Class 12, PCM Science" },
  { term: "Work", detail: "Video, music and gaming content" },
];

const About = () => (
  <section id="about" className="section-y border-t border-border">
    <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h2 className="heading-lg">Meet Vanshu Agarwal</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {facts.map((f) => (
            <div key={f.term} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-sm text-muted-foreground">{f.term}</dt>
              <dd className="text-right text-sm font-medium sm:text-base">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="space-y-6 text-base leading-[1.75] text-muted-foreground sm:text-lg lg:col-span-7">
        <p className="max-w-[62ch]">
          Vanshu is a creator who edits video, produces music and builds in Minecraft. Nextup Studio is where those
          skills meet: ideas become finished videos, tracks and worlds that people want to watch and replay.
        </p>
        <p className="max-w-[62ch]">
          He is a Class 12 PCM Science student, and the studio runs alongside school. The work spans post-production
          for gaming content, original music and Minecraft projects.
        </p>
        <p className="max-w-[62ch]">
          That includes rap tracks like <span className="text-foreground">Fire Within</span> and{" "}
          <span className="text-foreground">Raat Ka Banda</span>, immersive gaming content, and edits for other
          creators.
        </p>
      </div>
    </div>
  </section>
);

export default About;
