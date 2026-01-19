// Project wrapper with page styling, footer, and page numbers
#let project(
  title: "", 
  show_numbers: false, // New toggle
  body
) = {
  set page(
    paper: "a5",
    margin: (inside: 30mm, outside: 15mm, y: 20mm),
    footer: context {
      // Only execute if show_numbers is TRUE
      if show_numbers {
        let page_num = counter(page).at(here()).first()
        
        // Match the "Bestseller" style: Skip first few pages (Title, etc.)
        if page_num > 4 {
          set align(center)
          set text(font: "EB Garamond", size: 10pt)
          stack(
            dir: ttb,
            spacing: 6pt,
            // Pulls the seal from your newly created functional folder
            image("assets/refs/functional/seal.png", width: 1.2cm),
            [— #page_num —]
          )
        }
      }
    }
  )
  
  set text(font: "EB Garamond", size: 11pt, leading: 1.5em)
  body
}

// Somatic page template for individual journal pages
#let somatic_page(
  title: "Exercise Title", 
  body_text: "Exercise instructions go here...", 
  image_path: none, 
  layout_style: "top"
) = {
  // Page Configuration - using 30mm gutter margin per book-layout skill
  set page(paper: "a5", margin: (inside: 30mm, outside: 15mm, top: 20mm, bottom: 20mm))
  set text(font: "Linux Libertine", size: 11pt)
  
  // Header: Your Brand
  align(right, text(gray, style: "italic", size: 9pt)[The Felt Sense | Somatic Shadow Work])
  line(length: 100%, stroke: 0.5pt + gray)
  
  // Page Title
  v(1cm)
  align(center, text(size: 20pt, weight: "bold")[#title])
  v(0.5cm)

  // AI-Driven Layout Logic
  if layout_style == "top" and image_path != none {
    figure(image(image_path, width: 90%))
    v(0.5cm)
    body_text
  } else if layout_style == "bottom" and image_path != none {
    body_text
    v(0.5cm)
    figure(image(image_path, width: 90%))
  } else {
    body_text
  }
}