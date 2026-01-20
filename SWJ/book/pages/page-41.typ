#import "../template.typ": somatic_page

#somatic_page(
  title: "Weekly Reflection Map",
  body_text: [
    At the end of each week, take a moment to reflect on your journey.
    
    Where did the shadow show up most this week? What patterns are emerging?
    
    #align(center)[
      #v(0.5cm)
      #figure(image("/assets/phase8-somatic.jpg", width: 55%))
      #v(0.5cm)
    ]
    
    *Mark the figure above:*
    - Draw STORMS where repeated triggers showed up
    - Draw SUNBREAKS where you responded differently than before
    - Draw NEW GROWTH where integration is taking root
    
    #v(0.5cm)
    *Week of:* #line(length: 30%, stroke: 0.5pt + gray)
    
    *Biggest insight this week:*
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))
  ],
  image_path: none,
  layout_style: "bottom"
)
