#import "../template.typ": somatic_page

// PAGE 1: COVER - The Alchemical Threshold
// Category: BRANDING/LOGOS (functional)
// Using sophisticated, mysterious tone per Shadow Work Philosopher

#somatic_page(
  title: "The Shadow Work Journal",
  body_text: [
    #align(center)[
      #v(2cm)
      
      #text(size: 28pt, weight: "bold")[
        The Shadow Work Journal
      ]
      
      #v(0.5cm)
      
      #text(size: 14pt, style: "italic")[
        A Somatic Guide to Individuation
      ]
      
      #v(2cm)
      
      // Jung Portrait - Category: PORTRAITS
      #figure(image("/assets/image references/portraits/Portrait_of_Carl_Jung.png", width: 35%))
      
      #v(2cm)
      
      #text(size: 11pt, style: "italic")[
        _"Until you make the unconscious conscious,_
        _it will direct your life and you will call it fate."_
        
        — C.G. Jung
      ]
      
      #v(1cm)
      
      #text(size: 10pt)[
        The Felt Sense | Alchemical Art Nouveau Series
      ]
    ]
  ],
  image_path: none,
  layout_style: "bottom"
)
