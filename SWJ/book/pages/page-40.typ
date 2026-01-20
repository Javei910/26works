#import "../template.typ": somatic_page

// PHASE 8 - PAGE 40: DAILY INTEGRATION - PROMPTS
// Structured daily log with Mad-lib format per Shadow Work Philosopher

#somatic_page(
  title: "Daily Shadow Log",
  body_text: [
    Take 5 minutes at the end of each day to complete this log. Small, consistent awareness creates lasting change. Notice what arises in your body as you reflect—this is integration happening in real-time.
    
    #v(0.5cm)
    
    #set text(style: "italic", size: 10.5pt)
    
    *Date:* #line(length: 30%, stroke: 0.5pt + gray)

    #v(0.5cm)
    *1. Today, I was triggered by* __________.
    
    The moment it happened was __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *2. My body's reaction was* __________ *(tension in, heat in, numbness in, racing heart, shallow breath)*.
    
    The sensation lived in my __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *3. The shadow part that was activated was* __________ *(Inner Child, Saboteur, Golden Shadow, Fear, Rage)*.
    
    I recognize this part because __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *4. My automatic response was* __________.
    
    If I had paused, I might have instead chosen to __________.
    #v(1em)
    #line(length: 100%, stroke: (dash: "dotted"))

    #v(0.5cm)
    *5. Tomorrow, I will practice* __________.
    
    #align(center)[*One small win today:* __________]
  ],
  image_path: none,
  layout_style: "bottom"
)
