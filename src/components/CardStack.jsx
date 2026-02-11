"use client";

const cards = [
    {
        title: "EXPERT\nCONVERSATION",
        body:
            "Candid, high-signal dialogs with founders, operators, investors, and operators who work at the sharp edge of industries, unpacking the decisions that get made under pressure.",
        theme: "card-amber",
    },
    {
        title: "STRATEGIC\nINSIGHTS",
        body:
            "Clear, usable thinking on marketing, capital, technology, and scale—ideas you can apply today when you need a playbook or a buzz dictionary.",
        theme: "card-amber-2",
    },
    {
        title: "GROWTH\nFOCUSED",
        body:
            "Practical guidance for companies moving from local traction to national reach, covering expansion, structure, and the mechanics of sustainable momentum.",
        theme: "card-amber-3",
    },
    {
        title: "HUMAN-\nCENTRED",
        body:
            "Personal accounts of risk, failure, resilience, and reinvention, revealing the inner shifts that quietly power outward success.",
        theme: "card-amber-4",
    },
];

export default function CardStack() {
    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-6">
                <div className="card-stack">
                    {cards.map((card, i) => (
                        <article key={i} className={`stack-card ${card.theme}`}>
                            <h3 className="stack-title">
                                {card.title.split("\n").map((line, idx) => (
                                    <span key={idx} className="block">
                                        {line}
                                    </span>
                                ))}
                            </h3>
                            <p className="stack-body">{card.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
