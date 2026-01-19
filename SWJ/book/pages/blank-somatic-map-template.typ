#import "../template.typ": somatic_page

// Blank Somatic Map Page - Template (Repeated 8 times in the book)
// For body mapping exercises

#somatic_page(
  title: "Somatic Exploration",
  body_text: [
    *Date:* #line(length: 30%, stroke: 0.5pt + gray)
    
    #v(0.3cm)
    
    Close your eyes. Scan your body from head to toe. Notice where there is sensation, tension, ease, or numbness. Mark the figure below with your own symbols: spirals for energy, roots for grounding, thorns for pain, flowers for peace.
    
    #align(center)[
      #v(0.3cm)
      #figure(image("/assets/generated images/somatic-body-outline.jpg", width: 55%))
      #v(0.3cm)
    ]
    
    *What I notice today:*
    
    The strongest sensation lives in my __________.
    
    This sensation feels like __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
  ],
  image_path: none,
  layout_style: "bottom"
)
