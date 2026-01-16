#import "../template.typ": somatic_page

// Daily Shadow Log - Template Page
// This page is repeated multiple times in the book

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
    *2. Where did I feel it in my body?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *3. What shadow part was activated?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *4. How did I respond?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *5. What could I do differently?*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
  ],
  image_path: none,
  layout_style: "bottom"
)
