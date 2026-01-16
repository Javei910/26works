#import "../template.typ": somatic_page

// Blank Somatic Map Page - Template
// For body mapping exercises

#somatic_page(
  title: "Somatic Map",
  body_text: [
    *Date:* #line(length: 30%, stroke: 0.5pt + gray)
    
    #v(0.5cm)
    Use this body map for your own somatic exploration. Mark where you feel sensations, emotions, or energy.
    
    #align(center)[
      #v(0.5cm)
      #figure(image("/assets/page-7-somatic-map.jpg", width: 60%))
      #v(0.5cm)
    ]
    
    *Notes:*
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
