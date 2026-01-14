#let somatic_page(
  title: "Exercise Title", 
  body_text: "Exercise instructions go here...", 
  image_path: none, 
  layout_style: "top"
) = {
  // Page Configuration
  set page(paper: "a5", margin: 2cm)
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