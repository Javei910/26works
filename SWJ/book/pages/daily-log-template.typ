#import "../template.typ": somatic_page

// Daily Shadow Log - Template Page (Repeated 20 times in the book)
// Mad-lib format per Shadow Work Philosopher

#somatic_page(
  title: "Daily Shadow Log",
  body_text: [
    *Date:* #line(length: 30%, stroke: 0.5pt + gray)

    #v(0.5cm)
    
    #set text(style: "italic", size: 10.5pt)
    
    *1. Today, I was triggered by* __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *2. My body responded with* __________ *(tension, heat, numbness, racing heart)*.
    
    I felt it in my __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *3. The shadow part activated was* __________ *(Inner Child, Saboteur, Fear, Rage, Golden Shadow)*.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *4. My automatic response was* __________.
    
    A more conscious choice would have been __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *5. Tomorrow, I commit to practicing* __________.
    
    #align(center)[
      #text(size: 16pt)[◈ · ✦ · ◈]
    ]
    
    #align(center)[*One thing I'm grateful for today:* __________]
  ],
  image_path: none,
  layout_style: "bottom"
)
