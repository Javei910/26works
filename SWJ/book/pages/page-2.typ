#import "../template.typ": somatic_page

// PAGE 2: COPYRIGHT & METADATA
// Simple legal page with minimal Art Nouveau touches

#somatic_page(
  title: none,
  body_text: [
    #v(3cm)
    
    #align(center)[
      #text(size: 16pt, weight: "bold")[The Shadow Work Journal]
      
      #v(1cm)
      
      #text(size: 10pt)[
        © 2026 The Felt Sense
        
        All rights reserved.
        
        #v(1cm)
        
        No part of this work may be reproduced without permission.
        
        This journal is designed for personal shadow integration work.
        
        It is not a substitute for professional psychological care.
        
        #v(2cm)
        
        _First Edition_
        
        #v(0.5cm)
        
        Printed on aged parchment stock
        
        Art Nouveau botanical illustrations
        
        Alchemical symbolism throughout
      ]
      
      #v(2cm)
      
      #text(size: 9pt, style: "italic")[
        "The shadow is a moral problem that challenges 
        
        the whole ego-personality."
        
        — C.G. Jung
      ]
    ]
  ],
  image_path: none,
  layout_style: "bottom"
)
