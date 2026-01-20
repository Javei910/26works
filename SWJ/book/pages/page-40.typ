#import "../template.typ": somatic_page

#somatic_page(
  title: "Daily Shadow Log",
  body_text: [
    *Date:* #line(length: 30%, stroke: 0.5pt + gray)

    #v(0.5cm)
    *1. What triggered me today?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *2. What was my body's reaction? (Where did I feel it?)*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *3. What shadow part was activated? (Inner Child? Saboteur? Golden Shadow?)*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *4. What did I do? How did I respond?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *5. What could I do differently next time?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
  ],
  image_path: none,
  layout_style: "bottom"
)
